import React from 'react';
import './Rounds.css';
import '../App.css';

function Rounds({ count }) {
  const display = count.toString().padStart(2, '0');

  return (
    <div className="digit">
      <span>{display}</span>
    </div>
  );
}

export default Rounds;
