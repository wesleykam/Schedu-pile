import { deleteGroupMember } from '../../lib/handleGroup';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteModal(props) {
  const email = props.email;
  const propUser = props.propUser;
  const admin = props.admin;
  return (
    <>
      {admin.id === props.id ? (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.name} is a Group Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Group admins cannot be removed from the group.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove {props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to remove {props.name}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                props.handleClose();
                deleteGroupMember(props.deleteUrl, {
                  email,
                  userId: propUser.user.id,
                });
                setTimeout(() => {
                  window.location.reload(false);
                }, 1000);
              }}
            >
              Delete user
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
