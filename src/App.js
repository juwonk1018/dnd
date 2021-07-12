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

function LoginButton() {
  return (
    <button>
        로그인
    </button>
  );
}
function LogoutButton() {
  return (
      <button>
          로그아웃
      </button>
);
}
function UserButton(props) {
  if(props.isLoggedIn) {
      return <LogoutButton/>;
  }
  return <LoginButton/>;
}

function App() {
  const [name, setName] = useState([]);
  const [name2, setName2] = useState([]);
  const [show, setShow] = useState(false);
  const [ShowButton, setShowButton] = useState(true);
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowButton = () => setShowButton(true);
  const handleClose2 = () => setShowButton(false);
  
  var resData;
  const callApi = async() =>{
    const response = await axios.get("http://localhost:3002/api");
    resData = response.data;
    resData = JSON.parse(resData);
    var stat = [];
    var stat2 = [];
    setName([]);
    setName2([]);

    var numb1 = 0;
    var numb2 = 0;
    resData.map((item,index) => {
      if(item.bus === "yellow"){
        stat = stat.concat(item);
        numb1 = numb1 + 1;
      }
      else{
        stat2 = stat2.concat(item);
        numb2 = numb2 + 1;
      }
      
    });
   
    setName(stat);
    setName2(stat2);
    setNum1(stat.length);
    setNum2(stat2.length);
    
  }

  const addData = (e) => {
    setShowButton(true);
    setShow(false);

    e.preventDefault();

    axios.post('./api', name.concat(name2))
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

  const onRemove1 = (id) => {
    var stat = name.filter(name => name.id !== id);
     setName(stat);
     setNum1(stat.length);

  }
  const onRemove2 = (id) => {
    var stat = name2.filter(name => name.id !== id);
     setName2(stat);
     setNum2(stat.length);

  }


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
        padding : '8px 16px 8px 8px',
        paddingLeft : ShowButton ? 5 : 8,
        marginLeft : ShowButton ? 25 : 45,
        backgroundColor: ShowButton ? "#ffffff":"#f0f4f7",
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
        if(src.droppableId === dest.droppableId){          
          if(dest.droppableId === "droppable"){
            name.splice(dest.index,0,name.splice(src.index,1)[0]);
            
          }
          else{
            name2.splice(dest.index,0,name2.splice(src.index,1)[0]);
          }
        }
        else{
          var removed;
          
          if(src.droppableId === "droppable"){
            removed = name.splice(src.index,1);
            removed[0].bus = "red";
            name2.splice(dest.index,0,removed[0]);
            //console.log(name2);
          }
          else{
            removed = name2.splice(src.index,1);
            removed[0].bus = "yellow";
            name.splice(dest.index,0,removed[0]);
            //console.log(name);
          }
          setNum1(name.length);
          setNum2(name2.length);
        };
      }}
      >
      
      <ul style = {{"fontSize":"10px","border":"1px solid #cacaca", "margin" : "10px 0px 0px 0px", "padding":"5px 0px 5px 5px","borderRadius" : 3,"width" : "300px", "backgroundColor" : "#f1f5fa"}}>
      {!ShowButton &&<FiAlignJustify/> }<span style = {{"fontSize": "14px", "padding": "0px 9px 0px 10px"}}>S</span> <span style ={{"width":150}}>Yellow</span>
      </ul>
      <div style = {{"textAlign":"right"}}>
      
      <span style = {{"margin":"16px 15px 0px 0px","borderRadius":3,"float":"right","paddingRight":"0px","fontSize":"10px"}}><BsPersonFill style = {{"height":"0.8em"}}/><span style = {{"color" : (num1>6) ? "red" : "black"}}>{num1}명</span>/6명</span>
      
      <Droppable droppableId="droppable" isDropDisabled={ShowButton}>
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {name.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      {!ShowButton && <span onClick={() => onRemove1(item.id)}><AiOutlineMinus
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
      <ul style = {{"fontSize":"10px","border":"1px solid #cacaca", "margin" : "0px 0px 0px 0px", "marginTop": num1===0 ? 30:0,"padding":"5px 0px 5px 5px","borderRadius" : 3,"width" : "300px", "backgroundColor" : "#f1f5fa"}}>
      {!ShowButton &&<FiAlignJustify/> }<span style = {{"fontSize": "14px", "padding": "0px 9px 0px 10px"}}>1</span> <span style ={{"marginLeft":0}}>Red</span>
      </ul>
      <span style = {{"margin":"16px 15px 0px 0px","borderRadius":3,"paddingRight":"0px","fontSize":"10px","float" : "right"}}><BsPersonFill style = {{"height":"0.8em"}}/><span style = {{"color" : (num2>6) ? "red" : "black"}}>{num2}명</span>/6명</span>
      
      
      <Droppable droppableId="droppable2" isDropDisabled={ShowButton}>
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {name2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled="true">
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
                      {!ShowButton && <span onClick={() => onRemove2(item.id)}><AiOutlineMinus
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
    </DragDropContext>

    <div style ={{"marginTop": num2===0 ? 30:0}}></div> {/*if num2 == 0, add space to end of the block */}
    </div>  
  </div>    
  );
}
export default App;
