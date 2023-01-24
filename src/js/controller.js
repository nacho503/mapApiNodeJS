import { getUser } from "./models.js";
import loggedUserView from "./Views/loggedUserView.js";
import newTaskForm from "./Views/newTaskForm.js";

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
  //titulo,fecha,monto,direccion y descripcion
  //esta es para el formulario, no esta nada hecho

  let pos = { lat: "", lng: "" };

  const submitTest = function () {
    const eventTitle = document.getElementById("titulo").value;
    const eventDate = document.getElementById("fecha").value;
    const eventPrice = document.getElementById("monto").value;
    const eventAddress = document.getElementById("direccion").value;
    const eventDescription = document.getElementById("descripcion").value;
    console.log(
      eventDescription,
      eventAddress,
      eventPrice,
      eventDate,
      eventTitle
    );
  };

  submitBut.addEventListener("click", submitTest);
};

controlLogin();
initiateMap();
overlayHandler();
submitTask();
