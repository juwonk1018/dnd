import React, {useState} from 'react';

//CSS
import { Modal } from 'antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function EditButton(parameter) {
    const [show, setShow] = useState(false);
    const [ShowButton, setShowButton] = useState(parameter.showButton);
    const handleShow = () => {
        setShow(true);
    }
    
    const handleClose = () => {
        setShow(false);
    }

    const handleOK = () => {
        setShow(false);
        setShowButton(true);
        parameter.setShowButton(true);
        parameter.addData();
    }
    
    const handleShowButton = () => {
        setShowButton(true);
        parameter.setShowButton(true);
    }
    const handleHideButton = () => {
        setShowButton(false);
        parameter.setShowButton(false);
    }
    const memo = () =>{
        console.log("memo button")
    }

    return(
        <div className = "buttonMain">
            <span className="memoButtons"> {/* Memo Button */}
                    <Button onClick={memo} variant="outline-secondary" className ="memoButton">메모</Button>
            </span>

            <div className="editButton"> 
            <ButtonGroup> {/* Main Button */}
                
                {ShowButton ?
                <Button type="primary" onClick={handleHideButton} variant="primary">수정</Button> :
                <span>
                <Button onClick={handleShowButton} variant="outline-secondary">취소</Button>
                <Button type = "primary" onClick={handleShow} variant="primary">저장</Button>
                </span>}
            </ButtonGroup>
            <Modal title="Save" visible={show} onOk={handleOK} onCancel={handleClose}>
                <p>저장 하시겠습니까?</p>
            </Modal>
            </div>
        </div>
    );
}

export default EditButton;