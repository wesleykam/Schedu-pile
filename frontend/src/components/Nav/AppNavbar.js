import { Navbar, Nav, Container } from 'react-bootstrap';
import AuthButton from '../Buttons/AuthButton';

function AppNavbar({ user }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Calendar App</Navbar.Brand>
          {user.authenticated ? (
            <Nav className="me-auto">
              <Nav.Link href="/create" style={{ marginTop: '3px' }}>
                Create Group
              </Nav.Link>
              <Nav.Link href="/groups" style={{ marginTop: '3px' }}>
                Groups
              </Nav.Link>
            </Nav>
          ) : null}
          <Nav className="ml-auto">
            <Nav.Link href={user.authenticated ? "/home" : "/"} style={{ marginRight: '10px' }}>
              Home
            </Nav.Link>
            <AuthButton user={user} />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
