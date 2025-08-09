// src/components/Cursor.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const wrapRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const qx = useRef(null);
  const qy = useRef(null);

  const hoverTimer = useRef(null);
  const isOverCard = useRef(false);
  const overBtnCount = useRef(0); // support nested / quick enter-leave

  useEffect(() => {
    // Smooth follow
    qx.current = gsap.quickTo(wrapRef.current, 'x', { duration: 0.2, ease: 'power3' });
    qy.current = gsap.quickTo(wrapRef.current, 'y', { duration: 0.2, ease: 'power3' });

    const move = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      qx.current(pos.current.x);
      qy.current(pos.current.y);
    };
    window.addEventListener('mousemove', move);

    // ---- Card hover: delayed flip ----
    const onEnterCard = (e) => {
      if (e.target.closest('.card')) {
        isOverCard.current = true;
        hoverTimer.current = setTimeout(() => {
          if (isOverCard.current) flipTop();
        }, 1200);
      }
    };
    const onLeaveCard = (e) => {
      if (e.target.closest('.card')) {
        isOverCard.current = false;
        if (hoverTimer.current) {
          clearTimeout(hoverTimer.current);
          hoverTimer.current = null;
        }
      }
    };

    // ---- Button hover: grow/shrink immediately ----
    const BTN_SELECTOR = 'button, .btn, .instructions-btn, .controls button';
    const onEnterBtn = (e) => {
      if (e.target.closest(BTN_SELECTOR)) {
        overBtnCount.current += 1;
        grow();
      }
    };
    const onLeaveBtn = (e) => {
      if (e.target.closest(BTN_SELECTOR)) {
        overBtnCount.current = Math.max(0, overBtnCount.current - 1);
        if (overBtnCount.current === 0) shrink();
      }
    };

    document.addEventListener('mouseenter', onEnterCard, true);
    document.addEventListener('mouseleave', onLeaveCard, true);
    document.addEventListener('mouseenter', onEnterBtn,  true);
    document.addEventListener('mouseleave', onLeaveBtn,  true);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', onEnterCard, true);
      document.removeEventListener('mouseleave', onLeaveCard, true);
      document.removeEventListener('mouseenter', onEnterBtn,  true);
      document.removeEventListener('mouseleave', onLeaveBtn,  true);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const flipTop = () => {
    gsap.timeline()
      .to(topRef.current, {
        rotateY: 180,
        duration: 0.7,
        ease: 'power2.inOut',
        transformOrigin: '50% 50%',
      })
      .to(topRef.current, {
        rotateY: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        transformOrigin: '50% 50%',
      });
  };

  const grow = () => {
    gsap.to([topRef.current, bottomRef.current], {
      scale: 2,
      duration: 0.18,
      ease: 'power2.out',
    });
  };

  const shrink = () => {
    gsap.to([topRef.current, bottomRef.current], {
      scale: 1,
      duration: 0.18,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={wrapRef} className="cursor-wrap" aria-hidden="true">
      <div ref={bottomRef} className="cursor-circle cursor-bottom" />
      <div ref={topRef} className="cursor-circle cursor-top" />
    </div>
  );
}
