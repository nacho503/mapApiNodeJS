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

    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    alert(`Login error: ${err}`);
  }
};

export const postEvent = async function (
  user,
  eventDescription,
  eventAddress,
  eventPrice,
  eventDate,
  eventTitle,
  pos
) {
  const postEventData = {
    user: user,
    eventDescription: eventDescription,
    eventAddress: eventAddress,
    eventPrice: eventPrice,
    eventDate: eventDate,
    eventTitle: eventTitle,
    pos: pos,
  };
  console.log(postEventData);
};
