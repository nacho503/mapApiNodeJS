class LoggedUserView {
  _parentElement = document.querySelector(".navbar-container");
  _loginSub = document.getElementById("emailInput");
  _passwSub = document.getElementById("passwordInput");
  _loginButt = document.getElementById("loginSubmit");
  _registerButt = document.getElementById("register");
  _userNameContainer = document.getElementById("userName");
  _logoutButt = document.getElementById("logout");
  _loggedInLefft = document.getElementById("loggedIn-left");

  loggedUser() {
    let loggedUser = JSON.parse(sessionStorage.getItem("user"));
    this._loginSub.style.display = "none";
    this._passwSub.style.display = "none";
    this._loginButt.style.display = "none";
    this._registerButt.style.display = "none";
    this._loggedInLefft.style.display = "flex";
    this._userNameContainer.style.display = "block";
    this._logoutButt.style.display = "block";
    return `<span>${loggedUser.user}</span>`;
  }
  //
  insertUserName() {
    if (sessionStorage.getItem("user")) {
      this._userNameContainer.insertAdjacentHTML(
        "afterbegin",
        this.loggedUser()
      );
    } else {
      ("");
    }
  }

  logoutUser() {
    this._loginSub.style.display = "inline-block";
    this._passwSub.style.display = "inline-block";
    this._loginButt.style.display = "inline-block";
    this._registerButt.style.display = "inline-block";
    this._loggedInLefft.style.display = "none";
    this._userNameContainer.style.display = "none";
    this._logoutButt.style.display = "none";
    sessionStorage.clear();
    this._userNameContainer.innerHTML = "";
    this._loginSub.value = "";
    this._passwSub.value = "";
  }
}

export default new LoggedUserView();
