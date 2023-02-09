import DefaultLayout from '../layouts/DefaultLayout';
import {
  Button,
  Container,
  CloseButton,
  Modal,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import AddGroupMembersForm from '../components/forms/AddGroupMembersForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../Constants';
import EventCalendar from '../components/calender/EventCalendar';
import { fetchGroupEvents } from '../lib/fetchEvents';

const CLASSNAME = 'd-flex justify-content-center align-items-center';

export default function GroupDetails({ user }) {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState(null);
  const [email, setDelete] = useState('');
  const [del_user, setDelUser] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const path = window.location.pathname;
  let groupId = path.substring(path.lastIndexOf('/'));
  let url = config.url + '/api/group' + groupId;
  let deleteUrl = config.url + '/api/group/members' + groupId;

  useEffect(() => {
    async function fetchData() {
      const check = await fetch(config.url + '/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      const checkUser = await check.json();
      if (!checkUser.authenticated) navigate('/');
      const groupResponse = await fetch(url, {
        method: 'GET',
      });
      const groupResponseJson = await groupResponse.json();
      let exists = false;
      for (const member of groupResponseJson.groupMembers) {
        if (member[0] === checkUser.user.id) {
          exists = true;
          break;
        }
      }
      if (!exists) navigate('/groups');
      setMembers(groupResponseJson.groupMembers);
    }
    async function fetchEvents() {
      const groupEvents = await fetchGroupEvents(groupId);
      setEvents(groupEvents);
    }
    fetchData();
    fetchEvents();
  }, [events]);

  const handleDelete = () => {
    const deleteEmail = { email };

    fetch(deleteUrl, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(deleteEmail),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Failed to delete user');
      })
      .then((responseJson) => {
        console.log(responseJson);
        window.location.reload(false);
      });
  };

  return (
    <DefaultLayout
      className={CLASSNAME}
      header={'Group Details'}
      component={
        <Button
          onClick={() => {
            setEdit((prevEdit) => !prevEdit);
          }}
        >
          Edit
        </Button>
      }
    >
      <Row>
        <Col xs={8}>
          <EventCalendar events={events} groups={true} />
        </Col>
        <Col>
          <Container fluid>
            <Row className="mb-3 d-flex justify-content-center align-items-center">
              <Col
                xs={4}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                <ListGroup>
                  {members.map((member) => (
                    <ListGroup.Item
                      className="overflow-auto d-flex align-items-center"
                      style={{ width: '350px', height: '35px' }}
                    >
                      <Row className="d-flex">
                        <Col className="me-3" style={{ width: '275px' }}>
                          {member[1]}{' '}
                        </Col>
                        <Col
                          className="d-flex justify-content-end"
                          style={{ witdh: '100px' }}
                        >
                          {edit && (
                            <CloseButton
                              onClick={() => {
                                handleShow();
                                setDelete(member[2]);
                                setDelUser(member[1]);
                              }}
                            ></CloseButton>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col className="d-flex justify-content-center align-items-center mx-auto">
                {edit && <AddGroupMembersForm></AddGroupMembersForm>}
              </Col>
              <Col></Col>
            </Row>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Remove {del_user}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove {del_user}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleClose();
                  handleDelete();
                }}
              >
                Delete user
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
