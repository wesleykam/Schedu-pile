import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { config } from '../../Constants';
import { deleteGroup } from '../../lib/handleGroup';

export default function DeleteGroupButton({ groupId, userId }) {
  let url = config.url + '/api/group' + groupId;
  const navigate = useNavigate();

  // Calls Delete Group API and redirects to groups page
  async function handleDeleteGroup() {
    const response = await deleteGroup(url, { userId });
    if (response?.success) {
      navigate('/groups');
    }
  }

  return (
    <>
      <Button onClick={handleDeleteGroup} variant="danger">Delete Group</Button>
    </>
  );
}
