import {Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,Button} from "react-bootstrap";
import { useState } from 'react';
import {Link} from 'react-router-dom';
import DeleteTrainButton from "./DeleteTrainButton";
import './../../styles/components/LineData.css';
import routes from "../../router/index";

const { makeReservationRoute } = routes;

const LineData = (props) => {
    const [err,setErr] = useState({
        show: false,
        incorrectfield: '',
    });

    const reqObj = {
        userid: props.userid,
        trainId: props.trainId,
    }

    const [succes,setSucces] = useState();

    const [unsucces,setUnsucces] = useState();

    const makeReservation = async () => {
        try {
            const response = await fetch(makeReservationRoute, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include', //include
                body: JSON.stringify(reqObj)
            });
            if (!response.ok) {
                const errorMsg = await response.text();
                console.error(errorMsg);
                return setErr({
                    show: true,
                    incorrectfield: 'Error while loading data',
                });
            }
            const json = await response.json();
            if (json.message === 'Succ') {
                setSucces(json.message);
            } else if (json.message === 'Unsuccesfull') {
                setUnsucces(json.message);
            }
        } catch (e) {
            console.error(e);
            setErr({
                show: true,
                incorrectfield: 'Error while loading data',
            });
        }
    }

    const handleClose = () => {
        setErr({
          show: false,
          incorrectfield: ''
        })
      }

    if (localStorage.getItem('id') === null) {
        return (
            
            <div className="row">    
            <div className="col-sm side"></div>
            <div className="border border-success train col-sm">
                        <p>Id: {props.trainId}</p>
                        <p>From: {props.from}</p>
                        <p>To: {props.to}</p>
                        <p>Weekday: {props.weekday}</p>
                        <p>Hour: {props.hour}</p>
                        <p>Price: {props.ticketprice}</p>
                        <Link to='/specifictrain'
                            className="text-center align-top mb-1"
                            state={{trainId: props.trainId,
                                    from: props.from,
                                    to: props.to,
                                    weekday: props.weekday,
                                    hour: props.hour,
                                    ticketprice: props.ticketprice,
                                    traintype: props.traintype
                            }}>Details</Link>
                        <Modal show={err.show} onHide={handleClose} centered>
                            <ModalHeader closeButton>
                                <ModalTitle>Error</ModalTitle>
                            </ModalHeader>
                            <ModalBody>{err.incorrectfield}</ModalBody>
                            <ModalFooter>
                                <Button variant="primary" onClick={handleClose}>
                                    OK
                                </Button>
                            </ModalFooter>
                        </Modal>    
            </div>
            <div className="col-sm side"></div>
            </div>
        )
    } else {
        return (
            <div className="row">    
            <div className="col-sm side"></div>    
            <div className="border border-success train col-sm">
                        <p>Id: {props.trainId}</p>
                        <p>From: {props.from}</p>
                        <p>To: {props.to}</p>
                        <p>Weekday: {props.weekday}</p>
                        <p>Hour: {props.hour}</p>
                        <p>Price: {props.ticketprice}</p>
                        <Button className="mt-1 mb-1" onClick={makeReservation}>Make a reservation</Button>
                        {succes && <p>Succesfull reservation</p>}
                        {unsucces && <p>Unsuccesfull reservation</p>}
                        <Modal show={err.show} onHide={handleClose} centered>
                            <ModalHeader closeButton>
                                <ModalTitle>Error</ModalTitle>
                            </ModalHeader>
                            <ModalBody>{err.incorrectfield}</ModalBody>
                            <ModalFooter>
                                <Button variant="primary" onClick={handleClose}>
                                    OK
                                </Button>
                            </ModalFooter>
                        </Modal>    
                        <DeleteTrainButton
                            className="mt-1 mb-1"
                            type={props.usertype}
                            callback={props.callback}
                            trainid={props.trainId}
                        />
                        <Link to='/specifictrain' 
                            className="text-center align-top mb-1"
                            state={{trainId: props.trainId,
                                    from: props.from,
                                    to: props.to,
                                    weekday: props.weekday,
                                    hour: props.hour,
                                    ticketprice: props.ticketprice,
                                    traintype: props.traintype
                            }}>Details</Link>    
            </div>
            <div className="col-sm side"></div>
            </div>
        )
    }
}         

export default LineData;