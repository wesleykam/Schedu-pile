import { useState } from 'react';
import { config } from '../../Constants';

const AddGroupMembersForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const path = window.location.pathname;
    let url =
      config.url + '/api/group' + path.substring(path.lastIndexOf('/'));
    const memberEmails = { email };

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(memberEmails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to fetch events');
      })
      .then((responseJson) => {
        console.log(responseJson);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="me-1">New Member Email: </label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </form>
  );
};

export default AddGroupMembersForm;
