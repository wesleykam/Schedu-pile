import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import GroupCard from './GroupCard';
import { GroupData } from '../../test/groups.mock.data';

const data = GroupData;

const Groups = () => {
  const keys = Object.keys(data);

  return (
    <Container>
      <Row xs={2} className="g-4">
        {Array.from({ length: keys.length }).map((_, idx) => {
          return (
            <Col>
              <GroupCard key={idx} data={data[idx]} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Groups;
