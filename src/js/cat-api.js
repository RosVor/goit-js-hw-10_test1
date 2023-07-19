import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_LzWstKXEcTZWINkexwtGU8aD5s4nwnEklAPCGBqnLHNNWMU6PFZUFZBRoLpj5nqA";
export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error while getting the list of breeds:", error);
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error getting information about cat:", error);
      throw error;
    });
}