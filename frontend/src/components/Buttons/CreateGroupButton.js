import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CreateGroupForm from '../forms/CreateGroupForm';

export default function CreateGroupButton({ user }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <Button
        onClick={() => {
          handleShow();
        }}
      >
        + Create Group
      </Button>
      <CreateGroupForm
        user={user}
        show={show}
        handleClose={handleClose}
      ></CreateGroupForm>
    </>
  );
}
