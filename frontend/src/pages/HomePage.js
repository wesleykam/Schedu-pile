import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { checkUser } from '../lib/fetchUser';

export default function HomePage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
    }
    localCheckUser();
  });

  return (
    <Container>
      <EventCalendar groups={false} user={user} />
    </Container>
  );
}
