import React, {Fragment, useContext, useState} from 'react';
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import ModifyContext from "./Context/ModifyContext";
import axios from "axios";
import AddExtraContext from "./Context/AddExtra";
import {toast} from "react-toastify";

function ModifyModal(props) {
    const {handleLoadAgain} = useContext(AddExtraContext);
    const {openModify,handleModify,user,load,Reload} = useContext(ModifyContext);
    const id = user.id;
    const messId = localStorage.getItem("messId");
    const [updateUser,setUpdateUser] = useState({
        name:"",
        email:"",
        phone:"",
        addTk:0.0,
        totalMeal:0.0,
    });

    const handleSet = (e)=>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUpdateUser({...updateUser,[name]:value});
    }
    const saveUpdate = async (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/oneMember/${messId}/${id}`,updateUser).then((res)=>{
            handleLoadAgain();
            handleModify();
            Reload(!load);
        }).catch((err)=>{
            console.log(err);
            toast.error("Update update failure");
        })

    }

    const handleDelete = ()=>{
        axios.delete(`http://localhost:8080/oneMember/${id}`).then((res)=>{
            if(res.data){
                handleLoadAgain();
                handleModify();
                Reload(!load);
            }
        })
    }

    return (
        <Fragment>
            <Container className="modal">
                <Row>
                    <Modal show={openModify}>
                        <Modal.Header>Modify Member Information</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Member name</Form.Label>
                                    <Form.Control name="name" onChange={handleSet}  type="text" placeholder={user.name}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Member email</Form.Label>
                                    <Form.Control name="email" onChange={handleSet} type="email" placeholder={user.email}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Member Phone</Form.Label>
                                    <Form.Control name="phone" type="tel" onChange={handleSet} placeholder={user.phone}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Add TK</Form.Label>
                                    <Form.Control name="addTk" onChange={handleSet} type="text" placeholder={user.addTk}/>
                                </Form.Group>
                               <Form.Group className="mb-3">
                                    <Form.Label>Total Meal</Form.Label>
                                    <Form.Control name="totalMeal" onChange={handleSet} type="text" placeholder={user.totalMeal}/>
                                </Form.Group>
                                <Button className="btnHover" variant="primary" type="submit" onClick={saveUpdate} >Submit</Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn-danger btnHover" onClick={handleModify}>Close</Button>
                            <Button className="btn-danger btnHover" onClick={handleDelete}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ModifyModal;