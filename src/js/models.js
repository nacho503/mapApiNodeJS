export const getUser = async function (email, password, user_name) {
  const userData = { email: email, password: password, user_name: user_name }; //mail: user1@gmail.com pass: user1
  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    sessionStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    alert(`Login error: ${err}`);
  }
};

export const postEvent = async function (
  eventTitle,
  pos_lat,
  pos_lng,
  eventDate,
  eventDescription,
  eventPrice,
  eventAddress
) {
  const postEventData = {
    title: eventTitle,
    lat: +pos_lat,
    long: +pos_lng,
    date: eventDate,
    descrip: eventDescription,
    amount: +eventPrice,
    address: eventAddress,
  };
  console.log(postEventData);
  try {
    const token = JSON.parse(sessionStorage.getItem("user"))["token"]; //JSON.stringify() this previuosly encompased the previious
    const res = await fetch("http://localhost:8080/create_mark", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postEventData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(token);
  } catch (err) {
    alert(`Operation failed: ${err}`);
  }
};

export const getMarks = async function () {
  const response = await fetch("http://localhost:8080/get_marks_all");
  const data = await response.json();
  const marksOnMap = data;
  console.log(marksOnMap);

  return marksOnMap; // Export the marksOnMap array
};
