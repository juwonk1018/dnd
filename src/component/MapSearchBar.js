import React, { useState } from 'react';
import Map from './Map.js'

import {Input} from 'antd';


function MapSearchBar(){
    const {Search} = Input;
    const [place, setPlace] = useState("");

    const OnSearch = value => {
        setPlace(value);
    }

    return(
    <div>
        <div className = "mapSearchBar">
        <Search placeholder="검색할 주소 혹은 장소"
        
        onSearch = {OnSearch}/>
        </div>
        <div>
            <Map placeName = {place}/>
        </div>
    </div>
    );
}

export default MapSearchBar;