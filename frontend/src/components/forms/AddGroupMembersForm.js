import { useState } from 'react';
import { config } from '../../Constants';
import Alert from 'react-bootstrap/Alert';
import { addGroupMember } from '../../lib/handleGroup';

const AddGroupMembersForm = ({ user }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const path = window.location.pathname;
    let url = config.url + '/api/group' + path.substring(path.lastIndexOf('/'));
    const emailAndId = { email, userId: user.user.id };

    const response = await addGroupMember(url, emailAndId);
    if (response.success) {
      window.location.reload();
    } else {
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
    </form>
  );
};

export default AddGroupMembersForm;
