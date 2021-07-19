//JS, function
import React, { useState} from 'react';
import axios from "axios";
import InnerBox from './InnerBox.js';

//CSS
import './App.css';
import { Modal } from 'antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {

  const [testArray, setTestArray] = useState([]);
  const [testName, setTestName] = useState([]);
  const [show, setShow] = useState(false);
  const [ShowButton, setShowButton] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowButton = () => setShowButton(true);
  const handleClose2 = () => setShowButton(false);

 

  const addData = (e) => {
    e.preventDefault();
    var resultObj = {};
    
    testArray.map((item,index) => (
      resultObj[testName[index]] = testArray[index]
    ));

    axios.post('./api', resultObj)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    window.location.reload();
  }

  const memo = () =>{
    console.log("memo button")
  }

  return (
    <div className="main">
      <span className="memoButtons"> {/* Memo Button */}
        <Button onClick={memo} variant="outline-secondary" className ="memoButton">메모</Button>
      </span>
      <div className="editButton"> 
        <ButtonGroup> {/* Main Button */}
          {ShowButton && <Button type="primary" onClick={handleClose2} variant="primary">수정</Button>}
          {!ShowButton && <Button onClick={handleShowButton} variant="outline-secondary">취소</Button>}
          {!ShowButton && <Button type = "primary" onClick={handleShow} variant="primary">저장</Button>}
        </ButtonGroup>
        <Modal title="Save" visible={show} onOk={addData} onCancel={handleClose}>
          <p>저장 하시겠습니까?</p>
        </Modal>
      </div>

      <div className="mainContext">
        <InnerBox show = {ShowButton} setTestArray = {setTestArray} setTestName = {setTestName}/>
      </div>
    </div>    
  );
}
export default App;