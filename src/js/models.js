export const loggedUserData = {
  id: "",
  email: "",
  token: "",
};

export const getUser = async function (email, password) {
  const userData = { email: email, password: password }; //mail: user1@gmail.com pass: user1
  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);
    localStorage.setItem("usuario", JSON.stringify(data));
    // const markup = `<span>${data.user}</span>`;
    // userContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(`Login error: ${err}`);
  }
};
