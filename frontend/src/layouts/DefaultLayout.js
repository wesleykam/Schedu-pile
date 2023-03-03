import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/DefaultLayout.css';
import React from 'react';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';

export default function DefaultLayout({ children, header, component }) {
  const navigate = useNavigate();
  return (
    <>
      <Container style={{zIndex: 999}}>
        <Row>
          <Col className={start} xs={4}>
            <h5
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/groups');
              }}
            >
              Go back
            </h5>
          </Col>
          <Col className={center}>
            <h1 className="layout-header">{header}</h1>
          </Col>
          <Col xs={4} className={end}>
            {component}
          </Col>
        </Row>
      </Container>
      {children}
    </>
  );
}