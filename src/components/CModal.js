import React from 'react';
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
//primary-background
const CModal = ({message,show}) => {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {message}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Link to={'/'}>
                    <Button className={'primary-background'}>Ok</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default CModal;
