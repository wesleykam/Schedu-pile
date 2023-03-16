import React, { useState } from 'react';
import { Form, Col, Button, Row, Modal } from 'react-bootstrap';
import { getFreeTime } from '../../lib/fetchEvents';
import FreeTimesList from '../Group/FreeTimesList';

export default function FreeTimeForm({ hideId, eventsUrl, userId }) {
  const path = window.location.pathname;
  let groupId = path.substring(path.lastIndexOf('/'));
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [show, setShow] = useState(false);
  const [freeTimes, setFreeTimes] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [createEventModal, setCreateEvent] = useState(false);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // const start = new Date(`${startDate}T${startTime}`);
    // const end = new Date(`${startDate}T${endTime}`);
    const range = {
      startDateStr: startDate,
      endDateStr: endDate,
      startTimeStr: startTime,
      endTimeStr: endTime,
      duration,
      hideId,
    };
    console.log(range);
    const availability = await getFreeTime(groupId, range);
    if (availability.length === 0) {
      alert('No free time available');
    }
    setFreeTimes(availability);
    console.log(availability);
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
        Create A New Event
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div style={{ display: createEventModal ? 'none' : '' }}>
          <Modal.Header closeButton>
            <Modal.Title>Create A New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col style={{ width: '488px' }} md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Event Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col style={{ width: '488px' }} md={6}>
                  <Form.Group controlId="description">
                    <Form.Label>Event Description:</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventDescription}
                      onChange={(eventD) =>
                        setEventDescription(eventD.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
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
                      {Math.floor(duration / 60) !== 1 ? 's' : ''}{' '}
                      {duration % 60} minute
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
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
            <FreeTimesList
              freeTimes={freeTimes}
              eventsUrl={eventsUrl}
              userId={userId}
              groupId={groupId}
              hideId={hideId}
              eventName={eventName}
              eventDescription={eventDescription}
              selectedDuration={duration}
              setShow={setShow}
              setCreateEvent={setCreateEvent}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
