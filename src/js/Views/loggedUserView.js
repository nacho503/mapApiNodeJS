class LoggedUserView {
  _parentElement = document.querySelector(".logIn-container");

  loggedUser() {
    return `<span>Usuario logeado</span>`;
  }
}

export default new LoggedUserView();
