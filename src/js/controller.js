import { getUser, postEvent, getMarks } from "./models.js";
import { nightMode } from "./helpers.js";
import loggedUserView from "./Views/loggedUserView.js";
import newTaskForm from "./Views/newTaskForm.js";
import markerInfoView from "./Views/markerInfoView.js";

//Helpers (consider moving them)
let map;
let dark = false;

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
    const eventTitle = document.getElementById("titulo").value;
    const eventDate = document.getElementById("fecha").value;
    const eventPrice = document.getElementById("monto").value;
    const eventAddress = document.getElementById("direccion").value;
    const eventDescription = document.getElementById("descripcion").value;
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

const marksOnMap = async function () {
  const marksOnMap = await getMarks();
  console.log(marksOnMap);

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
        title: coord.title,
      },
    });

    function open() {
      markerInfoView.openModal();
    }
    //Add event listener for the marker:
    marker.addListener("click", function () {
      console.dir(marker.data.title);
      // open();
    });
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
initiateMap();
marksOnMap();
overlayHandler();
submitTask();
toggleDarkView(); //Check the logic under MVC
