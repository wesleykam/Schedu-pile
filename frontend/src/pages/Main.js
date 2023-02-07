import React from 'react';
import '../style/Home.css';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div></div>
      <div className="headerContainer">
        <h1>When2Meet2.0</h1>
        <p>Find group avaliable time by importing from google calender</p>
        <button
          onClick={() => {
            navigate('/home');
          }}
        >
          <Link to="/create" style={{ textDecoration: 'none', color: '#FFF' }}>
            {' '}
            TRY IT NOW{' '}
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Main;
