import React from 'react';
import './Attempts.css';
import '../App.css';

function Attempts({ count }) {
  const display = count.toString().padStart(2, '0'); // for typography feel

  return (
    <div className="digit">
      <span>{display}</span>
    </div>
  );
}

export default Attempts;
