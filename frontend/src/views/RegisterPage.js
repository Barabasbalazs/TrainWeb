import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,Form, Button} from 'react-bootstrap';
import '../styles/views/Forms.css';

const RegisterPage = () => {

    const [state,setState] = useState({
        username: '',
        pw: '',
        pwre: '',
        type: 'user',
    })

    const [modal,setModal] = useState({
        show: false,
        text: '',
        title: ''
    })

    const [modalsucc,setModalSucc] = useState({
        show: false
    })

    let navigate = useNavigate(); 

    const changeUsername = (e) => {
        setState((prevState) => {
            return {
                username: e.target.value,
                pw: prevState.pw,
                pwre: prevState.pwre,
                type: prevState.type
            }
        })
    }

    const changePW = (e) => {
        setState((prevState) => {
            return {
                username: prevState.username,
                pw: e.target.value,
                pwre: prevState.pwre,
                type: prevState.type
            }
        })
    }

    const changePWRe = (e) => {
        setState((prevState) => {
            return {
                username: prevState.username,
                pw: prevState.pw,
                pwre: e.target.value,
                type: prevState.type
            }
        })
    }

    const changeType = (e) => {
        setState((prevState) => {
            return {
                username: prevState.username,
                pw: prevState.pw,
                pwre: prevState.pwre,
                type: e.target.value
            }
        })
    }

    const handleClose = () => {
        setModal({
            show: false,
            title: '',
            text: ''
        })
    }

    const handleCloseSucc = () => {
        setModalSucc({
            show: false
        })
    }

    const routeChange = () => {
        navigate('/');
    }

    const sendData = () => {
        const userData = {
            name: state.username,
            pw: state.pw,
            type: state.type
        };
        fetch(`http://localhost:8080/register`, {
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.error === true) {
                setModal({
                    show: true,
                    title: 'Unsuccesfull Registration',
                    text: 'Was not able to register'
                })
            } else if (json.isvalid === false) {
                setModal({
                    show: true,
                    title: 'Unsuccesfull Registration',
                    text: 'Username already taken'
                })
            } else if (json.isvalid === true) {
                setModalSucc({
                    show: true
                })
            }
        })
        .catch(() => {
            setModal({
                show: true,
                title: 'Unsuccesfull Registration',
                text: 'Was not able to register'
            })
        });
    }

    const handleClick = async () => {
        if (state.username === '') {
            setModal({
                show: true,
                title: 'Unsuccesfull Registration',
                text: 'No Username given'
            })
            return;
        } else if (state.pw === '') {
            setModal({
                show: true,
                title: 'Unsuccesfull Registration',
                text: 'No Password given'
            })
            return;
        } else if (state.pwre === '') {
            setModal({
                show: true,
                title: 'Unsuccesfull Registration',
                text: 'Password not validated'
            })
            return;
        } else if (state.pw !== state.pwre) {
            setModal({
                show: true,
                title: 'Unsuccesfull Registration',
                text: 'Password not validated'
            })
            return;
        }
        else {
            sendData();
        }
    }

    return (
    <div className='bg-warning wrapper d-row'>
        <div className="row">
        <div class='col'></div>    
        <Form className='form col-4'>
            <Form.Group controlId='username'>
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Username"
                    onChange={changeUsername}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='type'>
                <Form.Label>Priviliges:</Form.Label>
                <Form.Select onChange={changeType} value={state.type}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password"
                    onChange={changePW}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Reenter Password"
                    onChange={changePWRe}>
                </Form.Control>
            </Form.Group>
            <br></br>
            <Button onClick={handleClick} className="mb-6">Register</Button>
            <br></br>
            <br></br>
            <Button onClick={routeChange} className="mt-6">Go to Main Page</Button>
        </Form>
        <div class='col'></div>
        </div> 
        <div>
        <Modal show={modal.show} onHide={handleClose} centered>
            <ModalHeader closeButton>
                <ModalTitle>{modal.title}</ModalTitle>
            </ModalHeader>
            <ModalBody>{modal.text}</ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={handleClose}>
                  OK
                </Button>
            </ModalFooter>
        </Modal>
        </div>
        <div>
        <Modal show={modalsucc.show} onHide={handleCloseSucc} centered>
            <ModalHeader closeButton>
                <ModalTitle>Congratulations</ModalTitle>
            </ModalHeader>
            <ModalBody>Succesfully registered new user: {state.username}</ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={handleCloseSucc}>
                  OK
                </Button>
                <Button variant="primary" onClick={routeChange}>
                    Go to Main Page
                </Button>
            </ModalFooter>
        </Modal>   
        </div>
    </div>             
    )    
}

export default RegisterPage;