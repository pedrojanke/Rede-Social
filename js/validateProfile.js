function validateProfile() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (userProfile) {
    document.getElementById("profileName").textContent = userProfile.name;
    document.getElementById("profileDescription").textContent =
      userProfile.description;
  } else {
    window.location.href = "login.html";
  }
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("userProfile");
  window.location.href = "login.html";
});

validateProfile();
