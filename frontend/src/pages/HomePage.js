import { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { checkUser } from '../lib/fetchUser';
import DefaultLayout from "../layouts/DefaultLayout"
import CreateEventForm from '../components/forms/CreateEventForm';

export default function HomePage({ user }) {
  const navigate = useNavigate();
  const welcomeMessage = "Welcome, " + user?.user?.displayName+"!";
  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
    }
    localCheckUser();
  });

  return (
    <><DefaultLayout>
      <Row>
        <Col>
        </Col>
        <Col className='d-flex justify-content-center align-items-center'>
          <h1>{welcomeMessage}</h1>
        </Col>
        <Col className='d-flex justify-content-center align-items-center'> 
          <CreateEventForm user={user}></CreateEventForm>
        </Col>
      </Row>
      <Row>
        <Col>
          <EventCalendar groups={false} user={user} style={{ marginLeft: '1px' }} />
        </Col>
      </Row>
 

    </DefaultLayout><div className='background_padding2'></div></>
  );
}