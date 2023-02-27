import React, { useState } from 'react';
import { Form, Col, Button, InputGroup, Row, Modal } from 'react-bootstrap';

export default function FreeTimeForm() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${startDate}T${endTime}`);
    const range = { start, end, duration };
    console.log(range);
  }

  function handleStartTimeChange(event) {
    setStartTime(event.target.value);
  }

  function handleEndTimeChange(event) {
    setEndTime(event.target.value);
  }

  function handleDurationChange(event) {
    setDuration(event.target.value);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Select Free Time
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Free Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="start-date">
                  <Form.Label>Start Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="end-date">
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row style={{ marginTop: '10px' }}>
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
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="duration">
                  <Form.Label>Duration:</Form.Label>
                  <Form.Control
                    type="range"
                    min="15"
                    max="600"
                    step="15"
                    value={duration}
                    onChange={handleDurationChange}
                  />
                  <p className="text-center">
                    {Math.floor(duration / 60)} hour
                    {Math.floor(duration / 60) !== 1 ? 's' : ''} {duration % 60}{' '}
                    minute
                    {duration % 60 !== 1 ? 's' : ''}
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
                    size="lg"
                    type="submit"
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
