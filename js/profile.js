document.addEventListener("DOMContentLoaded", function () {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (userProfile) {
    document.getElementById("userName").textContent =
      userProfile.name || "Nome não disponível";
    document.getElementById("userDescription").textContent =
      userProfile.description || "Descrição não disponível";

    const userAgeElement = document.getElementById("userAge");
    const userSignElement = document.getElementById("userSign");

    if (userProfile.age) {
      userAgeElement.textContent = userProfile.age;
      userAgeElement.style.display = "inline";
    } else {
      userAgeElement.style.display = "none";
    }

    if (userProfile.sign) {
      userSignElement.textContent = userProfile.sign;
      userSignElement.style.display = "inline";
    } else {
      userSignElement.style.display = "none";
    }

    const userAvatarElement = document.getElementById("userAvatar");
    if (userProfile.image) {
      userAvatarElement.src = userProfile.image;
    } else {
      userAvatarElement.src = "path/to/default-avatar.jpg";
    }
  } else {
    window.location.href = "login.html";
  }

  document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("Tem certeza de que deseja sair?")) {
      localStorage.removeItem("userProfile");
      window.location.href = "login.html";
    }
  });
});
