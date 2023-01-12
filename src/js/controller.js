import { getUser } from "./models.js";
import loggedUserView from "./Views/loggedUserView.js";

const controlLogin = async function () {
  const logInSubmit = document.getElementById("loginSubmit");

  function logInSub() {
    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    console.log(emailInput, passwordInput);
    getUser(emailInput, passwordInput);
    loggedUserView.insertUserName();
  }
  try {
    logInSubmit.addEventListener("click", logInSub); //ver si se debe usar await
  } catch (err) {}
};

const initiateMap = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
      });
      map.setCenter(pos);
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
      });
    });
  }
};

//Esto al views
const openOverlayModal = function () {
  const newTaskBut = document.getElementById("newTask");
  const closeBtn = document.getElementById("close");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  function openModal() {
    overlay.style.display = "block";
    modal.style.display = "block";
    closeBtn.style.display = "block";
  }
  newTaskBut.addEventListener("click", openModal);
};
//Esto al views
const closeOverlay = function () {
  const closeBtn = document.getElementById("close");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  function closeModal() {
    overlay.style.display = "none";
    modal.style.display = "none";
    closeBtn.style.display = "none";
  }
  closeBtn.addEventListener("click", closeModal);
};

const submitTask = function () {
  //esta es para el formulario, no esta nada hecho
  const taskSubmitButton = document.getElementById("taskSubmit");

  let pos = { lat: "", lng: "" };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  const submitTest = function () {
    console.log(pos);
  };

  taskSubmitButton.addEventListener("click", submitTest);
};

controlLogin();
initiateMap();
openOverlayModal();
// submitTask();
closeOverlay();
