import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import axios from "axios";

//Component
import InnerBox from './InnerBox';

//CSS
import 'antd/dist/antd.css';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';


function OuterBox(parameter) {
  const [testArray, setTestArray] = useState([]);
  const [testName, setTestName] = useState([]);
  const [testNum, setTestNum] = useState([]);
  var ShowButton = parameter.show;

  var currentCustomer = []; // for testNum
  var currentNum = []; // for testNum
  var resData;

  const callApi = async() =>{ // Get a JSON Data and save the datas in arrays. 
    const response = await axios.get("http://localhost:3002/api");
    resData = JSON.parse(response.data);
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
        ((currentCustomer.indexOf(item.text)>=0)&& (currentCustomer = currentCustomer.filter((thi)=> thi !== item.text)))
      )),
      currentNum.push(currentCustomer.length)
    ));
    setTestNum(currentNum);
    setTestName(tempName);
    setTestArray(tempArray);
    //Pass parameters to the parent component.
    parameter.setTestArray(testArray); 
    parameter.setTestName(tempName); 
    
  }

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
      <DragDropContext onDragEnd={(param) => { // If drag & drop has occured, the data is handled by below function
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
        ((currentCustomer.indexOf(item.text)>=0) && (currentCustomer = currentCustomer.filter((thi)=> thi !== item.text)))
        )),
        currentNum.push(currentCustomer.length)
        ))      

        setTestNum(currentNum);
        //Pass parameters to the parent component.
        parameter.setTestArray(testArray);
        parameter.setTestName(testName);
      }}>
      <Droppable droppableId="droppable" isDropDisabled={ShowButton} type="outerDropBox">
        {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {testArray && testArray.map((item,index) =>{
                return(
                  <InnerBox ShowButton = {ShowButton} index = {index} testArray = {testArray} testName = {testName} testNum = {testNum}/> 
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
export default OuterBox;
