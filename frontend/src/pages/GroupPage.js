import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddGroupMembersForm from '../components/forms/AddGroupMembersForm';

const GroupPage = ({ user }) => {
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/check', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      navigate('/');
    });
  });

  return (
    <Container expand="xl" className="pt-4 flex-grow-1">
      <AddGroupMembersForm></AddGroupMembersForm>
    </Container>
  );
};

export default GroupPage;
