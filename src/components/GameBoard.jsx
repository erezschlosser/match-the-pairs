import React, { useState, useEffect } from 'react';
import Card from './Card';

const ICONS = ['🐶', '🐱', '🦊', '🐸', '🐵', '🐼'];

function GameBoard() {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (matched.length && matched.length === deck.length) {
      setIsGameWon(true);
    }
  }, [matched, deck]);

  function startNewGame() {
    const doubled = [...ICONS, ...ICONS];
    const shuffled = shuffle(doubled).map((icon, index) => ({
      id: index,
      icon,
    }));
    setDeck(shuffled);
    setFlipped([]);
    setMatched([]);
    setDisableClick(false);
    setIsGameWon(false);
  }

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleCardClick(cardId) {
    if (disableClick) return;
    if (flipped.includes(cardId) || matched.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = deck.find((c) => c.id === firstId);
      const secondCard = deck.find((c) => c.id === secondId);

      if (firstCard.icon === secondCard.icon) {
        setMatched((prev) => [...prev, firstId, secondId]);
        setFlipped([]);
      } else {
        setDisableClick(true);
        setTimeout(() => {
          setFlipped([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  }

  return (
    <>
      {isGameWon && (
        <div className="victory-message">
          <p>You matched all the pairs! 🎉</p>
        </div>
      )}
      <div className="grid">
        {deck.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <div className="controls">
        <button onClick={startNewGame}>Restart Game</button>
      </div>
    </>
  );
}

export default GameBoard;
