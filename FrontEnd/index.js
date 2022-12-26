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

async function createGallery() {
  let works = await fetchAllWorks();

  // Sélectionnez l'élément parent de votre galerie
  const gallery = document.querySelector(".gallery");
  const categories = new Set();
  //explication fragment
  for (let work of works) {
    console.log(work);
    categories.add(work.categoryId);
    console.log(work.categoryId);

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
  }
}

createGallery();
console.log();

// ------------- PARTIE FILTRES ------------ //

const gallery = document.querySelector(".gallery");

async function activeAllFilters() {
  let gallery = await createGallery();

  const filterAll = document.getElementById("filterAll");
  filterAll.addEventListener("click", function () {
    for (let figure of gallery.children) {
      if (((figure.dataset.categoryId = 1), 2, 3)) {
        figure.style.display = "initial";
      } else {
        figure.style.display = "none";
      }
    }
  });

  const filterObject = document.getElementById("filterObject");
  filterObject.addEventListener("click", function () {
    for (let figure of gallery.children) {
      if ((figure.dataset.categoryId = 1)) {
        figure.style.display = "none";
      } else {
        figure.style.display = "none";
      }
    }
  });
}
