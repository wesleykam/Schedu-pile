import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function FreeTimeFormOnly() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [duration, setDuration] = useState(60);

  function handleSubmit(event) {
    event.preventDefault();
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${startDate}T${endTime}`);
    const range = { startDate, startTime, endTime, duration };
  }

  function handleStartDateChange(event) {
    setStartDate(event.target.value);
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date:</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </Form.Group>

      <Form.Group controlId="timeRange">
        <Form.Label>Time Range:</Form.Label>
        <div className="d-flex">
          <div className="flex-fill">
            <Form.Control
              type="time"
              step="900"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div className="flex-fill">
            <Form.Control
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
        </div>
      </Form.Group>

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
          {Math.floor(duration / 60) !== 1 ? 's' : ''} {duration % 60} minute
          {duration % 60 !== 1 ? 's' : ''}
        </p>
      </Form.Group>

      <Button type="submit">Find Free Time</Button>
    </Form>
  );
}
