// Récupération des données du formulaire

const formElement = document.getElementById("formLogin");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  // const form = e.target;
  // const data = new FormData(form);
  // console.log("data", data);
  fetchLogs();
});

async function fetchLogs() {
  try {
    let response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: document.getElementById("formEmail").value,
        password: document.getElementById("formPassword").value,
      }),
    });

    if (response.ok) {
      console.log("C'est la bonne adresse");
      response = await response.json();
      console.log(response);
      sessionStorage.setItem("adminToken", response.token);
      window.location.href = "index.html";
    } else {
      launchAlertMessage();
    }
  } catch (error) {
    console.error(error);
    launchAlertMessage();
  }
}

function launchAlertMessage() {
  const sectionLogin = document.getElementById("login");
  const alertMessage = document.createElement("p");
  alertMessage.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  alertMessage.style.position = "absolute";
  alertMessage.style.top = "180px";
  alertMessage.style.fontWeight = "700";
  alertMessage.style.fontSize = "16px";
  alertMessage.style.color = "red";
  alertMessage.style.padding = "10px";
  alertMessage.style.border = "2px solid red";
  sectionLogin.appendChild(alertMessage);
}
