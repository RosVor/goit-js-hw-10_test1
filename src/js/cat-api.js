const options = {headers: {
  'x-api-key': `live_LzWstKXEcTZWINkexwtGU8aD5s4nwnEklAPCGBqnLHNNWMU6PFZUFZBRoLpj5nqA`
}
}
export function getBreeds() {
return fetch(`https://api.thecatapi.com/v1/breeds`, options)
  .then((response) => {
      if (!response.ok) {
      throw new Error(response.statusText)
  }
return response.json();
})}
export function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, options)
  .then((response) => {
      if (!response.ok) {
      throw new Error(response.statusText)
  }
return response.json();
})
}