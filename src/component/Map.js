import React, {useEffect} from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';


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
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(parameter.placeName, placesSearchCB); 

        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                map.setBounds(bounds);
            } 
        }

        function displayMarker(place) {
          let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });
          kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
          });
        }
      },[parameter.placeName]);
    }
    
    MapContainer();
    return(
        <div className = "mapContent" id="map"></div>
    );
}

export default Map;