// LoadingScreen.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LoadingScreen.css";

const LETTERS = ["あ","い","う","え","お","か","き","く","け","こ"];

export default function LoadingScreen() {
  const letterRef = useRef(null);
  const idxRef = useRef(0); // persist index across renders

  useEffect(() => {
    const el = letterRef.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.out" } });

    tl.to(el, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // guard in case we unmounted between frames
        if (!letterRef.current) return;
        idxRef.current = (idxRef.current + 1) % LETTERS.length;
        letterRef.current.textContent = LETTERS[idxRef.current];
      }
    })
    .to(el, { opacity: 1, duration: 0.3 });

    // cleanup (also prevents StrictMode double-run issues)
    return () => tl.kill();
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading">Loading...</div>
      <div className="letter-box" ref={letterRef}>
        {LETTERS[0]}
      </div>
    </div>
  );
}
