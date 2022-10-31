import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';

const DeleteTrainButton = (props) => {

    const [modal,setModal] = useState({
        show: false,
        title: '',
        text: '',
    })

    const handleClick = async () => {
        const sendObj = {
            trainid: props.trainid
        }
        await fetch('http://localhost:8080/deletetrain', {
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(sendObj),
        })
        .then((resp) => resp.json())
        .then((json) => {
            if (json.error === true) {
                setModal({
                    show: true,
                    title: 'Error',
                    text: 'Could not delete Train'
                })
            } else if (json.error === false) {
                setModal({
                    show: true,
                    title: 'Succes',
                    text: 'Succesfully deleted the train'
                })
            }
        })
        .catch(() => {
            setModal({
                show: true,
                title: 'Error',
                text: 'Could not delete Train'
            })
        })
        props.callback();
    }

    const handleClose = () => {
        setModal({
            show: false,
            title: '',
            text: ''
        })
    }

    if (props.type === 'admin') {
        return (
            <div>
                <Button onClick={handleClick}>
                    Delete this Line
                </Button>
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
        )
    } else {
        return (
            <></>
        )
    }
}

export default DeleteTrainButton;