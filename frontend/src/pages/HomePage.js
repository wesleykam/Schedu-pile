import { Container } from 'react-bootstrap';
import EventCalendar from '../components/calender/EventCalendar';

export default function HomePage({ user }) {
  return (
    <Container>
      <EventCalendar user={user} />
    </Container>
  );
}
