document.addEventListener("DOMContentLoaded", function () {
  const profileImageInput = document.getElementById("profileImage");
  const profileImagePreview = document.getElementById("profileImagePreview");
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  // Preenche o formulário com as informações do perfil
  if (userProfile) {
    document.getElementById("name").value = userProfile.name || "";
    document.getElementById("age").value = userProfile.age || "";
    document.getElementById("sign").value = userProfile.sign || "";
    document.getElementById("description").value =
      userProfile.description || "";

    // Exibe a imagem do perfil se estiver disponível
    if (userProfile.image) {
      profileImagePreview.src = userProfile.image;
      profileImagePreview.style.display = "block";
    }
  } else {
    window.location.href = "login.html";
  }

  // Lógica para o upload da imagem
  profileImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImagePreview.src = e.target.result;
        profileImagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Lógica para o formulário de edição de perfil
  document
    .getElementById("editProfileForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Obtém os valores dos campos do formulário
      const updatedProfile = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        sign: document.getElementById("sign").value,
        description: document.getElementById("description").value,
        image: profileImagePreview.src || "",
      };

      // Salva o perfil atualizado no localStorage
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      // Exibe uma mensagem de sucesso
      alert("Perfil atualizado com sucesso!");

      // Redireciona para a página do perfil
      window.location.href = "profile.html";
    });

  // Lógica para o botão de logout
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("userProfile");
    window.location.href = "login.html";
  });
});
