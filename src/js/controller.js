import { getUser, postEvent, getMarks, createUser } from "./models.js";
import { nightMode } from "./helpers/nightMode.js";
import loggedUserView from "./Views/loggedUserView.js";
import newTaskForm from "./Views/newTaskForm.js";
import markerInfoView from "./Views/markerInfoView.js";
import registerView from "./Views/registerView.js";
import DomElements from "./helpers/domElements.js";

//Helpers (consider moving them)
let domElements = new DomElements();
let map;
let dark = false;

//Login Function
const controlLogin = async function () {
  function logInSub() {
    getUser(domElements.emailInput.value, domElements.passwordInput.value); //post for getting token with user data
    setTimeout(() => {
      //This function puts the name of the logged user next to loggout button
      loggedUserView.insertUserName();
    }, 1000);
  }
  try {
    domElements.logInSubmit.addEventListener("click", logInSub);
  } catch (err) {}
};

//Logout fn, removes token from sessionStorage
const controlLogout = function () {
  function logOut() {
    loggedUserView.logoutUser();
  }
  domElements.logoutButt.addEventListener("click", logOut);
};

const controlRegister = function () {
  function displayRegForm() {
    registerView.showRegForm();
  }
  function closeRegForm() {
    registerView.closeRegForm();
  }

  function registerbuttonHandler() {
    createUser(
      domElements.emailIn.value,
      domElements.passW.value,
      domElements.userN.value
    );
    registerView.closeRegForm();
  }
  domElements.subButt.addEventListener("click", registerbuttonHandler);
  domElements.regButt.addEventListener("click", displayRegForm);
  domElements.closeBtn.addEventListener("click", closeRegForm);
  domElements.cancelBut.addEventListener("click", closeRegForm);
};

//Puts current position on Map
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
  function open() {
    newTaskForm.openModal();
  }
  function closeModal() {
    newTaskForm.closeModal();
  }
  domElements.newTaskBut.addEventListener("click", open);
  domElements.closeBtn.addEventListener("click", closeModal);
  domElements.new_task_form_cancel.addEventListener("click", closeModal);
};

const submitTask = function () {
  const submitTask_ = function () {
    let pos = sessionStorage.getItem("coords"); //object containing lat and long
    let posJSON = JSON.parse(pos);
    const pos_lat = posJSON["lat"];
    const pos_lng = posJSON["lng"];
    postEvent(
      domElements.eventTitle.value,
      pos_lat,
      pos_lng,
      domElements.eventDate.value,
      domElements.eventDescription.value,
      domElements.eventPrice.value,
      domElements.eventAddress.value
    );
    newTaskForm.closeModal();
  };

  domElements.submitBut.addEventListener("click", submitTask_);
};

// Loads marks on map and it has the handlers when clicking on them
const marksOnMap = async function () {
  const marksOnMap = await getMarks();
  let clusterDensity = 0.00003;
  function open() {
    markerInfoView.openModal();
  }
  function close() {
    markerInfoView.closeModal();
  }

  //Positions markers on Map based on the object received on the Models.js
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

      //Pending: Send every filtered marker to a html list
      function filtererOnClick(lat, long) {
        console.log(`This is inside the function${lat},${long}`);
        const filteredMarksOnMap = marksOnMap.filter((mark) => {
          return (
            mark.lat >= lat - clusterDensity &&
            mark.lat <= lat + clusterDensity &&
            mark.long >= long - clusterDensity &&
            mark.long <= long + clusterDensity
          );
        });
        return filteredMarksOnMap;
      }
      const filteredClicked = filtererOnClick(
        marker.data.lat,
        marker.data.long
      );
      console.log(filteredClicked);

      open();
    });
    //Close the modal of the marker info
    domElements.closeModal.addEventListener("click", function () {
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
};

//Re-Arrange darkView with a MVC logic
const toggleDarkView = function () {
  toggleBtn.addEventListener("click", () => {
    if (!dark) {
      domElements.toggleBtn.classList.add("dark-mode");
      map.setOptions({ styles: nightMode });
      dark = true;
    } else {
      domElements.toggleBtn.classList.remove("dark-mode");
      map.setOptions({ styles: [] });
      dark = false;
    }
  });
};

// Controller set
controlLogin();
controlLogout();
controlRegister();
initiateMap();
marksOnMap();
overlayHandler();
submitTask();
toggleDarkView(); //Check the logic under MVC
