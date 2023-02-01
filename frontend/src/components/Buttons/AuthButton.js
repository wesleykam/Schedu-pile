import { Button } from 'react-bootstrap';

export default function AuthButton({ user }) {
  return (
    <>
      {user.authenticated ? (
        <Button href="http://localhost:8000/auth/logout">Log out</Button>
      ) : (
        <Button href="http://localhost:8000/auth/google">Sign in</Button>
      )}
    </>
  );
}
