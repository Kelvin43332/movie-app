/* eslint eqeqeq: 0 */
function UpcomingMovies(props) {

    return (
      
      <div id={props.oUpcomingMovie.id} className="upcoming-movie-card">
        <div className="upcoming-movie-image-container">
          <img className="upcoming-movie-image" src={props.oUpcomingMovie.image} alt={props.oUpcomingMovie.title}/>
        </div>
        <div className="upcoming-movie-details-container">
          <h3 className="upcoming-movie-title">{props.oUpcomingMovie.title}</h3>
          <button className="upcoming-movie-review-button" movieURL={props.oUpcomingMovie.youtubeTrailerURL}>Watch Trailer</button>
        </div>
      </div>
    );
}

  export default UpcomingMovies;