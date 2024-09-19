document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logout').addEventListener('click', function(event) {
      event.preventDefault();

      if (confirm('Tem certeza de que deseja sair?')) {
        localStorage.removeItem('userProfile');

        window.location.href = 'login.html';
      }
    });
  });
  