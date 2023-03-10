import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { checkUser } from '../lib/fetchUser';
import DefaultLayout from "../layouts/DefaultLayout"

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
    <><DefaultLayout header={welcomeMessage}>
      <EventCalendar groups={false} user={user} style={{ marginLeft: '1px' }} />
    </DefaultLayout><div className='background_padding'></div></>
  );
}