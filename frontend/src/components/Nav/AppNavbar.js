import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthButton from '../Buttons/AuthButton';

function AppNavbar({ user }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Calendar App</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <AuthButton user={user} />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
