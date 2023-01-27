import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import GroupCard from './GroupCard';

const Groups = ({ groupData }) => {
  const keys = Object.keys(groupData);

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ fontSize: '10vh', margin: '30px 0 40px' }}>Groups</h1>
        </Col>
      </Row>
      <Row xs={2} className="g-4">
        {Array.from({ length: keys.length }).map((_, idx) => {
          return <GroupCard key={idx} data={groupData[idx]} />;
        })}
      </Row>
    </Container>
  );
};

export default Groups;
