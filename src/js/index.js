import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const breedName = document.querySelector(".breed-name");
const breedDescription = document.querySelector(".breed-description");

loader.style.display = "none";
error.style.display = "none";
catInfo.style.display = "none";

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}
function showCatInfo(cat) {
  catImage.src = cat[0].url;
  breedName.textContent = `Порода: ${cat[0].breeds[0].name}`;
  breedDescription.textContent = `Опис: ${cat[0].breeds[0].description}`;
  breedTemperament.textContent = `Темперамент: ${cat[0].breeds[0].temperament}`;
}
axios.defaults.headers.common["x-api-key"] = "live_LzWstKXEcTZWINkexwtGU8aD5s4nwnEklAPCGBqnLHNNWMU6PFZUFZBRoLpj5nqA";

function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error while getting the list of breeds:", error);
      throw error;
    });
}
function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error getting information about cat:", error);
      throw error;
    });
}
fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    breedSelect.style.display = "block";
  })
  .catch(() => {
    error.style.display = "block";
  });

breedSelect.addEventListener("change", event => {
  const breedId = event.target.value;
  loader.style.display = "block";
  fetchCatByBreed(breedId)
    .then(cat => {
      showCatInfo(cat);
      loader.style.display = "none";
      catInfo.style.display = "block";
    })
    .catch(() => {
      loader.style.display = "none";
      error.style.display = "block";
    });
});