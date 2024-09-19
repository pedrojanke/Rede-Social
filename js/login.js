document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    const loginMessage = document.getElementById('loginMessage');

    if (user) {
        loginMessage.textContent = `Login realizado com sucesso, bem-vindo(a) ${user.name}!`;
        loginMessage.style.color = 'green';

        localStorage.setItem('userProfile', JSON.stringify(user));

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        loginMessage.textContent = 'Usuário ou senha inválidos!';
        loginMessage.style.color = 'red';
    }
});
