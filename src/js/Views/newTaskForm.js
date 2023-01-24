class newTaskForm {
  _closeBtn = document.getElementById("close");
  _overlay = document.getElementById("overlay");
  _modal = document.getElementById("modal");

  openModal() {
    this._overlay.style.display = "block";
    this._modal.style.display = "block";
    this._closeBtn.style.display = "block";
  }

  closeModal() {
    this._overlay.style.display = "none";
    this._modal.style.display = "none";
    this._closeBtn.style.display = "none";
  }
}

export default new newTaskForm();
