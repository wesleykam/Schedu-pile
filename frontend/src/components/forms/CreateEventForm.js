import React from 'react';
import { Button } from 'react-bootstrap';

export default function CreateEventForm() {
  return (
    <form>
      <div>
      <label className="me-1" style={{paddingLeft: '17%'}}>Event Name:   
      <input className="me-1" type="text"/>
      </label>

      <p></p>

      <label className="me-1"  style={{paddingLeft: '17%'}}>Event Start Time:   
      <input className="me-1" type="text"/>
      </label>

      <p></p>

      <label className="me-1" style={{paddingLeft: '17%'}}>Event End Time:   
      <input className="me-1"  type="text"/>
      </label>
      </div>

      <Button className="d-flex justify-content-center align-items-center mx-auto" style={{marginTop: '10%'}} type="submit">Submit</Button>

    </form>
  );
}

