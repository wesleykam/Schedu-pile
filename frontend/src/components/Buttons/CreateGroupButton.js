import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CreateGroupButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate('/create');
      }}
    >
      + Create Group
    </Button>
  );
}
