import { Navbar, Container, Button, FormControl, Form, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import routes from "../../router/index";

const { loginRoute } = routes;

const TopLogin = (props) => {

    let navigate = useNavigate();

    const [state,setState] = useState({
        username: '',
        password: '',
        show: false,
        incorrectfield: '',
    });

    const sendAuth = async () => {
        fetch(`${loginRoute}/?name=${state.username}&pw=${state.password}`, {    
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.error === 'user'){
                setState((prevState) => {
                    return {
                        username: prevState.username,
                        password: prevState.password,
                        show: true,
                        incorrectfield: 'username',
                    }
                })
            } else if (json.error === 'password') {
                setState((prevState) => {
                    return {
                        username: prevState.username,
                        password: prevState.password,
                        show: true,
                        incorrectfield: 'password',
                    }
                })    
            } else if (json.error === 'other') {
                setState((prevState) => {
                    return {
                        username: prevState.username,
                        password: prevState.password,
                        show: true,
                        incorrectfield: 'username',
                    }
                })
            } else {
                localStorage.setItem('username',state.username);
                localStorage.setItem('jwt',json.token);
                localStorage.setItem('type',json.type);
                localStorage.setItem('id',json.id);
                // setCookie('token', json.token, { path: '/'});
                //props.logIn(json.token);
                props.authCallback();
            }
          })
          .catch(() => {
            setState((prevState) => {
                return {
                    username: prevState.username,
                    password: prevState.password,
                    show: true,
                    incorrectfield: 'connection with db',
                }
            })
          });
    }

    const handleClick = async () => {
        if (state.username === '') {
            setState((prevState) => {
                return {
                    username: prevState.username,
                    password: prevState.password,
                    show: true,
                    incorrectfield: 'username',
                }
            })
        } else if (state.password === '') {
            setState((prevState) => {
                return {
                    username: prevState.username,
                    password: prevState.password,
                    show: true,
                    incorrectfield: 'password',
                }
            })
        } else {
            sendAuth();
        }   
    };

    const changeUser = (e) => {
        setState((prevState) => {
            return {
                username: e.target.value,
                password: prevState.password,
                show: false,
                incorrectfield:''
            }
        })
    }

    const changePW = (e) => {
        setState((prevState) => {
            return {
                username: prevState.username,
                password: e.target.value,
                show: false,
                incorrectfield:''
            }
        })
    }

    const handleClose = () => {
        setState((prevState) => {
            return {
                username: prevState.username,
                password: prevState.password,
                show: false,
                incorrectfield:''
            }
        })
    }

    const routeChange = () => {
        navigate('/register');
    }

    return(
        <Navbar bg="primary" variant="dark" sticky="top" className="navbar-left">
            <Container>
                <Form className="d-flex flex-row">
                    <FormControl
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        onChange={changeUser}
                    >    
                    </FormControl>
                    <FormControl
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        onChange={changePW}
                    >    
                    </FormControl>
                    <Button onClick={handleClick}>Login</Button>   
                    <Button onClick={routeChange}>Register</Button>
                    <Modal show={state.show} onHide={handleClose} centered>
                        <ModalHeader closeButton>
                            <ModalTitle>Unsuccesfull login</ModalTitle>
                        </ModalHeader>
                        <ModalBody>Incorrect {state.incorrectfield}</ModalBody>
                        <ModalFooter>
                            <Button variant="primary" onClick={handleClose}>
                                OK
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Form>
            </Container>
        </Navbar>
    )
}

export default TopLogin;