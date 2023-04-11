import { getUser, postEvent, getMarks } from "./models.js";
import { nightMode } from "./helpers.js";
import loggedUserView from "./Views/loggedUserView.js";
import newTaskForm from "./Views/newTaskForm.js";
import markerInfoView from "./Views/markerInfoView.js";

//Helpers (consider moving them)
let map;
let dark = false;
let all_markers = [];

const controlLogin = async function () {
  const logInSubmit = document.getElementById("loginSubmit");

  function logInSub() {
    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    getUser(emailInput, passwordInput); //post for getting token with user data
    setTimeout(() => {
      // puts the user next to login
      loggedUserView.insertUserName();
    }, 1000);
  }
  try {
    logInSubmit.addEventListener("click", logInSub); //ver si se debe usar await
  } catch (err) {}
};

const controlLogout = function () {
  const logoutButt = document.getElementById("logout");
  function logOut() {
    loggedUserView.logoutUser();
  }
  logoutButt.addEventListener("click", logOut);
};

//Test with other marks on map
const initiateMap = async function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      sessionStorage.setItem("coords", JSON.stringify(pos));
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
      });
      map.setCenter(pos);
      const markerSelf = new google.maps.Marker({
        position: pos,
        map: map,
      });
      all_markers.push(markerSelf);
    });
  }
};

const overlayHandler = function () {
  const newTaskBut = document.getElementById("newTask");
  const closeBtn = document.getElementById("close");
  const overlay_cancel = document.getElementById("overlay-cancelar");
  function open() {
    newTaskForm.openModal();
  }
  function closeModal() {
    newTaskForm.closeModal();
  }
  newTaskBut.addEventListener("click", open);
  closeBtn.addEventListener("click", closeModal);
  overlay_cancel.addEventListener("click", closeModal);
};

const submitTask = function () {
  const submitBut = document.getElementById("overlay-aceptar");

  // let user = sessionStorage.getItem("user"); //Aparently we don't need ID, since back-end automatically associates it

  const submitTask_ = function () {
    let pos = sessionStorage.getItem("coords"); //object containing lat and long
    let posJSON = JSON.parse(pos);
    // const userId = JSON.parse(user)["id"];
    const eventTitle = document.getElementById("title").value;
    const eventDate = document.getElementById("date").value;
    const eventPrice = document.getElementById("amount").value;
    const eventAddress = document.getElementById("address").value;
    const eventDescription = document.getElementById("description").value;
    const pos_lat = posJSON["lat"];
    const pos_lng = posJSON["lng"];
    postEvent(
      //funciton from models.js
      // userId,
      eventTitle,
      pos_lat,
      pos_lng,
      eventDate,
      eventDescription,
      eventPrice,
      eventAddress
    );
    newTaskForm.closeModal();
  };

  submitBut.addEventListener("click", submitTask_);
};

// Loads marks on map and it has the handlers when clicking on them
const marksOnMap = async function () {
  const closeModal = document.getElementById("close");
  const marksOnMap = await getMarks();
  //create a function to group markers with same or similar coords
  // helper functions

  function open() {
    markerInfoView.openModal();
  }
  function close() {
    markerInfoView.closeModal();
  }

  marksOnMap.forEach((coord) => {
    const marker = new google.maps.Marker({
      position: { lat: coord.lat, lng: coord.long },
      map: map,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/128/10204/10204362.png",
        scaledSize: new google.maps.Size(40, 40),
      },
      data: {
        id: coord.id,
        address: coord.address,
        title: coord.title,
        amount: coord.amount,
        date: coord.date,
        descrip: coord.descrip,
        lat: coord.lat,
        long: coord.long,
        user_name: coord.user_name,
      },
    });
    all_markers.push(marker);
    console.log(all_markers);
    const title = document.getElementById("popup-title");
    const date = document.getElementById("popup-date");
    const amount = document.getElementById("popup-amount");
    const address = document.getElementById("popup-address");
    const desc = document.getElementById("popup-description");
    const coords = document.getElementById("popup-coordinates");
    const creator = document.getElementById("popup-creator");

    //Add event listener for the marker when clicked and sends the data to the html:
    marker.addListener("click", function () {
      title.innerHTML += ` ${marker.data.title}`;
      date.innerHTML += ` ${marker.data.date}`;
      amount.innerHTML += ` ${marker.data.amount}`;
      address.innerHTML += ` ${marker.data.address}`;
      desc.innerHTML += ` ${marker.data.descrip}`;
      coords.innerHTML += ` Latitude: ${marker.data.lat}, Longitude: ${marker.data.long}`;
      creator.innerHTML += ` ${marker.data.user_name}`;
      open();
    });
    //Close the modal of the marker info
    closeModal.addEventListener("click", function () {
      title.innerHTML = "Title:";
      date.innerHTML = "Created:";
      amount.innerHTML = "Amount:";
      address.innerHTML = "Address:";
      desc.innerHTML = "Description:";
      coords.innerHTML = "Coordinates:";
      creator.innerHTML = "Creator:";
      close();
    });
  });

  //Marker Cluster not working
  const markerCluster = new MarkerClusterer(map, all_markers, {
    imagePath: "https://cdn-icons-png.flaticon.com/512/4807/4807598.png",
  });
};

const toggleDarkView = function () {
  //Check the logic under MVC
  const toggleBtn = document.getElementById("toggleBtn");
  toggleBtn.addEventListener("click", () => {
    if (!dark) {
      toggleBtn.classList.add("dark-mode");
      map.setOptions({ styles: nightMode });
      dark = true;
    } else {
      toggleBtn.classList.remove("dark-mode");
      console.log("Removing dark-mode class");
      map.setOptions({ styles: [] });
      dark = false;
    }
  });
};

// Controller set
controlLogin();
controlLogout();
initiateMap();
marksOnMap();
overlayHandler();
submitTask();
toggleDarkView(); //Check the logic under MVC
