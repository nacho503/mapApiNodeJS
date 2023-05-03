import { getUser, postEvent, getMarks, createUser } from "./models.js";
import { nightModeStyles } from "./helpers/nightMode.js";
import loggedUserView from "./Views/loggedUserView.js";
import markerInfoView from "./Views/markerInfoView.js";
import newTaskForm from "./Views/newTaskForm.js";
import DomElements from "./helpers/domElements.js";

import registerView from "./Views/registerView.js";
import filteredMarkersList from "./Views/filteredMarkersList.js";

//Helpers (consider moving them)
let domElements = new DomElements();
let map;
let dark = false;
let markersOnMap = [];

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
  //Makes user view persistent when browser is refreshed
  window.onload = loggedUserView.insertUserName();
};

//Logout fn, removes token from sessionStorage
const controlLogout = function () {
  domElements.logoutButt.addEventListener(
    "click",
    loggedUserView.logoutUser.bind(loggedUserView)
  );
};

const controlRegister = function () {
  //Sends content of the form to the models.js and to backend
  function registerbuttonHandler() {
    createUser(
      domElements.emailIn.value,
      domElements.passW.value,
      domElements.userN.value
    );
    registerView.closeRegForm();
  }
  domElements.subButt.addEventListener("click", registerbuttonHandler);
  domElements.regButt.addEventListener(
    "click",
    registerView.showRegForm.bind(registerView)
  );
  domElements.closeBtn.addEventListener(
    "click",
    registerView.closeRegForm.bind(registerView)
  );
  domElements.cancelBut.addEventListener(
    "click",
    registerView.closeRegForm.bind(registerView)
  );
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
    });
  }
};

const overlayHandler = function () {
  //Opens new Task form
  domElements.newTaskBut.addEventListener(
    "click",
    newTaskForm.openModal.bind(newTaskForm)
  );
  //Both close task, marker or event form
  domElements.closeBtn.addEventListener(
    "click",
    newTaskForm.closeModal.bind(newTaskForm)
  );
  domElements.new_task_form_cancel.addEventListener(
    "click",
    newTaskForm.closeModal.bind(newTaskForm)
  );
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

// Loads marks on map
const marksOnMapHandler = async function () {
  //Get method from backend , and the result is assigned to marksOnMap
  let marksOnMap_ = await getMarks();
  //Positions markers on Map based on the object received on the Models.js
  markersOnMap = filteredMarkersList.putMarkersOnMap(marksOnMap_, map);
  //Function to click on a specifi marker an get it's data
  filteredMarkersList.markerClickHandler(markersOnMap);
  filteredMarkersList.closeList();
};

//Re-Arrange darkView with a MVC logic
const toggleDarkViewController = function () {
  domElements.toggleBtn.addEventListener("click", () => {
    if (!dark) {
      domElements.toggleBtn.classList.add("dark-mode");
      map.setOptions({ styles: nightModeStyles });
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
marksOnMapHandler();
overlayHandler();
submitTask();
toggleDarkViewController(); //Check the logic under MVC
