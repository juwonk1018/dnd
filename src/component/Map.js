import React, {useEffect} from 'react';


function Map(parameter){
    const {kakao} = window; 

    const MapContainer = () => {
      useEffect(()=> {
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 1
        };
        const map = new kakao.maps.Map(container, options);

        if(parameter.keyValue){
          let bounds = new kakao.maps.LatLngBounds();
          displayMarker(parameter.data[parameter.keyValue]);
          bounds.extend(new kakao.maps.LatLng(parameter.data[parameter.keyValue].y, parameter.data[parameter.keyValue].x));
          map.setBounds(bounds);
        }

        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });
          kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div class="infowindow">' + place.place_name + '</div>');
            infowindow.open(map, marker);
          });
        }
      },[parameter.keyValue]);
    }
    
    MapContainer();
    return(
        <div className = "mapContent" id="map"></div>
    );
}

export default Map;