import React, { useEffect, useState } from 'react';
import './Timer.css';
import '../App.css';

function Timer({ isGameActive, isGameOver, resetSignal }) {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (isGameActive && !isGameOver) {
      if (!started) setStarted(true);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    if (isGameOver) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameActive, isGameOver, started]);

  // Reset on new game
  useEffect(() => {
    setSeconds(0);
    setStarted(false);
  }, [resetSignal]);

  // Format with leading zeros
  const display = seconds.toString().padStart(4, '0');

  return (
    <div>
        <div className='digit'>{display}</div>
    </div>
  );
}

export default Timer;
