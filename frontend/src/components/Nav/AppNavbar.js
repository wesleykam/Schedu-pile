import { Navbar, Nav, Container } from 'react-bootstrap';
import AuthButton from '../Buttons/AuthButton';

function AppNavbar({ user }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGonmi6K_5Gz0_ixaA82ra4rjB7D8_kwVDYQ&usqp=CAU" alt="logo" width={40} height={40} object position="right 0" />
          <Navbar.Brand href="/">Schedu-pile</Navbar.Brand>
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
