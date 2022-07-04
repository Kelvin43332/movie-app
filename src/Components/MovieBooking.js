/* eslint eqeqeq: 0 */
import React from 'react';

let moviesRetrieved = [
  {name: "Spider-Man: No Way Home"},
  {name: "The Matrix Resurrections"},
  {name: "The King's Man"},
  {name: "Sing 2"},
  {name: "G Storm"},
  {name: "Encanto"}
]

function MovieBooking(props) {

    const [cinemas, setCinemas] = React.useState(props.cinemas);
    const [movies, setMovies] = React.useState(moviesRetrieved);
    const [next7Date, setNext7Date] = React.useState([]);
    const [timings, setTimings] = React.useState([]);

    const [movieSelected, setMovieSelected] = React.useState("");
    const [cinemaSelected, setCinemaSelected] = React.useState("");
    const [dateSelected, setDateSelected] = React.useState("");
    const [timingSelected, setTimingSelected] = React.useState("");
    const [numberOfTickets, setNumberOfTickets] = React.useState(1);
    const [comment, setComment] = React.useState("");
    // const [isSeperateSeatingSelected, setIsSeperateSeatingSelected] = React.useState(true);

    function handleMovieSelectChange(event){
      setMovieSelected(event.target.value);
    }

    function handleCinemaSelectChange(event){
      setCinemaSelected(event.target.value);
    }

    function handleDateSelectChange(event){
      setDateSelected(event.target.value);
    }

    function handleTimingSelectChange(event){
      setTimingSelected(event.target.value);
    }

    React.useEffect(() => {
      retrieveNext7Date();
    }, []);

    React.useEffect(() => {
      setCinemas(props.cinemas);
  }, [props.cinemas])

    function retrieveNext7Date() {
      let next7Date = [];
      
      let currentDate = new Date();
      for(let i = 0 ; i < 7; i++) {
          if(i > 0){
              currentDate.setDate(currentDate.getDate() + 1);
          }
  
          let day = currentDate.getDate().toString().length < 2 ? "0" + currentDate.getDate() : currentDate.getDate().toString();
          let month = (currentDate.getMonth() + 1).toString().length < 2 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1).toString();
          let year = currentDate.getFullYear();
  
          next7Date.push(`${day} ${month} ${year}`);
      }

      setNext7Date(next7Date);
    }

    function handleCheckMovieAvailabilityButtonOnClick(){
      document.querySelector("#find-seating__time-available-form-section").classList.add("d-none");
      document.querySelector("#find-seating__add-calendar-btn").classList.remove("d-none");
    }

    function handleAddToCalendarOnClick(){  
      if(movieSelected.trim().length <= 0){ 
        alert("Please select a movie");
        return;
      } 
      
      if(cinemaSelected.trim().length <= 0){ 
        alert("Please select a cinema");
        return;
      } 

      if(dateSelected.trim().length <= 0){ 
        alert("Please select a date");
        return;
      } 

      if(numberOfTickets <= 0){ 
        alert("Number of tickets must be more than 0");
        return;
      }

      if(timingSelected.trim().length <= 0){ 
        alert("Please select from the available timing");
        return;
      } 

      let calendarEvent = {
          movie: movieSelected, 
          cinema: cinemaSelected,
          date: dateSelected,
          time: timingSelected,
          numberOfTickets: numberOfTickets,
          comment: comment,
      }

      let calendarEventsSaved = JSON.parse(localStorage.getItem("calendarEvents") == null ? "[]" : localStorage.getItem("calendarEvents"));
      calendarEventsSaved.push(calendarEvent);
      localStorage.setItem("calendarEvents", JSON.stringify(calendarEventsSaved));
      window.dispatchEvent(new Event('rerender-calendar'));
      document.querySelector("#find-seating__add-calendar-btn").classList.add("d-none");
      document.getElementById("find-seating__close-btn").click();
    }

    function checkIfTicketIsAvailable(){
      if(movieSelected.trim().length <= 0){ 
        alert("Please select a movie");
        return;
      } 
      
      if(cinemaSelected.trim().length <= 0){ 
        alert("Please select a cinema");
        return;
      } 

      if(dateSelected.trim().length <= 0){ 
        alert("Please select a date");
        return;
      } 

      if(numberOfTickets <= 0){ 
        alert("Number of tickets must be more than 0");
        return;
      } 

      setTimings(["11.30am", "12.35pm", "2.40pm", "4.10pm", "6.15pm", "8.25pm", "11.35pm"])
      document.querySelector("#find-seating__time-available-form-section,#find-seating__add-calendar-btn").classList.remove("d-none");
      //$("#find-seating__select-time-dropdown").html("");
      
      //timings.forEach(timing => {
      //    $("#find-seating__select-time-dropdown").append(`<option>${timing}</option>`);
      //})


    }

    return (
      <>
        <button id="calendar__book-movie-btn" className="btn btn-dark mr-4" data-toggle="modal" data-target="#calendar-event-modal" onClick={handleCheckMovieAvailabilityButtonOnClick}>Check Booking Availability</button>
        <div id="calendar-event-modal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
        
          <div className="modal-header">
            <h4 className="modal-title">Movie Booking</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="find-seating__select-movie-dropdown">Movie</label>
                <select className="form-control" id="find-seating__select-movie-dropdown" value={movieSelected} onChange={handleMovieSelectChange}>
                  <option key={`movie-disabled`} disabled></option>
                  {movies.map(function (movie, index) {
                    return (
                      <option key={`movie-${index}`} value={movie.name}>{movie.name}</option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="find-seating__select-cinema-dropdown">Cinema</label>
                <select className="form-control" id="find-seating__select-cinema-dropdown" value={cinemaSelected} onChange={handleCinemaSelectChange}>
                  <option key={`cinema-disabled`} disabled></option>
                  {cinemas.map(function (cinema, index) {
                    return (
                      <option key={`cinema-${index}`} value={cinema.name + ": " + cinema.location}>{cinema.name}: {cinema.location}</option>
                    );
                  })}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="find-seating__select-day-dropdown">Date</label>
                <select className="form-control" id="find-seating__select-day-dropdown" value={dateSelected} onChange={handleDateSelectChange}>
                <option key={`next7date-disabled`} disabled></option>
                  {next7Date.map(function (date, index) {
                    return (
                      <option key={`next7date-${index}`} value={date}>{date}</option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="find-seating__number-of-tickets">Number of Tickets</label>
                <input className="form-control" type="number" id="find-seating__number-of-tickets" value={numberOfTickets} onChange={e => setNumberOfTickets(e.target.value)}/>
              </div>

              <div id="find-seating__time-available-form-section" className="form-group d-none">
                <label htmlFor="find-seating__select-day-dropdown">Timing Available</label>
                <select className="form-control" id="find-seating__select-time-dropdown" value={timingSelected} onChange={handleTimingSelectChange}>
                  <option key={`timing-disabled`} disabled></option>
                    {timings.map(function (timing, index) {
                      return (
                        <option key={`timing-${index}`} value={timing}>{timing}</option>
                      );
                    })}
                </select>

                <label htmlFor="find-seating__comment" className="mt-3">Comment</label>
                <input className="form-control" type="text" id="find-seating__comment" value={comment} onChange={e => setComment(e.target.value)}/>
                
                <button id="find-seating__add-calendar-btn" type="button" className="btn btn-dark mt-4" onClick={handleAddToCalendarOnClick}>Add to Calendar</button>
              </div>

              <div id="find-seating__no-time-available-form-section" className="form-group text-danger d-none" >
                <label htmlFor="find-seating__select-day-dropdown">No timing available. Please choose another date</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div id="cart-complete-message" className="alert alert-success d-none">
              <strong>Success!</strong> Order has been made. Please check your e-mail for your e-receipt. 
            </div>

            <div id="cart-failure-message" className="alert alert-danger d-none">
              <strong>Failure!</strong> An error has occured. Please resubmit your order, sorry for any inconvenience caused. 
            </div>

            <button id="find-seating__check-availability-btn" type="button" className="btn btn-success" onClick={checkIfTicketIsAvailable}>Check Availability</button>
            <button id="find-seating__close-btn" type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
      </>

    );
}

export default MovieBooking;


