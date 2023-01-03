// ------------------ Objet Set ------------------
const categories = new Set();
const allProjects = new Set();
const objectsProjects = new Set();
const apartmentProjects = new Set();
const hotelAndRestaurantProjects = new Set();

const navLogin = document.getElementById("navLogin");
const crossCloseModale = document.getElementById("closeModale");
const modale = document.getElementsByClassName("modale");
const modalInside = document.querySelector(".inside-modale");

initAllSetsOfData().then(() => {
  initAdminElements();
  console.log("toto");
});
console.log("toto first");

async function fetchAllWorks() {
  const worksRow = await fetch("http://localhost:5678/api/works", {
    headers: {
      "Cross-Origin-Ressource-Policy": "cross-origin",
    },
  });
  if (worksRow.ok) {
    return worksRow.json();
  } else {
    console.error(works.error);
  }
}

async function initAllSetsOfData() {
  let works = await fetchAllWorks();

  // Sélectionnez l'élément parent de votre galerie
  works.filter(function (work) {
    allProjects.add(work);
    if (work.categoryId === 1) {
      objectsProjects.add(work);
    } else if (work.categoryId === 2) {
      apartmentProjects.add(work);
    } else {
      hotelAndRestaurantProjects.add(work);
    }
  });

  loadDataSet(allProjects);
}

function loadDataSet(works) {
  const gallery = document.querySelector(".gallery");

  works.forEach((work) => {
    categories.add(work.categoryId);

    const dom_figure = document.createElement("figure");
    gallery.appendChild(dom_figure);

    const dom_img = document.createElement("img");
    dom_img.crossOrigin = "anonymous";
    dom_img.src = work.imageUrl;
    dom_img.alt = work.title;
    dom_figure.appendChild(dom_img);

    const dom_figcaption = document.createElement("figcaption");
    dom_figcaption.textContent = work.title;
    dom_figure.appendChild(dom_figcaption);
  });
}

function loadDataEdit(works) {
  console.log(works);
  works.forEach((work) => {
    const projetModale = document.createElement("div");
    projetModale.id = "projetModale";
    modalInside.appendChild(projetModale);

    const modaleImg = document.createElement("img");
    modaleImg.crossOrigin = "anonymous";
    modaleImg.src = work.imageUrl;
    modaleImg.alt = work.title;
    projetModale.appendChild(modaleImg);

    const modaleEdit = document.createElement("p");
    modaleEdit.textContent = "éditer";
    projetModale.appendChild(modaleEdit);
  });
}

function clearAll() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
}
// ------------- PARTIE FILTRES ------------ //
const filterAll = document.getElementById("filterAll");
const filterObject = document.getElementById("filterObject");
const filterApartment = document.getElementById("filterApartment");
const filterHotelAndRestaurant = document.getElementById(
  "filterHotelAndRestaurant"
);

// Click Events
filterAll.addEventListener("click", function () {
  clearAll();
  loadDataSet(allProjects);
});

filterObject.addEventListener("click", function () {
  clearAll();
  loadDataSet(objectsProjects);
});

filterApartment.addEventListener("click", function () {
  clearAll();
  loadDataSet(apartmentProjects);
});

filterHotelAndRestaurant.addEventListener("click", function () {
  clearAll();
  loadDataSet(hotelAndRestaurantProjects);
});

// ------------------- Reload page_edit adminToken --------------------------

function initAdminElements() {
  if (sessionStorage["adminToken"]) {
    headerEdit();
    logoutEdit();
    hiddenFilters();
    newEditDiv("indexFigure");
    newEditDiv("portfolio");
    newEditDiv("introduction_article");
    document.body.style.marginTop = "80px";
    loadDataEdit(allProjects);
  } else {
    // Not admin mode
  }
}

function logoutEdit() {
  navLogin.innerText = "logout";
}

function headerEdit() {
  // Création de la nouvelle div "newHeader" en haut de page
  let newHeaderDiv = document.createElement("div");
  newHeaderDiv.id = "newHeader";
  let firstChild = document.body.firstChild;
  newHeaderDiv.textContent = "";
  document.body.insertBefore(newHeaderDiv, firstChild);
  newHeaderDiv.style.cssText =
    "position: absolute; width: 100%; background-color: black; color: white; height: 60px; display: flex; align-items: center; justify-content: center;";
  // Création des nouveaux éléments dans la div
  let editIcon = document.createElement("i");
  editIcon.className = "fa-regular fa-pen-to-square";
  let editionMode = document.createElement("p");
  editionMode.textContent = "Mode édition";
  editionMode.id = "editionMode";
  let publishButton = document.createElement("button");
  publishButton.textContent = "Publier les changements";
  // Définition des styles des elements du header
  editIcon.style.margin = "10px";
  editionMode.style.cursor = "pointer";
  publishButton.style.cssText =
    "padding: 10px; margin-left: 10px; border-radius: 20px; cursor: pointer;";
  // Intégration des éléments dans la div "newHeader"
  newHeaderDiv.appendChild(editIcon);
  newHeaderDiv.appendChild(editionMode);
  newHeaderDiv.appendChild(publishButton);
  const editionModeLink = document.getElementById("editionMode");

  editionModeLink.addEventListener("click", function () {
    modale[0].style.display = "block";
  });
}

function newEditDiv(parent) {
  // Création de la div + style
  let editDiv = document.createElement("button");
  let divParent = document.getElementById(parent);
  divParent.appendChild(editDiv);
  divParent.style.position = "relative";
  editDiv.className = "iconEditDiv";
  editDiv.style.cssText =
    "cursor: pointer; display: flex; align-items: center; justify-content: center; position: absolute; border: none; background-color: transparent";
  // Création du i + style
  let editIcon = document.createElement("i");
  editIcon.className = "fa-regular fa-pen-to-square";
  editIcon.style.margin = "10px";
  // Création du p + style
  let editionText = document.createElement("p");
  editionText.textContent = "modifier";
  editionText.style.margin = "0px";
  // Intégration du 'i' et du 'p' dans la div
  editDiv.appendChild(editIcon);
  editDiv.appendChild(editionText);
  editDiv.id = `${parent}editDiv`;
}

function hiddenFilters() {
  let divFilters = document.getElementById("filters");
  divFilters.style.display = "none";
}

// EventListener sur le click pour pouvoir clear le Token de sessionsStorage (admin token). Attention a mettre le click entre "".
navLogin.addEventListener("click", function () {
  sessionStorage.clear();
});
//EventListener pour fermer la modale
const editionModeLink = document.getElementById("editionMode");

crossCloseModale.addEventListener("click", function () {
  modale[0].style.display = "none";
});

function createModaleDiv() {}
