const userContainer = document.querySelector(".logIn-container");
// const login = async function () {
//   const userData = { email: "user1@gmail.com", password: "user1" };
//   try {
//     const res = await fetch("http://localhost:8080/login", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(userData),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     console.log(res, data);
//     const markup = `<span>${data.user}</span>`;
//     userContainer.insertAdjacentHTML("afterbegin", markup);
//   } catch (err) {
//     alert(err);
//   }
// };
function loginHandler() {
    var emailInput = document.getElementById("emailInput").value;
    var passwordInput = document.getElementById("passwordInput").value;
    if (emailInput.length == 0 || passwordInput.length == 0) alert("");
    console.log(`${emailInput} ${passwordInput}`);
} // login();

//# sourceMappingURL=index.62406edb.js.map
