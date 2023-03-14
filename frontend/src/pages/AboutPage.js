import React from 'react';
import { config } from '../Constants';
import '../style/AboutPage.css';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
    const navigate = useNavigate();
  return (
    <div className="about-container">
      <div className="about-title">About Schedu-pile</div>
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
        See our <a href="https://docs.google.com/document/d/134g6gAUn2Y1an1Z7dkvAMBPaprowT-OzQM-ypO07hGA/edit#" target="_blank"> user manual</a> for more details
      </p>
    </div>
  );
}

export default AboutPage;
