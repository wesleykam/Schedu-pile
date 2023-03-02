import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export default function FreeTimesList({ freeTimes, events, setEvents }) {
  if (freeTimes.length === 0) {
    return <></>;
  } else {
    return (
      <ListGroup style={{ marginTop: '2vh' }}>
        {freeTimes.map((time, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col
                className="d-flex align-items-center justify-content-start"
                md={10}
              >
                <p style={{ marginBottom: '0' }}>
                  {time.start} - {time.end}
                </p>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-end"
                md={2}
              >
                <Button
                  onClick={() => {
                    // setEvents([
                    //   ...events,
                    //   {
                    //     id: events.length,
                    //     text: time.text,
                    //     start: time.start,
                    //     end: time.end,
                    //   },
                    // ]);
                    console.log(time);
                  }}
                >
                  Select
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
