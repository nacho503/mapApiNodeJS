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

controlLogin();
