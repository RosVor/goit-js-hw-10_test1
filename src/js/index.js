import { getBreeds, fetchCatByBreed } from "./cat-api";

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const div = document.querySelector('.cat-info');
error.style.display = 'none';
select.style.display = 'none';

getBreeds()
  .then(data => {
    loader.style.display = 'none';
    select.style.display = 'block';
    select.innerHTML = data.map(element => `<option value="${element.id}">${element.name}</option>`).join('');
  })
  .catch(() => showError());

select.addEventListener('change', onChangeBreed);

function onChangeBreed(e) {
    e.preventDefault();
    loader.style.display = 'block';
    div.style.display = 'none';
    error.style.display = 'none';
    let breedId = e.target.value;
    fetchCatByBreed(breedId)
      .then(data => {
        loader.style.display = 'none';
        div.style.display = 'block';
        div.innerHTML = data.map(element =>
          `<div><img src="${element.url}" alt="photo cat" width="500" height="400"/></div>`
        ).join('');
  
        const findCat = data[0].breeds.find(option => option.id === breedId);
        if (findCat) {
          const markup = `<div>
            <h2>${findCat.name}</h2>
            <p>${findCat.description}</p>
            <h3>Temperament</h3>
            <p>${findCat.temperament}</p>
          </div>`;
          div.insertAdjacentHTML('beforeend', markup);
        } else {
          showError();
        }
      })
      .catch(error => {
        console.error(error);
        showError();
      })
      .finally(() => loader.style.display = 'none');
  }
  
  function showError() {
    loader.style.display = 'none';
    div.style.display = 'none';
    error.style.display = 'block';
  }