/* global google */
/* eslint eqeqeq: 0 */
import React from 'react';

function GoogleMap(props) {

    React.useEffect(() => {
        generateMap(props.cinemas);
    }, []);

    function generateMap(cinemas) {
    
        let latitute = cinemas[0].latitute;
        let longitude = cinemas[0].longitude;
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                latitute = position.coords.latitude;
                longitude = position.coords.longitude;  
                constructMap(cinemas, latitute, longitude, true);  
            });
        } else { 
    
        }
    
        constructMap(cinemas, latitute, longitude, false);
    
    }
    
    function constructMap(cinemas, latitute, longitude, isLocationEnabled) {
        var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 11,
            center: new google.maps.LatLng(latitute, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        
            var infowindow = new google.maps.InfoWindow();
        
            let nearestCinema = -1;
            var marker;
            if(isLocationEnabled) {
    
                let nearestDistance = 1000000;
                for (let i = 0; i < cinemas.length; i++) {  
    
                    let distanceFromLocationToCurrentCinema = calculateDistance(cinemas[i].latitute, cinemas[i].longitude, latitute, longitude);
                    nearestCinema = distanceFromLocationToCurrentCinema < nearestDistance ? i : nearestCinema;
                    nearestDistance = distanceFromLocationToCurrentCinema < nearestDistance ? distanceFromLocationToCurrentCinema : nearestDistance;
                }
    
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitute, longitude),
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });
    
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent("Your current location is nearest to " + cinemas[nearestCinema].name + ": " + cinemas[nearestCinema].location);
                        infowindow.open(map, marker);
                    }
                })(marker, -1));
    
                infowindow.setContent("Your current location is nearest to " + cinemas[nearestCinema].name + ": " + cinemas[nearestCinema].location);
                infowindow.open(map, marker);
    
            }
            
            for (let i = 0; i < cinemas.length; i++) {  
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(cinemas[i].latitute, cinemas[i].longitude),
                    map: map,
                    icon: nearestCinema == i ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });
            
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                    infowindow.setContent(i + ") " + cinemas[i].name + ": " + cinemas[i].location);
                    infowindow.open(map, marker);
                    }
                })(marker, i));
            }
    }
    
    //Reference: https://www.geodatasource.com/developers/javascript
    function calculateDistance(lat1, lon1, lat2, lon2,) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
    
            return dist;
        }
    }
    
    return (
        <div className="row mt-3">
        <div className="col-md-12">
          <div id="map__component" className="container">
            <div id="googleMap"></div>
          </div>
        </div>           
      </div>
    );
}


export default GoogleMap;