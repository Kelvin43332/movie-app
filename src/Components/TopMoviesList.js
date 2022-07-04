/* eslint eqeqeq: 0 */
import React from 'react';

function TopMovieLists(props) {
    const [allTimeTopMovies, setAllTimeTopMovies] = React.useState([props.allTimeTopMovies]);

    React.useEffect(() => {
        setAllTimeTopMovies(props.allTimeTopMovies);
    }, [props.allTimeTopMovies])
    
    return (
        <div className="row">
            <h4 className="component-title">Top Movies</h4>
            <div id="top-movie-all-time__component" className="col-md-12">
                <div id="top-movies__responsive-list">
                    {allTimeTopMovies.map(function (movie, index) {
                        return (
                            <div key={`movie-${index}`} className="row">
                                <div className="col-xs-10 col-md-12">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-3">
                                            <img className="movie-img" src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
                                        </div>
                                        <div className="col-xs-12 col-md-9">
                                            <a className="text-primary" href={`https://www.imdb.com/title/${movie.id}/`}><b>{movie.title}</b></a>
                                            <div>Rating: <span className="badge badge-success float-right">{movie.vote_average}</span> </div>
                                            <div>Vote Count: <span className="badge badge-dark float-right">{movie.vote_count}</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

  export default TopMovieLists;