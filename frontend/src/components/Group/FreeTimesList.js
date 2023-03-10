import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import SpecificFreeTimeForm from '../forms/SpecificFreeTimeForm';

export default function FreeTimesList({
  freeTimes,
  eventsUrl,
  userId,
  hideId,
  eventName,
  eventDescription,
  selectedDuration,
  setShow,
  setCreateEvent,
}) {
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
                <SpecificFreeTimeForm
                  time={time}
                  userId={userId}
                  eventsUrl={eventsUrl}
                  hideId={hideId}
                  eventName={eventName}
                  eventDescription={eventDescription}
                  selectedDuration={selectedDuration}
                  setShow={setShow}
                  setCreateEvent={setCreateEvent}
                ></SpecificFreeTimeForm>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
