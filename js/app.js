// using the TMDB API
const API_KEY = 'api_key=2d0f9d8849605adc87bb2e32674bd0d3';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovies(url) {
    fetch(url)
        .then((response) => response.json()) //single statement hence we can remove the paranthesis.
        .then((responseData) => {
            console.log(responseData);
            //passing the results object inside the Promise object obtained
            renderMovieSearchResults(responseData.results);
        });
}

//renders the results from the API call
function renderMovieSearchResults(results) {
    main.innerHTML = '';
    var tr = " ";
    results.forEach(movie => {
        //object destructuring
        console.log(movie);
        const { title, poster_path, vote_average, overview } = movie;
        const movie_Ele = document.createElement('div');
        console.log(movie_Ele);
        movie_Ele.classList.add('movie');
        console.log(vote_average);
        console.log(IMG_URL);
        tr = IMG_URL+poster_path;
        console.log(tr);
        movie_Ele.innerHTML = "<img src="+IMG_URL+poster_path +" alt='image'/><div class='movie-info'><h3>"+title+"</h3><span class='"+getColor(vote_average)+"'>"+vote_average+"</span></div><div class='overview'><h3>Overview</h3>"+overview+"</div>";
        main.appendChild(movie_Ele);
    });
}

//return the color as per movie rating
function getColor(vote_average) {
    if(vote_average>=8) {
        return "green";
    } else if(vote_average>=5 && vote_average<8) {
        return "orange"; 
    } else {
        return "red";
    }
}

//gets the "results" from the API call
getMovies(API_URL);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchText = search.value;

    if(searchText) {
        const fetchURL = SEARCH_URL+'&query='+searchText;
        getMovies(fetchURL);
    } else {
        getMovies(API_URL);
    }
});


