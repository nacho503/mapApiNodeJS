import { getUser, postEvent } from "./models.js";
import loggedUserView from "./Views/loggedUserView.js";
import newTaskForm from "./Views/newTaskForm.js";

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

const initiateMap = async function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      localStorage.setItem("coords", JSON.stringify(pos));
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

const overlayHandler = function () {
  const newTaskBut = document.getElementById("newTask");
  const closeBtn = document.getElementById("close");
  function open() {
    newTaskForm.openModal();
  }
  function closeModal() {
    newTaskForm.closeModal();
  }
  newTaskBut.addEventListener("click", open);
  closeBtn.addEventListener("click", closeModal);
};

const submitTask = function () {
  const submitBut = document.getElementById("overlay-aceptar");

  let pos = localStorage.getItem("coords"); //object containing lat and long
  let userName = localStorage.getItem("user"); //object containing lat and long

  const submitTask_ = function () {
    const user = JSON.parse(userName)["user"];
    const eventTitle = document.getElementById("titulo").value;
    const eventDate = document.getElementById("fecha").value;
    const eventPrice = document.getElementById("monto").value;
    const eventAddress = document.getElementById("direccion").value;
    const eventDescription = document.getElementById("descripcion").value;
    const posJSON = JSON.parse(pos);
    postEvent(
      user,
      eventTitle,
      eventDate,
      eventPrice,
      eventAddress,
      eventDescription,
      posJSON
    );
  };

  submitBut.addEventListener("click", submitTask_);
};

controlLogin();
initiateMap();
overlayHandler();
submitTask();
