'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  angle: number;
  innerDist: number;
  outerDist: number;
  maxOuterDist: number;
  velocity: number;
  strokeWidth: number;
  opacity: number;
  decay: number;
}

interface CenterDot {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  life: number;
}

export default function ClickSparkEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    const particles: Particle[] = [];
    const centerDots: CenterDot[] = [];

    // Resize canvas to match window device pixel ratio for super-crisp retina strokes
    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // The 8 hand-drawn angles matching user reference image media_1792145802973.png
    const baseAngles = [
      -2.36, // 1. Top-left (-135°)
      -1.48, // 2. Top (-85°)
      -0.56, // 3. Top-right (-32°)
      0.16,  // 4. Right short dash (+9°)
      0.96,  // 5. Bottom-right (+55°)
      1.72,  // 6. Bottom (+98°)
      2.58,  // 7. Bottom-left (+148°)
      3.05,  // 8. Left (~175°)
    ];

    // Cute, small, delicate hand-drawn stroke proportions
    const baseLengths = [5.6, 4.8, 5.0, 3.2, 5.0, 4.2, 5.2, 4.4];
    const baseWidths = [2.2, 1.8, 1.9, 1.6, 2.0, 1.7, 2.0, 1.8];

    // Spawn burst function
    const spawnSpark = (clientX: number, clientY: number) => {
      // Small random rotation for each click (-12° to +12°)
      const rot = (Math.random() * 24 - 12) * (Math.PI / 180);
      const scale = 0.82 + Math.random() * 0.18; // Compact, cute sizing

      // Add delicate center impact dot
      centerDots.push({
        x: clientX,
        y: clientY,
        radius: 1.4 * scale,
        opacity: 0.9,
        life: 1.0,
      });

      // Spawn the 8 outward radiating cute strokes
      for (let i = 0; i < 8; i++) {
        const angle = baseAngles[i] + rot;
        const length = baseLengths[i] * scale;
        const width = baseWidths[i] * scale;

        particles.push({
          x: clientX,
          y: clientY,
          angle,
          innerDist: 2.0 * scale,
          outerDist: (2.0 + length) * scale,
          maxOuterDist: (8.5 + length) * scale,
          velocity: (2.4 + Math.random() * 0.7) * scale,
          strokeWidth: width,
          opacity: 0.95,
          decay: 0.052 + Math.random() * 0.012, // Snappy, cute ~260ms duration
        });
      }

      // Start loop if not already running
      if (!animId) {
        animId = requestAnimationFrame(loop);
      }
    };

    // Render loop
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw and update center dots
      for (let i = centerDots.length - 1; i >= 0; i--) {
        const dot = centerDots[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 20, 19, ${Math.max(0, dot.opacity)})`;
        ctx.fill();
        ctx.restore();

        dot.opacity -= 0.16; // Disappears in ~80ms
        if (dot.opacity <= 0) {
          centerDots.splice(i, 1);
        }
      }

      // Draw and update radiating doodle strokes
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics motion: rays shoot outward and decelerate
        p.innerDist += p.velocity * 0.55;
        p.outerDist += p.velocity;
        p.velocity *= 0.88; // Physics friction / inertia
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.outerDist >= p.maxOuterDist * 1.5) {
          particles.splice(i, 1);
          continue;
        }

        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        const startX = p.x + cos * p.innerDist;
        const startY = p.y + sin * p.innerDist;
        const endX = p.x + cos * p.outerDist;
        const endY = p.y + sin * p.outerDist;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(20, 20, 19, ${Math.max(0, p.opacity)})`;
        ctx.lineWidth = Math.max(1, p.strokeWidth * (p.opacity > 0.4 ? 1 : p.opacity / 0.4));
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // Keep running if there are active particles, otherwise halt loop to preserve 0% CPU
      if (particles.length > 0 || centerDots.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    let lastClickTime = 0;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: MouseEvent | PointerEvent | TouchEvent) => {
      let clientX: number;
      let clientY: number;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const now = performance.now();
      // Deduplicate rapid touch/pointer cascades (within 25ms and 3px)
      if (now - lastClickTime < 25 && Math.abs(clientX - lastX) < 3 && Math.abs(clientY - lastY) < 3) {
        return;
      }
      lastClickTime = now;
      lastX = clientX;
      lastY = clientY;

      spawnSpark(clientX, clientY);
    };

    // Attach capture listeners on window and document so no child elements can swallow them
    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });
    window.addEventListener('touchstart', onPointerDown, { capture: true, passive: true });
    window.addEventListener('mousedown', onPointerDown, { capture: true, passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('touchstart', onPointerDown, { capture: true });
      window.removeEventListener('mousedown', onPointerDown, { capture: true });
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999999] select-none"
      aria-hidden="true"
    />
  );
}
