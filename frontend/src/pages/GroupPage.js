import DefaultLayout from '../layouts/DefaultLayout';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AddGroupMembersForm from '../components/forms/AddGroupMembersForm';
import DeleteGroupButton from '../components/Buttons/DeleteGroupButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../Constants';
import EventCalendar from '../components/calender/EventCalendar';
import { checkGroup, fetchGroupEvents } from '../lib/fetchEvents';
import { checkUser } from '../lib/fetchUser';
import MemberList from '../components/Group/memberList';
import DeleteModal from '../components/Group/DeleteModal';
import FreeTimeForm from '../components/forms/FreeTimeForm';
import { Modal } from 'react-bootstrap';
import { deleteGroup } from '../lib/handleGroup';

const CLASSNAME = 'd-flex justify-content-center align-items-center';

export default function GroupDetails({ user }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [del_user, setDelUser] = useState('');
  const [admin, setAdmin] = useState('');
  const [hideId, setHideId] = useState([]);
  const [showGroup, setShowGroup] = useState(false);
  const [del_group, setDelGroup] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseGroup = () => setShowGroup(false);
  const handleShowGroup = () => setShowGroup(true);
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
      setAdmin({
        id: groupInfo.group.admin,
        isAdmin: groupInfo.group.admin === user.user.id,
      });
    }
    fetchData();

    async function getEvents() {
      let newHideId = JSON.parse(sessionStorage.getItem('hideId'));
      {
        newHideId ? setHideId(newHideId) : setHideId([]);
      }
      const groupEvents = await fetchGroupEvents(eventsUrl, newHideId);
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
          {admin.isAdmin && (
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
                <MemberList
                  members={members}
                  groupId={groupId}
                  admin={admin.isAdmin}
                  edit={edit}
                  hideId={hideId}
                  setHideId={setHideId}
                  handleShow={handleShow}
                  setDelUser={setDelUser}
                ></MemberList>
              </Col>
            </Row>
            <Row>
              
              <Col></Col>
              <Col className="d-flex justify-content-center align-items-center mx-auto">
                {admin.isAdmin && edit && (
                  <AddGroupMembersForm user={user} groupName={name} groupId={groupId.substring(1)}></AddGroupMembersForm>
                )}
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col
                style={{ paddingTop: '5%' }}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                {admin.isAdmin && edit && (
                  <DeleteGroupButton
                    handleShowGroup={handleShowGroup}
                    setDelGroup={setDelGroup}
                    groupName={name}
                  ></DeleteGroupButton>
                )}
              </Col>
            </Row>
            <Row>
              <Col
                style={{ paddingTop: '5%' }}
                className="d-flex justify-content-center align-items-center mx-auto"
              >
                <FreeTimeForm
                  events={events}
                  setEvents={setEvents}
                  hideId={hideId}
                />
              </Col>
            </Row>
          </Container>
          <DeleteModal
            show={show}
            email={del_user.email}
            propUser={user}
            admin={admin}
            id={del_user.id}
            handleClose={handleClose}
            name={del_user.name}
            deleteUrl={deleteUrl}
          ></DeleteModal>
          <Modal show={showGroup} onHide={handleCloseGroup}>
            <Modal.Header closeButton>
              <Modal.Title>Remove {del_group}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove group {del_group}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseGroup}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  handleCloseGroup();
                  const response = await deleteGroup(url, { userId: user.user.id });
                  if (response?.success) {
                    navigate('/groups');
                  }
                  setTimeout(() => {
                    window.location.reload(false);
                  }, 100);
                }}
              >
                Delete Group
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
