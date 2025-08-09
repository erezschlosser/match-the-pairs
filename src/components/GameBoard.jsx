import React, { useState, useEffect } from "react";
import Card from "./Card";
import { KANA_PAIRS } from "../data/kana";
import "./GameBoard.css";
import '../App.css';

function GameBoard({ onStart, onWin, onRestart, resetSignal, setAttempts }) {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]); // ids
  const [matched, setMatched] = useState([]); // ids
  const [disableClick, setDisableClick] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, [resetSignal]);

  // GameBoard.jsx
  useEffect(() => {
    const allMatched = deck.length > 0 && matched.length === deck.length;
    if (allMatched && !isGameWon) {
      setIsGameWon(true);
      onWin?.(); // fire once
    }
  }, [matched, deck, isGameWon]);

  function startNewGame() {
    // Build two cards per pair: hiragana + romaji
    let id = 0;
    const base = KANA_PAIRS.flatMap(({ reading, kana }) => [
      {
        id: id++,
        reading,
        script: "hiragana",
        primary: kana,
        secondary: reading,
      },
      {
        id: id++,
        reading,
        script: "romaji",
        primary: reading,
        secondary: kana,
      },
    ]);

    const shuffled = shuffle(base);
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

    if (!isGameWon && flipped.length === 0) {
      onStart?.(); // first interaction → start timer
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [aId, bId] = newFlipped;
      const a = deck.find((c) => c.id === aId);
      const b = deck.find((c) => c.id === bId);

      const isMatch =
        a && b && a.reading === b.reading && a.script !== b.script;

      if (isMatch) {
        setMatched((prev) => [...prev, aId, bId]);
        setFlipped([]);
      } else {
        setDisableClick(true);
        setTimeout(() => {
          setFlipped([]);
          setDisableClick(false);
        }, 900);
        setAttempts?.((prev) => prev + 1);
      }
    }
  }

  function handleRestartClick() {
    onRestart?.();
  }

  return (
    <>
      <div className="grid">
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flipped.includes(card.id)}
            isMatched={matched.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      <div className="controls">
        <button onClick={handleRestartClick}>RESTART GAME</button>
        {isGameWon && (
          <div className="victory-message">
            <p className="para">YOU MATCHED ALL THE PAIRS!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default GameBoard;
