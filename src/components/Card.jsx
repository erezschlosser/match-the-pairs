import React from 'react';
import './Card.css'; // optional separate styling

function Card({ icon, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{icon}</div>
      </div>
    </div>
  );
}

export default Card;
