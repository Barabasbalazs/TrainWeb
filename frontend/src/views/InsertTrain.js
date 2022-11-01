import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal, ModalBody, ModalFooter, ModalTitle, ModalHeader } from 'react-bootstrap';
import validation from '../services/insert-train-validation';
import '../styles/views/Forms.css'
import routes from '../router/index';

const { insertTrainRoute } = routes;

const InsertTrain = () => {

    const [state, setState] = useState({
        from: '',
        to: '',
        weekday: 'Mon',
        hour: '00:00',
        ticketprice: 0,
        traintype: 'Regional'
    })

    const [modal, setModal] = useState({
        show: false,
        title: '',
        text: '',
    })

    const [invalidmodal, setInvalid] = useState({
        show: false
    })

    let navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('type') !== 'admin') {
            setInvalid({
                show: true
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClose = () => {
        setModal({
            show: false,
            title: '',
            text: '',
        })
    }

    const routeChange = () => {
        navigate('/');
    }

    const changeFrom = (e) => {
        setState((prevState) => {
            return {
                from: e.target.value,
                to: prevState.to,
                weekday: prevState.weekday,
                hour: prevState.hour,
                ticketprice: prevState.ticketprice,
                traintype: prevState.traintype
            }
        })
    }

    const changeTo = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: e.target.value,
                weekday: prevState.weekday,
                hour: prevState.hour,
                ticketprice: prevState.ticketprice,
                traintype: prevState.traintype
            }
        })
    }

    const changeDay = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                weekday: e.target.value,
                hour: prevState.hour,
                ticketprice: prevState.ticketprice,
                traintype: prevState.traintype
            }
        })
    }

    const changeHour = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                weekday: prevState.weekday,
                hour: e.target.value,
                ticketprice: prevState.ticketprice,
                traintype: prevState.traintype
            }
        })
    }

    const changePrice = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                weekday: prevState.weekday,
                hour: prevState.hour,
                ticketprice: e.target.value,
                traintype: prevState.traintype
            }
        })
    }

    const changeType = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                weekday: prevState.weekday,
                hour: prevState.hour,
                ticketprice: prevState.ticketprice,
                traintype: e.target.value
            }
        })
    }

    const insertTrain = async () => {
        const resVal = await validation(state);
        if (resVal === 'From') {
            setModal({
                show: true,
                title: 'Incorrect form',
                text: 'From input was not correct'
            })
        } else if (resVal === 'To') {
            setModal({
                show: true,
                title: 'Incorrect form',
                text: 'To input was not correct'
            })
        } else if (resVal === 'Ticketprice') {
            setModal({
                show: true,
                title: 'Incorrect form',
                text: 'TicketPrice input was not correct'
            })
        } else if (resVal === 'Ok') {
            postTrain();
        }
    }

    const postTrain = () => {
        fetch(insertTrainRoute, {
                method: 'POST',
                headers: { Accept: 'application/json','Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(state),
            })
            .then((resp) => resp.json())
            .then((json) => {
                if (json.error === true) {
                    setModal({
                        show: true,
                        title: 'Error',
                        text: 'Couldnt insert train'
                    }) 
                } else if (json.error === false) {
                    setModal({
                        show: true,
                        title: 'Succes',
                        text: 'Succesfully inserted train'
                    })
                }
            })
            .catch(() => {
                setModal({
                    show: true,
                    title: 'Error',
                    text: 'Couldnt insert train'
                })
            })
    }

    return (
        <div className='bg-warning wrapper d-row'>
            <div className="row">
            <div className="col"></div>
            <div className='col-4 form'>
            <h1>Insert a train</h1>
            <Form>
                <Form.Group controlId='From'>
                    <Form.Label>From:</Form.Label>    
                    <Form.Control
                        type="text"
                        placeholder="Departing Station"
                        onChange={changeFrom}
                    >   
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='To'>
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Arriving Station'
                        onChange={changeTo}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='day'>
                    <Form.Label>Day of the Week:</Form.Label>
                    <Form.Select value={state.day} onChange={changeDay}>
                        <option value='Mon'>Mon</option>
                        <option value='Tue'>Tue</option>
                        <option value='Wed'>Wed</option>
                        <option value='Thu'>Thu</option>
                        <option value='Fri'>Fri</option>
                        <option value='Sat'>Sat</option>
                        <option value='Sun'>Sun</option>
                    </Form.Select>
                </Form.Group>    
                <Form.Group controlId='hour'>
                    <Form.Label>Hour</Form.Label>
                    <Form.Control
                        type='time'
                        onChange={changeHour}
                        value={state.hour}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ticketprice</Form.Label>
                    <Form.Control
                        type='number'
                        onChange={changePrice}
                        min="0"
                        step="0.1"
                        value={state.ticketprice}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='traintype'>
                    <Form.Label>Type of Train</Form.Label>
                    <Form.Select  value={state.traintype} onChange={changeType}>
                        <option value='Regional'>Regional</option>
                        <option value='Interregional'>Interregional</option>
                        <option value='International'>International</option>
                    </Form.Select>
                </Form.Group>
                <br></br>    
                <Button onClick={insertTrain}>Submit</Button>
            </Form>
            </div>
            <div className="col"></div>
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
                <Button onClick={routeChange}>
                    Go back to the Main Page
                </Button>
                </ModalFooter>
            </Modal>
            </div>
            <div>
            <Modal show={invalidmodal.show} centered>
                <ModalHeader>
                    <ModalTitle>Warning</ModalTitle>
                </ModalHeader>
                <ModalBody>You are not logged in as an Admin</ModalBody>
                <ModalFooter>
                    <Button onClick={routeChange}>
                        Go back to Main Page
                    </Button>
                </ModalFooter>
            </Modal>
            </div>
        </div>
        </div>
    )
}

export default InsertTrain;