import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { config } from '../../Constants';

function CreateGroupForm({ user, show, handleClose }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const createGroup = (e) => {
    e.preventDefault();
    if (!submitted) {
      setSubmitted(true);

      const body = {
        groupName: name,
        email: user.user.email,
        username: user.user.displayName,
        googleId: user.user.id,
      };

      fetch(config.url + '/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('failed to create group');
        })
        .then((responseJson) => {
          navigate('/groups/' + responseJson._id);
        });
    }
  };

  const createGroupButton = () => {
    if (!submitted) {
      setSubmitted(true);

      const body = {
        groupName: name,
        email: user.user.email,
        username: user.user.displayName,
        googleId: user.user.id,
      };

      fetch(config.url + '/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('failed to create group');
        })
        .then((responseJson) => {
          navigate('/groups/' + responseJson._id);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={createGroup}>
          <label>Enter Group Name</label>
          <div style={{ marginTop: '5px' }}>
            <input
              type="text"
              style={{ width: '100%' }}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() => {
            createGroupButton();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateGroupForm;
