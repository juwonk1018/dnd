import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import {List, ListItem, ListItemText, ListItemIcon, IconButton, ListItemSecondaryAction} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import axios from "axios";





function App() {
  
  const initialValue = [
    { id: 0, text: "Select a State" }];
  const [name, setName] = useState(initialValue);
  const [show, setShow] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowButton = () => setShowButton(true);
  const handleClose2 = () => setShowButton(false);
  const modalSave = () => {setShowButton(true); setShow(false);}

  const newArrayData = name.map((item, index) => {
    return (
      <li key={index}>
        {item.id}({item.text})
      </li>
    );
  });
  

  var resData;
  const callApi = async() =>{
    const response = await axios.get("http://localhost:3002/api");
    resData = response.data;
    resData = JSON.parse(resData);
    setName(resData.red);
  };

  const addData = (e) => {
    e.preventDefault();

    axios.post('./api', name)
    //성공시 then 실행
    .then(function (response) {
      console.log(response);
    })
    //실패 시 catch 실행
    .catch(function (error) {
      console.log(error);
    });
    console.log(name);


}


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
    console.log('Data Changed');
    callApi();
    
  },[ShowButton]);
  
  return (
    
    
    <div>
      <div id="editButton"> 
        <ButtonGroup size = "sm" aria-label="edit">
          {ShowButton && <Button onClick={handleClose2} variant="primary">수정</Button>}
          {!ShowButton && <Button onClick={handleShow} type="submit" variant="primary">저장</Button>}
          {!ShowButton && <Button onClick={handleShowButton} variant="outline-secondary">취소</Button>}
        </ButtonGroup>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>저장</Modal.Title>
          </Modal.Header>
          <Modal.Body>저장을 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button type = "submit" variant="primary" onClick={modalSave, addData}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div id="App2"></div>

      <DragDropContext onDragEnd={(param) => {
        const src = param.source.index;
        const dest = param.destination.index;
        name.splice(dest,0,name.splice(src,1)[0]);
        
      }}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {name.map((item, index) => (
                  item.bus === "yellow" && (
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

                        <ListItemText
                          secondary={item.text}
                        />
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>)
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>

      
      

    </div>
    
    
  );
}
export default App;
