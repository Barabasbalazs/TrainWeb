import { useState } from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const TopLogout = (props) => {

    let navigate = useNavigate();

    const [state] = useState({
        user: props.user
    });

    const handleClick = () => {
        props.logOut();
    }

    const routeChange = () => {
        navigate('/inserttrain');
    }

    if (props.type === 'admin') {
        return (
            <Navbar bg="primary" variant="dark" sticky="top" className="navbar-right">
                <Container>
                <Form className="d-flex flex-row pull-right">
                        <Navbar.Brand>{state.user}</Navbar.Brand>
                        <Button onClick={handleClick}>Logout</Button>
                        <Button onClick={routeChange}>Insert a new Train</Button>
                </Form>        
                </Container>
            </Navbar>
        )
    } else {
        return (
            <Navbar bg="primary" variant="dark" sticky="top" className="navbar-right">
                <Container>
                    <Form className="d-flex flex-row">
                        <Navbar.Brand>{state.user}</Navbar.Brand>
                        <Button onClick={handleClick}>Logout</Button>
                    </Form>
                </Container>
            </Navbar>
        )
    }
}

export default TopLogout;