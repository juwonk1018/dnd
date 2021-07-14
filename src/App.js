import './App.css';
import React, { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Modal from 'react-bootstrap/Modal';
import {List, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import axios from "axios";
import { AiOutlineMinus } from 'react-icons/ai';
import { FiAlignJustify } from 'react-icons/fi';
import { BsPersonFill} from 'react-icons/bs';
import {  Modal } from 'antd';
import {  Button  } from 'antd';
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  // const [name, setName] = useState([]);
  // const [name2, setName2] = useState([]);
  const [testArray, setTestArray] = useState([]);
  const [testName, setTestName] = useState([]);
  const [testNum, setTestNum] = useState([]);
  const [show, setShow] = useState(false);
  const [ShowButton, setShowButton] = useState(true);
  // const [num1, setNum1] = useState();
  // const [num2, setNum2] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowButton = () => setShowButton(true);
  const handleClose2 = () => setShowButton(false);
  var currentCustomer = [];
  var currentNum = [];
  var resData;
  
  const callApi = async() =>{
    const response = await axios.get("http://localhost:3002/api");
    resData = response.data;
    resData = JSON.parse(resData);
    
    var setTest = [];
    var setArray = [];
    for (const [key] of Object.entries(resData)){ // Object 항목의 내용은 testArray, 이름은 testName에 push
      setTest.push(key);
      setArray.push(resData[key]);
      //setNumber.push(resData.[key].length);
    }
    setArray.map((item,index) =>(
      setArray[index].map((item, idx) => (
        item.status === "승차" ?
        currentCustomer = currentCustomer.concat(item.text):
        (currentCustomer.indexOf(item.text)>=0? currentCustomer = currentCustomer.filter((thi)=> thi !== item.text):"")
      )),
      currentNum.push(currentCustomer.length)
    ));
    setTestNum(currentNum);
    setTestName(setTest);
    setTestArray(setArray);
    
  }

  const addData = (e) => {
    setShowButton(true);
    setShow(false);
    e.preventDefault();

    var resultObj = {};
    testArray.map((item,index) => (
      resultObj[testName[index]] = testArray[index]
    ));

    axios.post('./api', resultObj)
    //성공시 then 실행
    .then(function (response) {
      console.log(response);
    })
    //실패 시 catch 실행
    .catch(function (error) {
      console.log(error);
    });
    window.location.reload();
  }
  // const onRemove = (index, idx) => {
  //   let text = testArray;
  //   var newArr = text[index].filter((thing) => thing.id !== text[index][idx].id);
  //   text[index] = newArr;
  //   setTestArray(text);

  //   console.log(testArray);
  // }

  const hello = () =>{
    console.log("hello")

  }
  const text = {
    purple: {
      color: "purple"
    },
    green: {
      color: "green"
    },
  };


  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
  });

  const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });

  useEffect(() => {
    callApi();
  },[ShowButton]);

  const useStyles = makeStyles({
    '@global': {
      '.MuiTypography-body2': {
        fontSize: '0.5rem',
        color: 'black',
      },
      '.ant-btn': {
        fontSize: '0.5rem',
        width : 40,
        height : 25,
        margin : '3px 1px',
        padding : '0 0',
      },
      '.MuiListItemText-root':{

        padding : '0px 0px 0px 0px',
        margin: '0px 0px 0px 0px',
      },
      '.MuiListItem-root':{
        transition : '0.25s linear',
        padding : '8px 16px 8px 8px',
        paddingLeft : ShowButton ? 5 : 8,
        marginLeft : ShowButton ? 25 : 45,
        backgroundColor: ShowButton ? "#ffffff":"#fcfcfc",
      },
      '.upperText':{
        width : 40,
        marginLeft : 4,
      },
      '.status':{
        width: 20,
      },
      '.mainContext':{
        border: "1px solid gray",
        backgroundColor: ShowButton ? "#ffffff" :"#f7f7f7",
      },
      '.title':{
        marginTop : 0,
      }

      
  
      
    },
  });
  useStyles();
  return (    
    <div className="main">
      <span className="editButtons">
      <Button onClick={hello} variant="outline-secondary" style = {{"marginLeft" : 10}}>메모</Button>
      </span>
      <div className="editButtons" id="editButton" style = {{float:"right"}}> 
        <ButtonGroup>
          {ShowButton && <Button type="primary" onClick={handleClose2} variant="primary">수정</Button>}
          {!ShowButton && <Button onClick={handleShowButton} variant="outline-secondary">취소</Button>}
          {!ShowButton && <Button type = "primary" onClick={handleShow} variant="primary">저장</Button>}
        </ButtonGroup>

        <Modal
          title="Save"
          visible={show}
          onOk={addData}
          onCancel={handleClose}
        >
          <p>저장 하시겠습니까?</p>
        </Modal>
      </div>
 
      <div className="mainContext">
        <DragDropContext onDragEnd={(param) => {
            
            const src = param.source;
            const dest = param.destination;
            
            if (!dest) {
              return;
            }
            const idx = testName.indexOf(src.droppableId);
            const destIdx = testName.indexOf(dest.droppableId);
            
            if(src.droppableId === dest.droppableId){
              testArray[idx].splice(dest.index,0,testArray[idx].splice(src.index,1)[0]);
            }

            else{
              var removed;
              removed = testArray[idx].splice(src.index,1);
              testArray[destIdx].splice(dest.index,0,removed[0]);
            };
            
            currentNum = [];

            testArray.map((item,index) =>(
            testArray[index].map((item, idx) => (
              item.status === "승차" ?
              currentCustomer = currentCustomer.concat(item.text):
              (currentCustomer.indexOf(item.text)>=0? currentCustomer = currentCustomer.filter((thi)=> thi !== item.text):"")
              )),
              currentNum.push(currentCustomer.length)
            ))      
            setTestNum(currentNum);
          
            
          }}
          >
          
          {testArray.map((item,index) =>{
            return(    
              
              <div>
              <ul style = {{"fontSize":"10px","border":"1px solid #cacaca", "margin" : "10px 0px 0px 0px", "marginTop": (index > 0 ? (testArray[index-1].length > 0 ? 10 : 30) : 10), "padding":"5px 0px 5px 5px","borderRadius" : 3,"width" : "300px", "backgroundColor" : "#f1f5fa"}}>
              {!ShowButton &&<FiAlignJustify stlye = {{transition : "0.25s linear"}}/> }<span style = {{"fontSize": "11px", "padding": "0px 9px 0px 10px", "marginTop":3,"fontWeight":"bold"}}>{index===0?"S":(index===testArray.length-1?"E":index)}</span> <span className="title" style ={{"fontSize": "11px","width":150}}>{testName[index]}</span>
              </ul>
              <span style = {{"margin":"16px 15px 0px 0px","borderRadius":3,"float":"right","paddingRight":"0px","fontSize":"10px"}}><BsPersonFill style = {{"height":"0.8em"}}/><span style = {{"color" : (testNum[index]>6) ? "red" : "black"}}>{testNum[index]}명</span>/6명</span>
              
              <Droppable droppableId={testName[index]} isDropDisabled={ShowButton}>
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List style={getListStyle(snapshot.isDraggingOver)}>
                    {testArray[index].map((item, idx) => (
                      <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided, snapshot) => (
                          
                          <ListItem
                            ContainerComponent="li"
                            ContainerProps={{ ref: provided.innerRef }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {!ShowButton && <FiAlignJustify/>}
                            <ListItemText
                              className = "upperText"
                              secondary={item.text}
                            />
                            <ListItemText
                              className = "status"
                              secondaryTypographyProps={item.status === "승차"? {style: text.green} : {style: text.purple}}
                              secondary={item.status}
                              
                            />
                            
                            
                            {!ShowButton && <span><AiOutlineMinus
                              style={{"width":10}}
                            /></span>}
                            <ListItemSecondaryAction>

                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                  </List>

                    
                </RootRef>
              )}
            </Droppable>
            </div>
            
          )})}
          
        </DragDropContext>                         
        <div style ={{"marginTop": true ? 30:0}}></div> {/*if num2 == 0, add space to end of the block */}</div>  
    </div>    
    
  );
}
export default App;
