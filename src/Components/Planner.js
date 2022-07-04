/* eslint eqeqeq: 0 */
import React from 'react';
import MovieBooking from '../Components/MovieBooking'
import GoogleMap from './GoogleMap';

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let cinemasRetrieved = [
  {name: "Cathay Cineplex",       location: "Cineleisure Orchard",    latitute: 1.3019011203850566, longitude: 103.83656276827858},
  {name: "Cathay Cineplex",       location: "Downtown East",          latitute: 1.377786505940873,  longitude: 103.95462664333863},
  {name: "Eaglewings Cinematics", location: "King Albert Park Mall",  latitute: 1.3372169654840544, longitude: 103.77944312586509},
  {name: "Filmgarde Cineplexes",  location: "Century Square",         latitute: 1.3525389608712453, longitude: 103.94387815470017},
  {name: "Golden Village",        location: "VivoCity",               latitute: 1.2646374473139483, longitude: 103.82218276975293},
  {name: "Golden Village",        location: "Plaza Singapura",        latitute: 1.3006604119132394, longitude: 103.84527851237027},
  {name: "Shaw Theatres",         location: "Nex",                    latitute: 1.3509439126798533, longitude: 103.87226922586513}
];


function Planner(props) {

  const [cinemas, setCinemas] = React.useState(cinemasRetrieved);
  const [yearSelected, setYearSelected] =  React.useState(new Date().getFullYear().toString());
  const [monthSelected, setMonthSelected] =  React.useState((new Date().getMonth() + 1).toString());

    React.useEffect(() => {
        constructCalendar(yearSelected, monthSelected);
        window.addEventListener('rerender-calendar', () => constructCalendar(yearSelected, monthSelected));
      }, []);
        
    function constructCalendar(year, month){
        let numberOfDaysInCurrentMonth = 31;
        if([4,6,9,11].includes(month)) {
            numberOfDaysInCurrentMonth = 30;
        }
        if(month == 2) {
            numberOfDaysInCurrentMonth = year % 4 == 0 ? 29 : 28;
        }
    
        //https://preview.colorlib.com/theme/bootstrap/calendar-04/
         //https://cs.uwaterloo.ca/~alopez-o/math-faq/mathtext/node39.html
        let firstDayOfMonth = 1;
        let gregorianMonth = month - 2 <= 0 ? 10 + month : month-2; //March = 1 Apr=2 May=3 Jun=4 Jul=5 Aug=6 Sep=7 Oct=8 nov=9 dec=10 jan=11 feb=12
        let gregorianYear = gregorianMonth > 10 ? year - 1 : year;
        let century = Math.floor(gregorianYear / 100);
        let yearWithoutCentury = gregorianYear - (century * 100);
        //output: //0=Sunday 1=Monday ... 6=Saturday
        let dayOfMonthOfYear =   (firstDayOfMonth + Math.floor(2.6 * gregorianMonth - 0.2) - (2 * century) + yearWithoutCentury + Math.floor(yearWithoutCentury/4) + Math.floor(century/4)) % 7;
        dayOfMonthOfYear = dayOfMonthOfYear < 0 ? 7 + dayOfMonthOfYear : dayOfMonthOfYear;
      
        
        let rowHTML = "<tr>";
        let weekCountdown = 7;
        for(let i = 0 - dayOfMonthOfYear; i < numberOfDaysInCurrentMonth; i++) {
            weekCountdown = weekCountdown - 1;
    
            if(i < 0) {
                rowHTML = rowHTML + `<td day="empty"></td>`
            } else {
                rowHTML = rowHTML + `<td class="day-event-button" day="${i+1 < 10 ? ("0"+(i+1)) : (i+1) }">${i + 1}</td>`
            }
            
            if (weekCountdown == 0) {
                rowHTML = rowHTML + "</tr><tr>"
                weekCountdown = 7;
            } 
    
    
        }
        if(weekCountdown != 7) {
            for(let i = 0 ; i < weekCountdown; i++) {
                rowHTML = rowHTML + `<td day="empty"></td>`
            }
        }
    
        rowHTML = rowHTML + "</tr>";
        
        document.querySelector("#calendar__day-table tbody").innerHTML = rowHTML;
        retrieveDayWithEventsGivenMonthAndYear(month, year);
        configureEventCard("01", year, month);

        document.querySelectorAll(".day-event-button").forEach(dayEvent => {
          dayEvent.addEventListener('click', () => configureEventCard(dayEvent.getAttribute("day"), year, month));
        })
        
    }
    
    function yearLeftArrowButtonOnClick(){
      constructCalendar(+yearSelected <= 2000 ? 2000 : +yearSelected - 1, monthSelected)
      setYearSelected(+yearSelected <= 2000 ? 2000 : +yearSelected - 1); 
    }

    function yearRightArrowButtonOnClick(){
      constructCalendar(+yearSelected >= 2050 ? 2050 : +yearSelected + 1, monthSelected)
      setYearSelected(+yearSelected >= 2050 ? 2050 : +yearSelected + 1);         
    }

    function monthLeftArrowButtonOnClick(){
      constructCalendar(yearSelected, +monthSelected <= 1 ? 12 : +monthSelected - 1)
      setMonthSelected(+monthSelected <= 1 ? 12 : +monthSelected - 1); 
    }
    
    function monthRightArrowButtonOnClick(){
      constructCalendar(yearSelected, +monthSelected >= 12 ? 1 : +monthSelected + 1)
      setMonthSelected(+monthSelected >= 12 ? 1 : +monthSelected + 1);
    }
            
    
    function retrieveDayWithEventsGivenMonthAndYear(month, year) {
        if(localStorage.getItem("calendarEvents") == null){
            return;
        } 
        let calendarEventsSaved = JSON.parse(localStorage.getItem("calendarEvents"));
        calendarEventsSaved.forEach(calendarEvent => {
            let dayOfCalendarEvent = calendarEvent.date.substring(0,2);
            let monthOfCalendarEvent = calendarEvent.date.substring(3,5);
            let yearOfCalendarEvent = calendarEvent.date.substring(6,10);
            if(yearOfCalendarEvent == year && +monthOfCalendarEvent == month) {
                document.querySelector(`#calendar__day-table .day-event-button[day='${dayOfCalendarEvent}']`).classList.add("has-event");
            }
        })
    }
    
    function configureEventCard(day, year, month) {
        let calendarEventsSaved = JSON.parse(localStorage.getItem("calendarEvents"));
        let cardBodyHTML = "";
        if(calendarEventsSaved != null) {
            calendarEventsSaved.forEach(calendarEvent => {
                let dayOfCalendarEvent = +calendarEvent.date.substring(0,2);
                let monthOfCalendarEvent = +calendarEvent.date.substring(3,5);
                let yearOfCalendarEvent = +calendarEvent.date.substring(6,10);
                if(yearOfCalendarEvent == year && monthOfCalendarEvent == month && dayOfCalendarEvent == day) {
        
                    cardBodyHTML = cardBodyHTML + 
                    `<div>
                        <div><b>${calendarEvent.time}</b></div>
                        <div class="text-success font-weight-bold">${calendarEvent.movie}</div>
                        <div class="text-primary">${calendarEvent.cinema}</div>
                        <div >${calendarEvent.comment == undefined ? "" : calendarEvent.comment}</div>
                    </div>
                    <hr>`
        
                }
            })    
        }
        cardBodyHTML = cardBodyHTML.length < 1 ? "Click on Check Booking Availability to create your first event!" : cardBodyHTML;  
        document.querySelector("#event__event-title").innerHTML = `Event (${day}/${month}/${year})`;
        document.querySelector(`#event__event-card .card-body`).innerHTML = cardBodyHTML;
    }
    
    


    return (
        <>
        <div className="container">
        <div className="row">
          <div id="planner-container" className="col-md-12">
            <div className="row">
              <div className="col-xs-12 col-md-8  order-md-1 mb-2">
                <div id="calendar__component" className="container">
                  <div id="calendar__calendar-box" className="">
                    <div id="calendar__year-selector-flexbox" className="d-flex justify-content-around">
                      <i id="calendar__year-left-arrow-button" className="fas fa-angle-left" onClick={() => yearLeftArrowButtonOnClick()}></i>
                      <div id="calendar__year-current">{yearSelected}</div>
                      <i id="calendar__year-right-arrow-button" className="fas fa-angle-right" onClick={() => yearRightArrowButtonOnClick()}></i>
  
                    </div>
                    <div id="calendar__month-selector-flexbox" className="d-flex justify-content-around">
                      <i id="calendar__month-left-arrow-button" className="fas fa-angle-left" onClick={() => monthLeftArrowButtonOnClick()}></i>
                      <div id="calendar__month-current" month={+monthSelected}>{months[+monthSelected - 1]}</div>
                      <i id="calendar__month-right-arrow-button" className="fas fa-angle-right" onClick={() => monthRightArrowButtonOnClick()}></i>               
                    </div>
                    <div id="calendar__day-table" className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <td>Sun</td>
                            <td>Mon</td>
                            <td>Tue</td>
                            <td>Wed</td>
                            <td>Thu</td>
                            <td>Fri</td>
                            <td>Sat</td>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                    <div id="calendar__month-selector-flexbox" className="d-flex justify-content-end">             
                      <MovieBooking cinemas={cinemas}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 order-first order-md-2">
                <div id="event__component" className="container">
                  <div id="event__event-card" className="card">
                    <div className="card-header"><h3 id="event__event-title">Event</h3></div>
                    <div className="card-body">No bookings today  </div> 
                    <div className="card-footer"></div>
                  </div>
                </div>
              </div>
            </div>

            <GoogleMap cinemas={cinemas}/>
          </div>
        </div>
  
        </div>


        </>
    );
}

export default Planner;
