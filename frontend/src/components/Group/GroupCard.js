import { Card, Col, Row } from 'react-bootstrap';

const GroupCard = ({ data }) => {
  const numMembers = data.members.length;
  return (
    <Col className="d-flex justify-content-center align-items-center">
      <Card
        onClick={() => {
          console.log('Should go to webpage for', data.name);
        }}
        style={{ width: '100%', cursor: 'pointer' }}
      >
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.description}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Team members:</Card.Title>
              <Card.Text>
                {data.members.map((member, idx) => {
                  if (idx === numMembers - 1) {
                    return member.name;
                  } else {
                    return member.name + ', ';
                  }
                })}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GroupCard;
