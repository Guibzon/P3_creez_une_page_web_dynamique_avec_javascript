// ------------------ Objet Set ------------------
const categories = new Set();
const allProjects = new Set();
const objectsProjects = new Set();
const apartmentProjects = new Set();
const hotelAndRestaurantProjects = new Set();

initAllSetsOfData();

async function fetchAllWorks() {
  const works = await fetch("http://localhost:5678/api/works", {
    headers: {
      "Cross-Origin-Ressource-Policy": "cross-origin",
    },
  });
  if (works.ok) {
    return works.json();
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

function loadDataSet(data) {
  const gallery = document.querySelector(".gallery");

  data.forEach((work) => {
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
