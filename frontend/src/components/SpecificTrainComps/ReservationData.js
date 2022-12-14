import { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle,Button } from "react-bootstrap";
import routes from '../../router/index';

const { deleteReservationRoute } = routes;

const ReservationData = (props) => {
    const [state] = useState({
        trainId: props.trainId,
        userId: props.userId
    })

    const [err,setErr] = useState({ 
        show: false,
        incorrectfield: ''
    });

    const deleteRes = async () => {
        await fetch(deleteReservationRoute, {
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(state)
        })
        .then((res) => res.json())
        .then((json)=> {
            if (json.message === 'Unsuccesfull') {
                setErr({
                    show: true,
                    incorrectfield: 'Was not able to delete'
                })
            }
        })
        .catch(() => {
            setErr({
                show: true,
                incorrectfield: 'Was not able to delete'
            })
        })
        props.callback();
    }

    const handleClose = () => {
        setErr({
          show: false,
          incorrectfield: ''
        })
    }  

    if (parseInt(props.loggedinId,10) === state.userId) {
        return (
        <div className="row">
            <div className="col side"></div>
            <div className="col train border border-success">
                <p>Reservation</p>
                <p>TrainId: {state.trainId}</p>
                <p>UserId: {state.userId}</p>
                <p>Username: {props.loggedinName}</p>
                <Button onClick={deleteRes}>Delete Reservation</Button>
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
            <div className="col side"></div>
        </div>    
        )
    } else {
        return (
            <div className="row">
            <div className="col side"></div>
            <div className="col train border border-success">
                <p>Reservation</p>
                <p>TrainId: {state.trainId}</p>
                <p>UserId: {state.userId}</p>
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
            <div className="col side"></div>
        </div>
        )
    }    
}

export default ReservationData;