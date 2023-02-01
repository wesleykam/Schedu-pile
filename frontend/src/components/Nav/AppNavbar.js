import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function AppNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Calendar App</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Button href="/login">Login</Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AppNavbar;