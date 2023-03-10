import { useNavigate } from 'react-router-dom';
import '../style/DefaultLayout.css';
import React from 'react';

export default function DefaultLayout({ children, header, component }) {
  const navigate = useNavigate();
  return (
    <div className='background'>
      <div className='backbutton'>
        <h5
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/groups');
          }}>
          Go back
        </h5>
      </div>
          <div className="headerContainer">
            <h>{header}</h>
            <p>{component}</p>
          </div>
      <p>{children}</p>
    </div>
  );
}