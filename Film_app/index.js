let content = document.querySelector(".content-wrapper");
let searchInput = document.getElementById("input");


const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const API_HEADERS = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDllOWIwYTAwYjlkNDU1ZDdmOWMwZjEyYTRmNTY3NyIsIm5iZiI6MTczODc2ODk0Ny4xNCwic3ViIjoiNjdhMzgyMzM3MzU0MjA4MmI2OWZkYzgzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.P7CPbpaPawYiEVT0oNZsdqFf9mQvRGPrKw7Zxo5e2qg'
    }
};

let movieData = []; 


async function fetchMovies() {
    try {
        let response = await fetch(API_URL, API_HEADERS);
        let data = await response.json();
        movieData = data.results; 
        renderMovies(movieData); 
        mouseMove(); 
    } catch (error) {
        console.error("Klaida gaunant filmus:", error);
    }
}


function renderMovies(movies) {
    content.innerHTML = ""; 

    
    movies.slice(0, 18).forEach(movie => {  
        let imgJPG = movie.poster_path;    
        let title = movie.original_title;
        let imdbRating = movie.vote_average ? movie.vote_average.toFixed(2) : "N/A"; // suapvalinau iki dvieju skaicu po kablelio //NA neivertintas
        let filmDate = movie.release_date;
        let overview = movie.overview;

        const moviesBoxes = `<div class="main-card">
            <div><img src="https://image.tmdb.org/t/p/original/${imgJPG}"></div>
            <div class="card-header"> 
                <div class="title">${title}</div>
                <div class="rating-box">${imdbRating}</div>
            </div>
            <div class="card-bottom"> Release Date: ${filmDate} </div>
            <div class="film-description">
                <p style="font-weight: bold;">Overview</p>
                <p class="text">${overview}</p>
            </div>
        </div>`;

        content.innerHTML += moviesBoxes;
    });
}

// `mouseMove` kviečiamas po kiekvieno `renderMovies`, kad efektai veiktų tinkamai
function mouseMove() { 
    let mainCard = document.querySelectorAll(".main-card"); 

    mainCard.forEach(box =>  { 
        let slideBox = box.querySelector(".film-description");

        box.addEventListener("mouseenter", () => {
            slideBox.style.display = "block";
            setTimeout(() => {
                slideBox.style.bottom = "0";
            }, 10);
        });

        box.addEventListener("mouseleave", () => {
            slideBox.style.bottom = "-100px";
            setTimeout(() => {
                slideBox.style.display = "none";
            }, 500);
        });
    }); 
}


searchInput.addEventListener("input", function(event) { 
    let query = event.target.value.toLowerCase().trim(); 

    if (query === "") {
        renderMovies(movieData); 
        mouseMove(); 
        return;
    }

    let filteredMovies = movieData.filter(movie => 
        movie.original_title.toLowerCase().includes(query)
    );

    renderMovies(filteredMovies); 

    if (filteredMovies.length > 0) {
        setTimeout(() => {
            mouseMove(); 
        }, 500);
    }
});

fetchMovies(); // Paleidžiame API užklausą puslapiui užsikrovus



    
