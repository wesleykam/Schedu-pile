import React from 'react';
import { deleteGroupMember } from '../../lib/handleGroup';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function LeaveGroupModal(props) {
    const navigate = useNavigate();
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Leave Group?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to leave {props.groupName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                Close
                </Button>
                <Button
                variant="danger"
                onClick={async () => {
                    const response = await deleteGroupMember(props.deleteUrl, {
                        email: props.email,
                        userId: props.id,
                    });
                    props.handleClose();
                    if (response?.success) {
                        navigate('/groups');
                    }
                }}
                >
                Leave Group
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}