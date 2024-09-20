document.addEventListener("DOMContentLoaded", function () {
  const profileImageInput = document.getElementById("profileImage");
  const profileImagePreview = document.getElementById("profileImagePreview");
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (userProfile) {
    document.getElementById("name").value = userProfile.name || "";
    document.getElementById("age").value = userProfile.age || "";
    document.getElementById("sign").value = userProfile.sign || "";
    document.getElementById("description").value =
      userProfile.description || "";

    if (userProfile.image) {
      profileImagePreview.src = userProfile.image;
      profileImagePreview.style.display = "block";
    }
  } else {
    window.location.href = "login.html";
  }

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

  document
    .getElementById("editProfileForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const updatedProfile = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        sign: document.getElementById("sign").value,
        description: document.getElementById("description").value,
        image: profileImagePreview.src || "",
      };

      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      const successMessageDiv = document.getElementById("successMessage");
      successMessageDiv.innerText = "Perfil atualizado com sucesso!";
      successMessageDiv.style.display = "block";
      
      setTimeout(function () {
        window.location.href = "profile.html";
      }, 1000);
    });

  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("userProfile");
    window.location.href = "login.html";
  });
});
