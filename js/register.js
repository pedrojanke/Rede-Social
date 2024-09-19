document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registerMessage = document.getElementById("registerMessage"); // Obtém a div de mensagem

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

        // Após 2 segundos, redireciona para login.html
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000); // 2000 ms = 2 segundos
      }
    } else {
      registerMessage.textContent = "Preencha todos os campos.";
      registerMessage.style.color = "red";
    }
  });
