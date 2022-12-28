// Récupération des données du formulaire

const formElement = document.getElementById("formLogin");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  console.log(data);
  fetchLogs();
});

// Envoi de la requette HTTP POST avec fetch
async function fetchLogs() {
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: document.getElementById("formEmail").value,
      password: document.getElementById("formPassword").value,
    }),
  })
    // la fonction JSON.stringify pour encoder les données en chaîne de caractères au format JSON.
    .then(async function (response) {
      // Traitement de la réponse du serveur
      if (response.ok) {
        // La combinaison utilisateur-mot de passe est correcte
        // Redirection vers la page d'accueil et configuration de l'authentification
        console.log("C'est la bonne adresse");
        response = await response.json();
        console.log(response);
        // Enregistrer le token de session dans le sessionStorage
        sessionStorage.setItem("adminToken", response.token);
        window.location.href = "index.html";
      } else {
        // La combinaison utilisateur-mot de passe est incorrecte
        // Affichage d'un message d'erreur
        alert("Utilisateur ou mot de passe incorrect");
      }
    })
    .catch(function (error) {
      // Traitement des erreurs
      console.error(error);
    });
}
