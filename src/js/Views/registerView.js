class registerView {
  _overlay = document.getElementById("overlay");
  _regForm = document.querySelector(".register-form-container");
  _closeBtn = document.getElementById("close");

  showRegForm() {
    this._overlay.style.display = "block";
    this._regForm.style.display = "block";
    this._closeBtn.style.display = "block";
  }

  closeRegForm() {
    this._overlay.style.display = "none";
    this._regForm.style.display = "none";
    this._closeBtn.style.display = "none";
  }
}

export default new registerView();
