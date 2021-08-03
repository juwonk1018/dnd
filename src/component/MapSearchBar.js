import React, { useState } from 'react';
import Map from './Map.js'

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


function MapSearchBar(){
    const {kakao} = window;
    const [key, setKey] = useState("");
    const [location, setLocation] = useState("");
    const [options, setOptions] = useState([]);
    const [savedData, setSavedData] = useState([]);

    var result = [];
      
    const splitArray = (array, idx) => ({
        key : ""+idx,
        value : array[idx].place_name,
        addr : array[idx].address_name
    });

    const OnSearch = (event, value) => {
        var searchText = value;
        setOptions([]);
        const ps = new kakao.maps.services.Places();
        !searchText && setSavedData([]);
        searchText && ps.keywordSearch(searchText, placesSearchCB);
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                result = [];
                if(searchText){
                    for(let i=0; i<data.length;i++){
                        result.push(splitArray(data,i));
                    }   
                    setSavedData(data);
                }
                setOptions(
                    !searchText ? [] : result,
                );
            }
        }
    }

    const onSelect = (event, value) => {
        value && setKey(value.key);
        value && setLocation(options[value.key].addr);
        
    };

    return(
    <div>
        <div className = "mapSearchBar">
            <Autocomplete
                options={options}
                size = "small"
                noOptionsText = "검색결과 없음"
                getOptionLabel={(option) => option.value}
                getOptionSelected={(option, value) => option.addr === value.addr && option.value === value.value}
                onChange = {onSelect}
                onInputChange={OnSearch}
                style={{ width: 280}}
                renderInput={(params) => <TextField {...params} label="장소 및 위치" variant="outlined" />}
                renderOption={ (option) => {
                    return(
                        <div>
                            <div>
                                {option.value}
                            </div>
                            <span>{option.addr}</span>
                        </div>
                        
                    )
                }}
            />
        </div>
        <div>
            <Map data = {savedData} keyValue = {key} Location = {location}/>
        </div>
    </div>
    );
}

export default MapSearchBar;