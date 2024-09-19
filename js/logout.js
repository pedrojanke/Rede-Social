document.addEventListener('DOMContentLoaded', function() {
    // Lógica para o botão de logout
    document.getElementById('logout').addEventListener('click', function(event) {
      event.preventDefault(); // Previne o comportamento padrão do link
  
      // Pergunta ao usuário se ele tem certeza de que deseja sair
      if (confirm('Tem certeza de que deseja sair?')) {
        // Remove o perfil do usuário do localStorage
        localStorage.removeItem('userProfile');
        
        // Redireciona para a página de login
        window.location.href = 'login.html';
      }
    });
  });
  