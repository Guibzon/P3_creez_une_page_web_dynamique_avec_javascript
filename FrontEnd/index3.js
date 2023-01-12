// ------------------ Objet Set ------------------
const categories = new Set();
const allProjects = new Set();
const objectsProjects = new Set();
const apartmentProjects = new Set();
const hotelAndRestaurantProjects = new Set();

const navLogin = document.getElementById("navLogin");
const crossCloseModale = document.getElementById("closeModale");
const arrowBackModale = document.getElementById("arrowBackModale");
const buttonModale1 = document.getElementById("buttonModale1");
const backgroundModale = document.getElementById("modale1");
const modalInside = document.querySelector(".inside-modale");
const allElementsModale1 = document.getElementsByClassName("modale1");
const modaleNumberOne = document.getElementById("modaleNumberOne");
const modaleNumberTwo = document.getElementById("modaleNumberTwo");
const allElementsModale2 = document.getElementsByClassName("modale2");
const hiddenInputModale2 = document.getElementById("file-input");
const validerModale2 = document.getElementById("validerModale2");
const categoryInput = document.getElementById("category");
const divImageModale2 = document.getElementById("divImageModale2");
const titleInputModale2 = document.getElementById("title");
const galleryModale = document.getElementById("galleryModale");
const gallery = document.querySelector(".gallery");

initAllSetsOfData().then(() => {
  loadDataSet(allProjects);
  initAdminElements();
});

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
}

function loadDataSet(works) {
  works.forEach((work) => {
    categories.add(work.categoryId);

    const dom_figure = document.createElement("figure");
    dom_figure.id = "galleryFigure";
    dom_figure.setAttribute("data-workId", work.id);
    gallery.appendChild(dom_figure);

    const dom_img = document.createElement("img");
    dom_img.crossOrigin = "anonymous";
    dom_img.src = work.imageUrl;
    dom_img.alt = work.title;
    dom_figure.appendChild(dom_img);

    const dom_figcaption = document.createElement("figcaption");
    dom_figcaption.textContent = work.title;
    dom_figure.appendChild(dom_figcaption);

    const projetModale = document.createElement("div");
    projetModale.setAttribute("data-workId", work.id);
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

    const modaleTrashIcon = document.createElement("i");
    modaleTrashIcon.className = "fa-solid fa-trash-can";
    projetModale.appendChild(modaleTrashIcon);

    const modaleArrowIcon = document.createElement("i");
    modaleArrowIcon.className = "fa-solid fa-arrows-up-down-left-right";
    projetModale.appendChild(modaleArrowIcon);
    // console.log(projetModale);
  });
}

function clearAll() {
  console.log("clearAll actif");
  gallery.innerHTML = "";
  modalInside.innerHTML = "";
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
    openModale();
  } else {
    // Not admin mode
  }
}

function openModale() {
  // // Récupération de la div parente pour le bouton modifier
  let portfolioEditDiv = document.getElementById("portfolioeditDiv");
  // // Récupération de tous les enfants de la div parente
  let childrenEditDiv = portfolioEditDiv.children;
  console.log("children", childrenEditDiv);
  // // Boucle sur tous les enfants pour leur attribuer un ID unique
  for (var i = 0; i < childrenEditDiv.length; i++) {
    childrenEditDiv[i].id = "portfolioeditDivChild" + (i + 1);
  }
  document.addEventListener("click", (event) => {
    if (
      event.target.id === "portfolioeditDiv" ||
      event.target.id === "portfolioeditDivChild1" ||
      event.target.id === "portfolioeditDivChild2"
    ) {
      backgroundModale.style.display = "flex";
    }
  });
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

backgroundModale.addEventListener("click", function (event) {
  if (event.target.id === "modale1" || event.target.id === "closeModale") {
    backgroundModale.style.display = "none";
  } else if (event.target.className.includes("fa-trash-can")) {
    deleteModaleProject(event.target);
  } else if (event.target.id === "buttonModale1") {
    modaleNumberOne.style.display = "none";
    modaleNumberTwo.style.display = "flex";
  } else if (event.target.id === "arrowBackModale") {
    modaleNumberOne.style.display = "flex";
    modaleNumberTwo.style.display = "none";
  }
});

async function deleteModaleProject(trashIcon) {
  console.log("click sur la croix");
  const parentTrash = trashIcon.parentElement;
  console.log("parenttrash", parentTrash.getAttribute("data-workId"));
  const galleryTrash = [...document.querySelector(".gallery").children];
  // le [...] permet de faire un Array avec ce qui est a l'interieur
  console.log("gallery", galleryTrash);

  // Envoyer une requête DELETE à l'API
  await fetch(
    `http://localhost:5678/api/works/${parentTrash.getAttribute(
      "data-workId"
    )}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage["adminToken"]}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      // Vérifier que la réponse est de type "ok"
      if (response.ok) {
        // Supprimer l'élément de la page web
        galleryTrash.forEach((figure) => {
          if (
            figure.getAttribute("data-workId") ===
            parentTrash.getAttribute("data-workId")
          ) {
            figure.remove();
          }
        });
        parentTrash.remove();
      } else {
        console.log(response, "reponse du fetch delete");
        throw new Error("Unable to delete item");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const fileInput = document.querySelector("#file-input");
fileInput.addEventListener("change", function () {
  const selectedFileInput = fileInput.files[0];
  const imgInputElement = document.createElement("img");
  imgInputElement.src = URL.createObjectURL(selectedFileInput);
  imgInputElement.alt = selectedFileInput.name;
  divImageModale2.appendChild(imgInputElement);
  imgInputElement.style.position = "absolute";
});

async function addNewProject() {
  const formData = new FormData();
  // Ajout du fichier a l'objet FormData
  formData.append("image", fileInput.files[0]);
  formData.append("title", titleInputModale2.value);
  formData.append("category", categoryInput.value);
  console.log("yo c'est le fileInput (l'image)", fileInput[0]);
  console.log("le formdata", formData);

  await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage["adminToken"]}`,
    },
    body: formData,
  }).then(async (response) => {
    if (response.ok) {
      divImageModale2.querySelector("img").remove();
      hiddenInputModale2.value = "";
      titleInputModale2.value = "";
    } else {
      console.log("error");
      alert(
        "Veuillez verifier que vous avez bien ajouté un Titre et une image au bon format"
      );
    }
  });
}

validerModale2.addEventListener("click", () => {
  addNewProject()
    .then(() => {
      allProjects.forEach((projet) => {
        allProjects.delete(projet);
      });
      clearAll();
    })
    .then(() => {
      initAllSetsOfData().then(() => {
        loadDataSet(allProjects);
        initAdminElements();
        console.log("2emelog", allProjects);
        backgroundModale.style.display = "none";
        // modaleNumberOne.style.display = "flex";
        // modaleNumberTwo.style.display = "none";
      });
    });
});
