import React from 'react';
import { Button } from 'react-bootstrap';

export default function DeleteGroupButton({ groupName, handleShowGroup, setDelGroup}) {

  return (
    <>
      <Button onClick={() => {
        handleShowGroup();
        setDelGroup(groupName);
      }
      }>Delete Group</Button>
    </>
  );
}