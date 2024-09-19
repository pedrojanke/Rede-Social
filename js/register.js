document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registerMessage = document.getElementById("registerMessage");
    if (name && email && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        registerMessage.textContent = "Usuário já cadastrado.";
        registerMessage.style.color = "red";
      } else {
        users.push({ name, email, password });

        localStorage.setItem("users", JSON.stringify(users));

        registerMessage.textContent = "Cadastro realizado com sucesso!";
        registerMessage.style.color = "green";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    } else {
      registerMessage.textContent = "Preencha todos os campos.";
      registerMessage.style.color = "red";
    }
  });
