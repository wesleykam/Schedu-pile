import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/GroupsPage.css';
import React from 'react';

const start = 'd-flex justify-content-start align-items-center';
const center = 'd-flex justify-content-center align-items-center';
const end = 'd-flex justify-content-end align-items-center';

export default function DefaultLayout({ children, header, component }) {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row>
          <Col className={start} xs={4} style={{margin:"30px 10px 40px"}}>
            <h5
              style={{ cursor: 'pointer', backgroundColor:'rgba(243, 247, 250, 0.5)',padding:'0.5vw',borderRadius: '3px',paddingTop:'1vh',paddingBottom:'1vh', marginTop:'-7%', marginLeft:'-7%', fontFamily: 'Gill Sans'}}
              onClick={() => {
                navigate('/groups');
              }}
            >
              Go back
            </h5>
          </Col>
          <Col className={center}>
            <h1 className='h'>{header}</h1>
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