import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

//CSS
import {List, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { AiOutlineMinus } from 'react-icons/ai';
import { FiAlignJustify } from 'react-icons/fi';
import { BsPersonFill} from 'react-icons/bs';
import 'antd/dist/antd.css';

function InnerBox(parameter) {

    const getItemStyle = (isDragging, draggableStyle) => ({
      ...draggableStyle,
      ...(isDragging && {
        background: "rgb(225,235,255)"
      })
    });

    return(
        
        <Draggable key={"0"+parameter.index} draggableId={"0"+parameter.index} index={parameter.index}>
        {(provided, snapshot) => (
            <div>
            <div className = "listBox" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div>
                    <ul className = "listHeader">
                        {!parameter.ShowButton &&<FiAlignJustify viewBox = "0 0 24 20"/>}
                        <span className = "headerFront">{parameter.index===0?"S":(parameter.index===parameter.testArray.length-1?"E":parameter.index)}</span>
                        <span className="headerBack">{parameter.testName[parameter.index]}</span>
                    </ul>
                <span className = "peopleNumber"><BsPersonFill/><span style = {{ "color" : (parameter.testNum[parameter.index]>6) ? "red" : "black"}}>{parameter.testNum[parameter.index]}명</span>/6명</span>
            
                <Droppable key = "1" droppableId={parameter.testName[parameter.index]} isDropDisabled={parameter.ShowButton} type = "innerDropBox">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                    <List>
                        {parameter.testArray[parameter.index].map((item, idx) => (
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
                            {!parameter.ShowButton && <FiAlignJustify/>}
                            <ListItemText className = "upperText" secondary={item.text}/>
                            <ListItemText
                                className = "status" id = "secondary"
                                secondaryTypographyProps={ item.status === "승차"? {style :{"color" : "green"}} : {style :{"color" : "purple"}}}
                                secondary={item.status}
                            />
                            {!parameter.ShowButton && <span><AiOutlineMinus/></span>}
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
                    
        
        
    );

}

export default InnerBox;