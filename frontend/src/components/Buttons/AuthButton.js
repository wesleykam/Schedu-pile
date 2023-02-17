import React from 'react';
import { Button } from 'react-bootstrap';
import { config } from '../../Constants';

export default function AuthButton({ user }) {
  return (
    <>
      {user.authenticated ? (
        <Button href={`${config.url}/auth/logout`}>Log out</Button>
      ) : (
        <Button href={`${config.url}/auth/google`}>Sign in</Button>
      )}
    </>
  );
}
