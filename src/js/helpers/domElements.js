export default class DomElements {
  constructor() {
    //Navbar
    this.logInSubmit = document.getElementById("loginSubmit");
    this.emailInput = document.getElementById("emailInput");
    this.passwordInput = document.getElementById("passwordInput");
    this.logoutButt = document.getElementById("logout");
    this.newTaskBut = document.getElementById("newTask");
    this.toggleBtn = document.getElementById("toggleBtn");
    // End of Navbar
    // Register Form
    this.emailIn = document.getElementById("registerEmailInput");
    this.passW = document.getElementById("registerPasswordInput");
    this.userN = document.getElementById("registerUsernameInput");
    this.regButt = document.getElementById("register");
    this.cancelBut = document.getElementById("registrationCancel");
    this.subButt = document.getElementById("registrationSubmit");
    // End of Register Form
    // New Task Form
    this.submitBut = document.getElementById("overlay-aceptar");
    this.new_task_form_cancel = document.getElementById("marker-form-cancel");
    this.eventTitle = document.getElementById("title");
    this.eventDate = document.getElementById("date");
    this.eventPrice = document.getElementById("amount");
    this.eventAddress = document.getElementById("address");
    this.eventDescription = document.getElementById("description");
    //End of new Task Form
    // Overlay (black screen)
    this.closeBtn = document.getElementById("close");
    // End of Overlay
    this.closeModal = document.getElementById("close");
    this.popupTitle = document.getElementById("popup-title");
    //  Markers List
    this.markersListContainer = document.getElementById(
      "filtered-markers-container"
    );
    // End of markers list
  }
}
