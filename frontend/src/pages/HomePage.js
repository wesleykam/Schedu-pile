import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { config } from '../Constants';

export default function HomePage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(config.url + '/check', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      navigate('/');
    });
  });

  return (
    <Container>
      <EventCalendar groups={false} user={user} />
    </Container>
  );
}
