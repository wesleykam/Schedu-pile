import { useState } from 'react';
import { config } from '../../Constants';
import Alert from 'react-bootstrap/Alert';
import { addGroupMember } from '../../lib/handleGroup';

const AddGroupMembersForm = ({ user, groupName, groupId }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const path = window.location.pathname;
    let url = config.url + '/api/invite/send';
    const body = { email, groupName, groupId };

    const response = await addGroupMember(url, body);
    const message = await response.response;
    
    if (response.success) {
      setError(false);
      setSuccess(true);
    } else {
      setSuccess(false);
      setError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="me-1">New Member Email: </label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {error &&
        ['danger'].map((message) => (
          <Alert key={message} variant={message}>
            Invalid Member Email!
          </Alert>
        ))}
      {success &&
        ['success'].map((message) => (
          <Alert key={message} variant={message}>
            Invitation Sent!
          </Alert>
        ))}
    </form>
  );
};

export default AddGroupMembersForm;
