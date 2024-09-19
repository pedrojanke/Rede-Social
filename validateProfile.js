// Função para validar o perfil do usuário
function validateProfile() {
  // Obtém o perfil do localStorage
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  // Verifica se o perfil existe
  if (userProfile) {
    // Atualiza a página com os dados do perfil
    document.getElementById("profileName").textContent = userProfile.name;
    document.getElementById("profileDescription").textContent =
      userProfile.description;
  } else {
    // Redireciona para a página de login se não houver perfil
    window.location.href = "login.html";
  }
}

// Função para sair
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("userProfile");
  window.location.href = "login.html"; // Redireciona para a página de login
});

// Validar perfil ao carregar a página
validateProfile();
