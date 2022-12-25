class LoggedUserView {
  _parentElement = document.querySelector(".logIn-container");

  loggedUser() {
    let loggedUser = JSON.parse(localStorage.getItem("usuario"));
    return `<span>${loggedUser.user}</span>`;
  }

  insertUserName() {
    this._parentElement.insertAdjacentHTML("afterbegin", this.loggedUser());
  }
}

export default new LoggedUserView();
