import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ data }) => {
  const navigate = useNavigate();
  const numMembers = data?.groupMembers.length;
  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Card
        onClick={() => {
          navigate(`/group/${data?._id}`);
        }}
        style={{ width: '100%', cursor: 'pointer' }}
      >
        <Card.Body>
          <Card.Title>{data?.name}</Card.Title>
          <Card.Subtitle style={{ marginTop: '5px' }}>
            Team members:
          </Card.Subtitle>
          <Card.Text>
            {data?.groupMembers.map((member, idx) => {
              if (idx === numMembers - 1) {
                if (member[1]) {
                  return member[1];
                }
              } else {
                if (member[1]) {
                  return member[1] + ', ';
                }
              }
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GroupCard;
