const loginHandler = async function() {
    const userContainer = document.querySelector(".logIn-container");
    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    if (emailInput.length == 0 || passwordInput.length == 0) // revisa si esta vacio
    alert("Please insert email and password");
    else {
        const userData = {
            email: emailInput,
            password: passwordInput
        }; //mail: user1@gmail.com pass: user1
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message} (${res.status})`);
            console.log(res, data);
            localStorage.setItem("usuario", JSON.stringify(data));
            const markup = `<span>${data.user}</span>`;
            userContainer.insertAdjacentHTML("afterbegin", markup);
        } catch (err) {
            alert(`Login error: ${err}`);
        }
    }
};

//# sourceMappingURL=index.b5b6448b.js.map
