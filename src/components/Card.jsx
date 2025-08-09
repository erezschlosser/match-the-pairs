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
          <svg width="100%" height="100%" aria-hidden="true" focusable="false">
            <defs>
              <pattern
                id="diagonal-stripes"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(-45)"
              >
                <line x1="0" y1="0" x2="0" y2="10" stroke="#4d4d4d" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
          </svg>
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

