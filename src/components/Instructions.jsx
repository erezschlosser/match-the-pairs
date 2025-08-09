import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Instructions.css';

const TEXT = `Match pairs of Hiragana with their Romaji. Click two cards to flip them. 
If they match, they stay revealed. Try to finish with as few attempts as possible.`

export default function Instructions() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const contentRef = useRef(null);

  // Create words as spans once
  const words = TEXT.split(' ').map((w, i) => (
    <span className="instr-word" key={i}>{w}&nbsp;</span>
  ));

  useLayoutEffect(() => {
    if (!wrapRef.current || !contentRef.current) return;

    if (open) {
      // Expand container to fit content, then animate words
      const tl = gsap.timeline();
      tl.set(wrapRef.current, { display: 'block' })
        .fromTo(
          wrapRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
        )
        .fromTo(
          contentRef.current.querySelectorAll('.instr-word'),
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: 'power2.out' },
          '-=0.1'
        );
    } else {
      // Collapse
      gsap.to(wrapRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(wrapRef.current, { display: 'none' }),
      });
    }
  }, [open]);

  return (
    <div className="instructions">
      <button
        className="instructions-btn"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="instructions-panel"
      >
        INSTRUCTIONS
      </button>

      <div
        id="instructions-panel"
        className="instructions-panel"
        ref={wrapRef}
        role="region"
        aria-hidden={!open}
      >
        <div ref={contentRef} className="instructions-content">
          {words}
        </div>
      </div>
    </div>
  );
}
