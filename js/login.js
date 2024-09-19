document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtém a lista de usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário existe com as credenciais fornecidas
    const user = users.find(user => user.email === email && user.password === password);

    const loginMessage = document.getElementById('loginMessage');

    if (user) {
        // Exibe mensagem de sucesso
        loginMessage.textContent = `Login realizado com sucesso, bem-vindo(a) ${user.name}!`;
        loginMessage.style.color = 'green';

        // Salva o perfil do usuário no localStorage
        localStorage.setItem('userProfile', JSON.stringify(user));

        // Após 2 segundos, redireciona para index.html
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);  // 2000 ms = 2 segundos
    } else {
        // Exibe mensagem de erro
        loginMessage.textContent = 'Usuário ou senha inválidos!';
        loginMessage.style.color = 'red';
    }
});
