import React, { useState } from 'react';
import { Form, Col, Button, Row, Modal } from 'react-bootstrap';
import { updateGroupMemberEvents, writeEvents } from '../../lib/fetchEvents';

export default function SpecificFreeTimeForm({
  time,
  userId,
  groupId,
  eventsUrl,
  hideId,
  eventName,
  eventDescription,
  selectedDuration,
  setShow,
  setCreateEvent,
}) {
  let event_start = new Date(time.start);
  const [show2, setShow2] = useState(false);
  const [start, setStart] = useState(event_start);
  const [newStart, setNewStart] = useState(event_start);
  const [slider, setSlider] = useState(0);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function handleClose2() {
    setShow2(false);
    setShow(false);
    setTimeout(() => {
      setCreateEvent(false);
    }, 200);
  }

  function handleShow2() {
    setShow2(true);
  }

  function handleStartChange(event) {
    setSlider(event.target.value);
    setNewStart(addMinutes(start, event.target.value));
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow2();
          setCreateEvent(true);
        }}
      >
        Select
      </Button>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <h5>Event Name:</h5>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>{eventName}</p>
              </Col>
            </Row>
            <Row style={{ marginTop: '5px' }}>
              <Col style={{ width: '488px' }} md={6}>
                <h5>Event Description:</h5>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>{eventDescription}</p>
              </Col>
            </Row>
            <Row style={{ marginTop: '1px' }}>
              <Col md={6}>
                <h5>Start Time:</h5>
              </Col>
              <Col md={6}>
                <h5>End Time:</h5>
              </Col>
            </Row>

            <Row style={{ marginTop: '1px' }}>
              <Col md={6}>
                <p>{time.start}</p>
              </Col>
              <Col md={6}>
                <p>{time.end}</p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="duration">
                  <Form.Label>
                    <h5>Event Duration:</h5>
                  </Form.Label>
                  <Form.Control
                    type="range"
                    min="0"
                    max={time.eventDuration - 60}
                    step="15"
                    value={slider}
                    onChange={handleStartChange}
                  />
                  <p className="text-center">
                    {newStart.toLocaleString('en-US', { timeZone: timezone })} -{' '}
                    {addMinutes(newStart, selectedDuration).toLocaleString(
                      'en-US',
                      { timeZone: timezone }
                    )}
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <div className="d-grid gap-2">
                  <Button
                    className="justify-content-center"
                    variant="primary"
                    onClick={() => {
                      writeEvents(
                        eventsUrl,
                        {
                          ...time,
                          start: newStart,
                          end: addMinutes(newStart, selectedDuration),
                        },
                        userId.user.id,
                        hideId,
                        eventName,
                        eventDescription
                      ).then((res) => {
                        updateGroupMemberEvents(groupId, userId.user.id);
                      }).then((res) => {
                        window.location.reload(false);
                      });
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
