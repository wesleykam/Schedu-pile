import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import GroupCard from './GroupCard';

const Groups = ({ groups }) => {
  return (
    <Container>
      <Row xs={2} className="g-4">
        {groups.map((group, idx) => {
          return (
            <Col>
              <GroupCard key={idx} data={group} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Groups;
