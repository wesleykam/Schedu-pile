import React, { useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from '../components/forms/CreateGroupForm';
import DefaultLayout from "../layouts/DefaultLayout"

const CreateGroupPage = ({ user }) => {
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
    <DefaultLayout header={'Create a Group'}>
        <CreateGroupForm user={user}></CreateGroupForm>
    </DefaultLayout>
);
};

export default CreateGroupPage;
