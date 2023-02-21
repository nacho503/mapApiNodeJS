class LoggedUserView {
  _parentElement = document.querySelector(".navbar-container");
  _loginSub = document.getElementById("emailInput");
  _passwSub = document.getElementById("passwordInput");
  _loginButt = document.getElementById("loginSubmit");

  loggedUser() {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    this._loginSub.style.display = "none";
    this._passwSub.style.display = "none";
    this._loginButt.style.display = "none";
    return `<span>${loggedUser.user}</span>`;
  }
  //
  insertUserName() {
    if (localStorage.getItem("user")) {
      this._parentElement.insertAdjacentHTML("afterbegin", this.loggedUser());
    } else {
      ("");
    }
  }
}

export default new LoggedUserView();
