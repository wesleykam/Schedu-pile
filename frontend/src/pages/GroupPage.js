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
      setAdmin({
        id: groupInfo.group.admin,
        isAdmin: groupInfo.group.admin === user.user.id,
      });
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
                  handleShow={handleShow}
                  setDelUser={setDelUser}
                ></MemberList>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col className="d-flex justify-content-center align-items-center mx-auto">
                {admin.isAdmin && edit && (
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
                {admin.isAdmin && edit && (
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
                <FreeTimeForm events={events} setEvents={setEvents} />
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
        </Col>
      </Row>
    </DefaultLayout>
  );
}
