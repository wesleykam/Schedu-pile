import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import SignInButton from '../SignInButton/SignInButton';

function AppNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Calendar App</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <SignInButton></SignInButton>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
