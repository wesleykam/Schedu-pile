import React, { useState } from 'react';
import { Form, Col, Button, InputGroup, Row, Modal } from 'react-bootstrap';

export default function FreeTimeForm() {
  const [startDate, setStartDate] = useState('');
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
    // onSubmit({
    //   startDate,
    //   endDate,
    //   startTime,
    //   endTime,
    //   duration,
    // });
  }

  function renderTimeOptions(start, end) {
    const options = [];
    let time = new Date(`2022-01-01T${start}:00`);
    while (time <= new Date(`2022-01-01T${end}:00`)) {
      options.push(
        <option key={time.toISOString()} value={time.toISOString()}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </option>
      );
      time.setMinutes(time.getMinutes() + 60);
    }
    return options;
  }

  function renderDurationOptions() {
    const options = [];
    for (let i = 15; i <= 480; i += 15) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
      const minutesText =
        minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : '';
      const text = `${hoursText}${
        hours > 0 && minutes > 0 ? ' ' : ''
      }${minutesText}`;
      options.push(
        <option key={i} value={i}>
          {text}
        </option>
      );
    }
    return options;
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
              <Col md={4}>
                <Form.Group controlId="start-time">
                  <Form.Label>Start Time:</Form.Label>
                  <Form.Control
                    as="select"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                  >
                    {renderTimeOptions('05:00', '24:00')}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="end-time">
                  <Form.Label>End Time:</Form.Label>
                  <Form.Control
                    as="select"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                  >
                    {renderTimeOptions('05:00', '24:00')}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="duration">
                  <Form.Label>Duration:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="select"
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                    >
                      {renderDurationOptions()}
                    </Form.Control>
                    <Form.Group controlId="duration">
                      <Form.Label>Duration: {duration} minutes</Form.Label>
                    </Form.Group>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Button
              style={{ marginTop: '20px' }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
