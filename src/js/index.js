import { getBreeds, fetchCatByBreed } from "./cat-api";

const select = document.querySelector(`.breed-select`);
const loader = document.querySelector(`.loader`);
const error = document.querySelector(`.error`);
const div = document.querySelector(`.cat-info`);

error.style.visibility = `hidden`;
select.style.visibility = `hidden`;

getBreeds().then(data => {
    loader.style.visibility = `visible`;
    loader.style.visibility = `hidden`;
    select.style.visibility = `visible`;
    select.innerHTML = data.map(element => `<option value="${element.id}">${element.name}</option>`).join(``);
})
.catch(() => error.style.visibility = `visible`)
.finally(() => loader.style.visibility = `hidden`)
select.addEventListener(`change`, onChangeBreed);

function onChangeBreed(e) {
    e.preventDefault();
    loader.style.visibility = `visible`;
    div.style.visibility = `hidden`;
    let breedId = e.target.value;
    fetchCatByBreed(breedId)
        .then(data => {
            loader.style.visibility = `hidden`;
            div.style.visibility = `visible`;
            div.innerHTML = data.map(element =>
                `<div><img src="${element.url}" alt="photo cat" width="500" height="400"/></div>`).join(``)
            data.map(el => el.breeds.forEach(cat => {
                const array = [cat];
                const findCat = array.find(option => option.id === breedId);
                const makrup = `<div>
                <h2>${findCat.name}</h2>
                <p>${findCat.description}</p>
                <h3>Temperament</h3>
                <p>${findCat.temperament}</p>
                </div>`
                div.insertAdjacentHTML(`beforeend`, makrup)
            }))
        })
        .catch((error) => error.style.visibility = 'visible')
        .finally(() => loader.style.visibility = `hidden`)
}