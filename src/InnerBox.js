//JS, function
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

//CSS
import './App.css';
import './InnerBox.css';
import {List, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { AiOutlineMinus } from 'react-icons/ai';
import { FiAlignJustify } from 'react-icons/fi';
import { BsPersonFill} from 'react-icons/bs';
import 'antd/dist/antd.css';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';


function InnerBox(parameter) {
  const [testArray, setTestArray] = useState([]);
  const [testName, setTestName] = useState([]);
  const [testNum, setTestNum] = useState([]);
  var ShowButton = parameter.show;
  var currentCustomer = [];
  var currentNum = [];
  var resData;

  const callApi = async() =>{ // Get a JSON Data and save the datas in arrays. 
    const response = await axios.get("http://localhost:3002/api");
    resData = response.data;
    resData = JSON.parse(resData);
    var tempName = [];
    var tempArray = [];
    for (const [key] of Object.entries(resData)){
      tempName.push(key);
      tempArray.push(resData[key]);
    }

    tempArray.map((item,index) =>(
      tempArray[index].map((item, idx) => (
        item.status === "승차" ?
        currentCustomer = currentCustomer.concat(item.text):
        (currentCustomer.indexOf(item.text)>=0? currentCustomer = currentCustomer.filter((thi)=> thi !== item.text):"")
      )),
      currentNum.push(currentCustomer.length)
    ));
    setTestNum(currentNum);
    setTestName(tempName);
    setTestArray(tempArray);
    parameter.setTestArray(testArray); 
    parameter.setTestName(tempName); 
    
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(225,235,255)"
    })
  });

  useEffect(() => {
    callApi();
  },[ShowButton]);

  const useStyles = makeStyles({
    '@global': {
      '.MuiListItem-root':{
        padding : '8px 16px 8px 8px',
        paddingLeft : ShowButton ? 5 : 8,
        marginLeft : ShowButton ? 25 : 45,
        backgroundColor: ShowButton ? "#ffffff":"#fcfcfc",
      },
      '.mainContext':{
        border: "1px solid gray",
        backgroundColor: ShowButton ? "#ffffff" :"#f7f7f7",
      }
    },
  });
  useStyles();
  
  return (
    <StylesProvider injectFirst>
      <DragDropContext onDragEnd={(param) => {
          if(param.type === "innerDropBox"){
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
              
              
          }
          if(param.type === "outerDropBox"){
              const src = param.source;
              const dest = param.destination;
              
              if (!dest) {
              return;
              }
              const idx = src.index;
              const destIdx = dest.index;
              testName.splice(destIdx,0,testName.splice(idx,1)[0]);
              testArray.splice(destIdx,0,testArray.splice(idx,1)[0]);
          }

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
          parameter.setTestArray(testArray);
          parameter.setTestName(testName); 
      }}>
        <Droppable droppableId="droppable" isDropDisabled={ShowButton} type="outerDropBox">
          {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {testArray.map((item,index) =>{
                  return(
                    <Draggable key={"0"+index} draggableId={"0"+index} index={index}>
                      {(provided, snapshot) => (
                        <div>
                          <div className = "listBox" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div>
                              <ul className = "listHeader">
                                {!ShowButton &&<FiAlignJustify/>}
                                <span className = "headerFront">{index===0?"S":(index===testArray.length-1?"E":index)}</span>
                                <span className="headerBack">{testName[index]}</span>
                              </ul>
                              <span className = "peopleNumber"><BsPersonFill/><span style = {{"color" : (testNum[index]>6) ? "red" : "black"}}>{testNum[index]}명</span>/6명</span>
                          
                              <Droppable droppableId={testName[index]} isDropDisabled={ShowButton} type = "innerDropBox">
                              {(provided, snapshot) => (
                                <RootRef rootRef={provided.innerRef}>
                                  <List>
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
                                        )}>
                                          {!ShowButton && <FiAlignJustify/>}
                                          <ListItemText className = "upperText" secondary={item.text}/>
                                          <ListItemText
                                            className = "status" id = "secondary"
                                            secondaryTypographyProps={ item.status === "승차"? {style :{"color" : "green"}} : {style :{"color" : "purple"}}}
                                            secondary={item.status}
                                          />
                                          {!ShowButton && <span><AiOutlineMinus/></span>}
                                          <ListItemSecondaryAction></ListItemSecondaryAction>
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
                          </div>
                        {provided.placeholder}
                        </div>
                    )}
                    </Draggable>  
                  )}
                )}
                {provided.placeholder}
              </div>
          )}
        </Droppable>
      </DragDropContext>
    </StylesProvider>
  );
}
export default InnerBox;
