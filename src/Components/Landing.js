/* eslint eqeqeq: 0 */
import React from 'react';
import {upcomingMovies} from '../data';
import NewMovieCarousel from './NewMovieCarousel';
import Reviews from './Reviews';
import TopMovieLists from './TopMoviesList';
let apiKeyTheMovieDB = "d92f0f6dfdc83d015aa5e21b2ac20046";
let apiKeyNYTimes = "6IDNccAqG2GbqO6gGpfhDK6v0onTupet";

function Landing(props) {
    const [movies, setMovies] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [allTimeTopMovies, setAllTimeTopMovies] = React.useState([]);

    React.useEffect(() => {
        // Update the document title using the browser API
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKeyTheMovieDB}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results)
        });

        fetch(`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${apiKeyNYTimes}&offset=1`)
        .then(response => response.json())
        .then(data => {
            setReviews(data.results)
        });

        fetch(`https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json`)
        .then(response => response.json())
        .then(data => {
            let moviesRetrieved = data;
            let moviesFromFetch = [];
            for(let i = 0; i < 10; i++){ 
                fetch(`https://api.themoviedb.org/3/find/${moviesRetrieved[i].id}?api_key=${apiKeyTheMovieDB}&external_source=imdb_id`)
                .then(response2 => response2.json())
                .then(data2 => {
                    moviesFromFetch.push(data2.movie_results[0]);
                    setAllTimeTopMovies(moviesFromFetch);    
                });
            }
        });

    }, []);

    return (
      
    <div>
        <div className="container">
            <div className="row">
                <div id="content-container" className="col-md-9">
                    <NewMovieCarousel movies={movies}></NewMovieCarousel>
                    <Reviews reviews={reviews}></Reviews>
                </div>
                <div id="top-movie-all-time-container" className="col-xs-12 col-md-3">
                    <TopMovieLists allTimeTopMovies={allTimeTopMovies}></TopMovieLists>
                </div>
            </div>


        </div>
    </div>
    );
}

  export default Landing;


//   function retrieveUpcomingMoviesByAjax() {
        
//     let apiKey = "d92f0f6dfdc83d015aa5e21b2ac20046";
//     $.ajax(
//         {
//             "async": true,
//             "crossDomain": true,
//             url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`, 
//             type:'GET',
//             success: function(result){
//                 let movies = result.results;
//                 let hasActiveBeenDefined = false;
//                 let movieID = 0;
//                 movies.forEach(movie => {
//                     let title = movie.original_title;
//                     let description = movie.overview;
//                     let banner = `http://image.tmdb.org/t/p/original/${movie.backdrop_path}`

//                     let carouselHTML = 
//                         `<div class="carousel-item ${!hasActiveBeenDefined ? "active" : "" }">
//                             <img src="${banner}" class="d-block w-100" alt="...">
//                             <div class="carousel-caption d-none d-md-block">
//                                 <h5>${title}</h5>
//                                 <p>${description}</p>
//                             </div>
//                         </div>`;
//                     $("#movie-banners__component .carousel-inner").append(carouselHTML);

//                     let carouselIndicatorHTML = 
//                         `<li data-target="#movie-banners__carousel-controller" data-slide-to="${movieID}" class=${!hasActiveBeenDefined ? "active" : "" }></li>`;

//                     $("#movie-banners__component .carousel-indicators").append(carouselIndicatorHTML);
//                     hasActiveBeenDefined = true;
//                     movieID = movieID + 1;
//                 })
                
//                 //Sample image URL: http://image.tmdb.org/t/p/original/uHA5COgDzcxjpYSHHulrKVl6ByL.jpg
                
//                 console.log(result);
//             }
//         }
//     );
// }