class registerView {
  _overlay = document.getElementById("overlay");
  _regForm = document.getElementsByClassName("register-form-container");

  showRegForm() {
    this._overlay.style.display = "block";
    this._regForm.style.display = "block";
  }
}

export default new registerView();
