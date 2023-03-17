import React from 'react';
import { Button } from 'react-bootstrap';

export default function LeaveGroupButton({user, handleShowLeave, setDelUser}) {
  return (
    <>
      <Button variant = "danger"
        onClick={() => {
        handleShowLeave();
        setDelUser({name: user.user.displayName, email: user.user.email, id: user.user.id});
      }
      }>Leave Group</Button>
    </>
  );
}