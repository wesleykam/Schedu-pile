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
import DeleteGroupButton from '../components/Buttons/DeleteGroupButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../Constants';
import EventCalendar from '../components/calender/EventCalendar';
import {
  checkGroup,
  fetchGroupEvents,
  updateGroupMemberEvents,
} from '../lib/fetchEvents';
import { checkUser } from '../lib/fetchUser';
import { deleteGroupMember } from '../lib/handleGroup';
import FreeTimeForm from '../components/forms/FreeTimeForm';
import FreeTimeFormOnly from '../components/forms/FreeTimeFormOnly';

const CLASSNAME = 'd-flex justify-content-center align-items-center';

export default function GroupDetails({ user }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [email, setDelete] = useState('');
  const [del_user, setDelUser] = useState('');
  const [admin, setAdmin] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const path = window.location.pathname;
  let groupId = path.substring(path.lastIndexOf('/'));
  let url = config.url + '/api/group' + groupId;
  let deleteUrl = config.url + '/api/group/members' + groupId;
  let eventsUrl = config.url + '/api/group/events' + groupId;

  useEffect(() => {
    async function fetchData() {
      const user = await checkUser();
      if (!user.authenticated) navigate('/');
      const groupInfo = await checkGroup(url, user);
      if (!groupInfo?.exists) navigate('/groups');
      setName(groupInfo.group.name);
      setMembers(groupInfo.group.groupMembers);
      setAdmin(groupInfo.group.admin === user.user.id);
    }
    fetchData();

    async function getEvents() {
      const groupEvents = await fetchGroupEvents(eventsUrl);
      setEvents(groupEvents);
      setFetched(true);
    }

    fetchData();
    if (!fetched) getEvents();
  }, [events]);

  return (
    <DefaultLayout className={CLASSNAME} header={`${name}`}>
      <Row>
        <Col xs={8}>
          <EventCalendar events={events} groups={true} />
        </Col>

        <Col>
          {admin && (
            <Button
              className="d-flex justify-content-center align-items-center mx-auto"
              style={{ marginBottom: '5%' }}
              onClick={() => {
                setEdit((prevEdit) => !prevEdit);
              }}
            >
              Edit
            </Button>
          )}
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
                          <p
                            style={{
                              cursor: 'pointer',
                              position: 'absolute',
                              right: '50px',
                            }}
                            onClick={() => {
                              updateGroupMemberEvents(groupId, member[0]);
                              setTimeout(() => {
                                window.location.reload(false);
                              }, 1000);
                            }}
                          >
                            Refresh
                          </p>
                          {admin && edit && (
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
                {admin && edit && (
                  <AddGroupMembersForm user={user}></AddGroupMembersForm>
                )}
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col
                style={{ paddingTop: '5%' }}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                {admin && edit && (
                  <DeleteGroupButton
                    groupId={groupId}
                    userId={user.user.id}
                  ></DeleteGroupButton>
                )}
              </Col>
            </Row>
            <Row>
              <Col
                style={{ paddingTop: '5%' }}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                <FreeTimeForm />
              </Col>
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
                onClick={async () => {
                  handleClose();
                  deleteGroupMember(deleteUrl, { email, userId: user.user.id });
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 100);
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
