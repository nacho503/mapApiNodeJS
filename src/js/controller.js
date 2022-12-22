import { getUser } from "./models";
import loggedUserView from "./Views/loggedUserView";

const controlLogin = async function () {
  const userContainer = document.querySelector(".logIn-container");
  const logInSubmit = document.getElementById("loginSubmit");

  function logInSub() {
    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    console.log(emailInput, passwordInput);
    getUser(emailInput, passwordInput);
  }
  try {
    logInSubmit.addEventListener("click", logInSub);
    userContainer.insertAdjacentHTML("afterbegin", loggedUserView.loggedUser());
  } catch (err) {}
};

controlLogin();
