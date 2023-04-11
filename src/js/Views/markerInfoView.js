class markerInfo {
  _closeBtn = document.getElementById("close");
  _overlay = document.getElementById("overlay");
  _popup = document.getElementById("popup-content");

  openModal() {
    this._overlay.style.display = "block";
    this._closeBtn.style.display = "block";
    this._popup.style.display = "block";
  }

  closeModal() {
    this._overlay.style.display = "none";
    this._closeBtn.style.display = "none";
    this._popup.style.display = "none";
  }
}

export default new markerInfo();
