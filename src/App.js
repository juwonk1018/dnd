import React, { useState} from 'react';
import axios from "axios";

//Component
import OuterBox from './component/OuterBox.js';
import EditButton from './component/EditButton.js';
import MapSearch from './component/MapSearchBar.js';

function App() {

  const [testArray, setTestArray] = useState([]);
  const [testName, setTestName] = useState([]);
  const [ShowButton, setShowButton] = useState(true);

  const addData = () => {
    var resultObj = {};
    
    testArray.map((item,index) => (
      resultObj[testName[index]] = testArray[index]
    ));

    axios.post('http://localhost:3002/api', resultObj)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setShowButton(true);
  }

  return (
    <div>
      <div className="listMain">
        
        <EditButton showButton = {ShowButton} setShowButton = {setShowButton} addData = {addData}/>
        <div className="mainContext">
          <OuterBox show = {ShowButton} setTestArray = {setTestArray} setTestName = {setTestName}/>
        </div>
        
      </div>
      <div>
        <MapSearch/>
      </div>
    </div>   
  );
}
export default App;