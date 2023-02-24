import React from 'react';
import { config } from '../Constants';
import '../style/AboutPage.css';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
    const navigate = useNavigate();
  return (
    <div className="about-container">
      <h1 className="about-title">About Schedu-pile</h1>
      <p className="about-description">
        CREATED FOR SIMPLICITY. 
        <br />
        Schedu-pile is created to help people in a group find a common time to meet by combining their events from Google Calendar.
      </p>
      <p className="about-description">
        EASY TO USE.
        <br />
        Login through Google account; Join/Create groups by email invitation; 
        <br />
        View all potiential meeting time with one search!
      </p>
      <p className="about-description">
        TRY IT NOW!
        <br />
        With Schedu-pile, no more back-and-forth emailing to find a suitable time for everyone. Simply add your Google Calendar events and Schedu-pile will take care of the rest.
      </p>
    </div>
  );
}

export default AboutPage;
