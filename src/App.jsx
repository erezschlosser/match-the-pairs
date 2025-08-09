import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import LoadingScreen from "./components/LoadingScreen";
import Timer from "./components/Timer";
import Attempts from "./components/Attempts";
import Rounds from "./components/Rounds";
import Cursor from "./components/Cursor";
import Instructions from "./components/Instructions";
import "./App.css";
import myImage from './assets/linejapan.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [resetSignal, setResetSignal] = useState(0); // will bump on each restart
  const [attempts, setAttempts] = useState(0);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    if (!isGameActive) setIsGameActive(true);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setRounds((prev) => prev + 1); // ✅ increment rounds
  };

  const handleRestart = () => {
    setIsGameActive(false);
    setIsGameOver(false);
    setResetSignal((prev) => prev + 1);
    setAttempts(0);
  };

  return (
    <div className="app">
      {!isLoading && <Cursor />}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="wrapper">
            <div className="topbar">
              <div
                className="jp-text"
              >
                あいうえお カタカナ 漢字
              </div>
              <h1>
                Match/pairs <span className="titlespan">japan</span>
              </h1>
              <Instructions />
            </div>
            <div className="midsection">
              <GameBoard
                onStart={handleStart}
                onWin={handleGameOver}
                onRestart={handleRestart}
                resetSignal={resetSignal}
                setAttempts={setAttempts}
              />
            </div>
            <div className="bottombar">
              <div className="box">
                <div className="spacer-wrapper">
                  <div className="line"></div>
                  <div className="small-title">timelapse</div>
                </div>
                <Timer
                  isGameActive={isGameActive}
                  isGameOver={isGameOver}
                  resetSignal={resetSignal}
                />
              </div>
              <div className="separator"></div>
              <div className="box right">
                <div className="spacer-wrapper">
                  <div className="line"></div>
                  <div className="small-title">attempts</div>
                </div>
                <Attempts count={attempts} />
              </div>
              <div className="box right">
                <div className="spacer-wrapper">
                  <div className="line"></div>
                  <div className="small-title">rounds</div>
                </div>
                <Rounds count={rounds} />
              </div>
            </div>
            <div style={{height: '20px', width: '100%', overflow: 'hidden'}}>
                  <img 
                    src={myImage} 
                    alt="lines" 
                    style={{ width: '3000px', display: 'block', transform: 'translateX(10px)', flex: '0 0 auto'}} 
                  />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
