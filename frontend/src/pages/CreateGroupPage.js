import React, { useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from '../components/forms/CreateGroupForm';

const CreateGroupPage = ({ user, loading }) => {
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
      <div className="">
        <h1
          className="text-decoration-underline d-flex justify-content-center align-items-center"
          style={{ height: '250px', fontSize: '75px' }}
        >
          Create a Group
        </h1>
      </div>
      <CreateGroupForm></CreateGroupForm>
    </Container>
  );
};

export default CreateGroupPage;
