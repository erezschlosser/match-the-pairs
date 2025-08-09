// src/components/Cursor.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const wrapRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const qx = useRef(null);
  const qy = useRef(null);

  const hoverTimer = useRef(null);
  const isOverCard = useRef(false);
  const overBtnCount = useRef(0);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    // Smooth follow
    qx.current = gsap.quickTo(wrapRef.current, 'x', { duration: 0.2, ease: 'power3' });
    qy.current = gsap.quickTo(wrapRef.current, 'y', { duration: 0.2, ease: 'power3' });

    const move = (e) => {
      qx.current(e.clientX);
      qy.current(e.clientY);
    };
    window.addEventListener('mousemove', move);

    // Helper: get an Element from event target (guards text nodes/SVG)
    const getElem = (e) => {
      const path = e.composedPath && e.composedPath();
      let t = (path && path[0]) || e.target;
      if (!(t instanceof Element)) t = t?.parentElement || null;
      return t;
    };

    // ---- Card hover: delayed flip ----
    const onEnterCard = (e) => {
      const el = getElem(e);
      if (el && el.closest('.card')) {
        isOverCard.current = true;
        hoverTimer.current = setTimeout(() => {
          if (isOverCard.current) flipTop();
        }, 1200);
      }
    };

    const onLeaveCard = (e) => {
      const el = getElem(e);
      if (el && el.closest('.card')) {
        isOverCard.current = false;
        if (hoverTimer.current) {
          clearTimeout(hoverTimer.current);
          hoverTimer.current = null;
        }
      }
    };

    // ---- Button hover: grow/shrink ----
    const BTN_SELECTOR = 'button, .btn, .instructions-btn, .controls button';
    const onEnterBtn = (e) => {
      const el = getElem(e);
      if (el && el.closest(BTN_SELECTOR)) {
        overBtnCount.current += 1;
        grow();
      }
    };

    const onLeaveBtn = (e) => {
      const el = getElem(e);
      if (el && el.closest(BTN_SELECTOR)) {
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
      scale: 1.5,            
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
