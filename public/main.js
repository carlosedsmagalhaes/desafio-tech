const entrar = document.getElementById("btn-entrar");

entrar.addEventListener("click", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Email:", email);
    console.log("Password:", password);

    const response = await fetch("api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    /* console.log(data); */
    alert( data.message );

});