import React from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { config } from '../../Constants';

export default function CreateEventForm({ user }) {
  const [event, setEvent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleStartTimeChange(e) {
    setStartTime(e.target.value);
  }

  function handleEndTimeChange(e) {
    setEndTime(e.target.value);
  }

  const createEvent = (e) => {
    e.preventDefault();
    const body = {
      id: user.user.id,
      eventName: event,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    };
    let url = config.url + '/api/user/events/';

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to create event');
      })
      .then((responseJson) => {
        window.location.reload(true);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createEvent}>
            <Row style={{ marginBottom: '1.5%', marginTop: '-1.5%' }}>
              <Col md={12}>
                <Form.Group controlId="name">
                  <Form.Label>Event Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="endDate">
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ marginTop: '2%' }}>
              <Col md={6}>
                <Form.Group controlId="startTime">
                  <Form.Label>Start Time:</Form.Label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <Form.Control
                        type="time"
                        step="900"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        required
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="endTime">
                  <Form.Label>End Time:</Form.Label>
                  <div className="d-flex">
                    <div className="flex-fill">
                      <Form.Control
                        type="time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        required
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <div className="d-grid gap-2">
                  <Button
                    className="justify-content-center"
                    variant="primary"
                    type="submit"
                    style={{ marginTop: '25%' }}
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
