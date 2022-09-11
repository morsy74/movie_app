const apiKey = "&api_key=3f6829f4ef0012728ce9e9bd49242c7e";
const url = "https://api.themoviedb.org/3";
const path = "/discover/movie?sort_by=popularity.desc";
const imgPath = "https://image.tmdb.org/t/p/w500";
const fullUrl = url + path + apiKey;

const main = document.getElementById("main");
getMovies(fullUrl);


function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
      // movieDetails(data.results);
    }
  )
}

function showMovies(data) {
  data.forEach((movie) => {
    const { id, title, poster_path, release_date, vote_average } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");
    movieCard.innerHTML = `
      <a href="./movieDetails.html?id=${id}">
        <div>
        <img src="${imgPath + poster_path}" alt="poster">
        <span id="rate">${vote_average}</span>
        </div>
        <h4>${title}</h4>
        <span>${release_date}</span>
        <span id="type">Movie</span>
      <a/>`;
    main.appendChild(movieCard)
  })
}

let movieId = location.search.split("=")[1];
const movieData = document.getElementById("movieDetails");
function movieDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((movie) => {
        if (movie.id == movieId) {
          const {
            overview,
            title,
            poster_path,
            release_date,
            vote_average,
            vote_count,
            popularity,
          } = movie;
          const movieElement = document.createElement("div");
          movieElement.classList.add("container");
          movieElement.innerHTML = `
            <div id="moviePic">
              <img src="${imgPath + poster_path}" alt="poster">
            </div>
            <div id="title">
              <h1>${title}</h1>
              <p>Vote: ${vote_average}</p>
              <p>Vote Count: ${vote_count}</p>
              <p>Popularity: ${popularity}</p>
              <p> Release Date: ${release_date}</p>
              <br>
              <p id="overview">${overview}</p>
            </div>
          `;
          movieData.appendChild(movieElement);
        }
      });
    });
}

movieDetails(fullUrl);

let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn .bi")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};