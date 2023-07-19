import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

loader.style.display = "none";
error.style.display = "none";
catInfo.style.display = "none";

async function populateBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = "block";
  } catch {
    error.style.display = "block";
  }
}

async function showCatInfo(breedId) {
  try {
    loader.style.display = "block";
    const cat = await fetchCatByBreed(breedId);
    catInfo.innerHTML = "";
    const image = document.createElement("img");
    image.src = cat[0].url;
    image.alt = "Cat";
    catInfo.appendChild(image);
    const breedName = document.createElement("h3");
    breedName.textContent = cat[0].breeds[0].name;
    catInfo.appendChild(breedName);
    const description = document.createElement("p");
    description.textContent = cat[0].breeds[0].description;
    catInfo.appendChild(description);
    const temperament = document.createElement("p");
    temperament.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;
    catInfo.appendChild(temperament);
    loader.style.display = "none";
    catInfo.style.display = "block";
  } catch {
    loader.style.display = "none";
    error.style.display = "block";
  }
}

populateBreedSelect();

breedSelect.addEventListener("change", event => {
  const breedId = event.target.value;
  showCatInfo(breedId);
});
