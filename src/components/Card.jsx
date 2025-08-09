import React from 'react';
import './Card.css';

function Card({ card, isFlipped, isMatched, onClick }) {
  const { primary, secondary, script } = card;

  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={script === 'hiragana' ? `${primary} (${secondary})` : `${primary} (${secondary})`}
    >
      <div className="card-inner">
        {/* FRONT (pattern) */}
        <div className="card-front">

        </div>

        {/* BACK (content) */}
        <div className={`card-back ${script}`}>
          <div className="face">
            <div className="primary">{primary}</div>
            <div className="secondary">{secondary}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

