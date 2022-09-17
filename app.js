const url = "https://bakr-app.herokuapp.com/api/city/getCities";

const main = document.getElementById("main1");
getMovies(url);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      showCities(data.data);
      // movieDetails(data.results);
    });
}

function showCities(data) {
  data.forEach((city) => {
    const { id, name, pic, area } = city;
    const cityCard = document.createElement("div");
    cityCard.classList.add("movie");
    cityCard.innerHTML = `
      <a href="./cityDetails.html?id=${id}">
        <div>
        <img src="${pic}" alt="poster">
        </div>
        <h4>${name}</h4>
        <span>${area}</span>
        <span id="type">City</span>
      <a/>`;
    main.appendChild(cityCard);
  });
}

let cityId = location.search.split("=")[1];
console.log(cityId);
// const urlId = "https://bakr-app.herokuapp.com/api/city/getCityById/";
// console.log(urlId);
const cityData = document.getElementById("cityDetails");
function cityDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.data.forEach((city) => {
        if (city.id == cityId) {
          const {
            aboutTheCity,
            name,
            pic,
            area,
            population,
          } = city;
          const cityElement = document.createElement("div");
          cityElement.classList.add("container");
          cityElement.innerHTML = `
            <div id="moviePic">
              <img src="${pic}" alt="poster">
            </div>
            <div id="title">
              <h1>${name}</h1>
              <p>Area: ${area}</p>
              <p>Population: ${population}</p>
              <br>
              <p id="overview">${aboutTheCity}</p>
            </div>
          `;
          cityData.appendChild(cityElement);
        }
      });
    });
}

cityDetails(url);