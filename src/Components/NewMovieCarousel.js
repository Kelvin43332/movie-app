/* eslint eqeqeq: 0 */
import React from 'react';

function NewMovieCarousel(props) {
    const [movies, setMovies] = React.useState([props.movies]);

    React.useEffect(() => {
        setMovies(props.movies);
    }, [props.movies])

    return (
      
        <div id="movie-banners__component" className="row">
        <div className="col-md-12">
        <div id="movie-banners__carousel-controller" className="carousel slide" data-ride="carousel" data-interval="3000">
            <ol className="carousel-indicators">
                {movies.map(function (movie, index) {
                    return (
                        <li key={`movie-${index}`} data-target="#movie-banners__carousel-controller" data-slide-to={index} className={`${index == 0 ? "active" : "" }`}></li>
                    );

                })}
            </ol>
            <div className="carousel-inner">
            {movies.map(function (movie, index) {
                return (
                    <div key={`movie-${index}`} className={`carousel-item ${index == 0 ? "active" : ""}`}>
                        <img src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{movie.original_title}</h5>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                );
            })}
            </div>
            <a className="carousel-control-prev" href="#movie-banners__carousel-controller" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#movie-banners__carousel-controller" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        </div>
    </div>
    );
}

  export default NewMovieCarousel;