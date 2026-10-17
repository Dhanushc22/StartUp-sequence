'use client';

import React, { useEffect, useRef } from 'react';
import rawDots from './dots-data.json';

interface Dot {
  baseX: number;
  baseY: number;
  r: number;
  phaseX: number;
  phaseY: number;
  speed: number;
  ampX: number;
  ampY: number;
  currentX: number;
  currentY: number;
  vx: number;
  vy: number;
}

export default function AnimatedDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const PATTERN_W = 1024;
    const PATTERN_H = 118;

    let dots: Dot[] = [];

    // Mouse coordinates relative to hero section
    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, radius: 100 };

    function initDots() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(width / PATTERN_W) + 1;
      const rows = Math.ceil(height / PATTERN_H) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const offsetX = c * PATTERN_W;
          const offsetY = r * PATTERN_H;

          for (let i = 0; i < rawDots.length; i++) {
            const [x, y, radius] = rawDots[i];
            const px = offsetX + x;
            const py = offsetY + y;

            if (px <= width + 20 && py <= height + 20) {
              const seed = (c * 1000 + r * 100 + i) * 1.618;
              dots.push({
                baseX: px,
                baseY: py,
                r: radius,
                phaseX: seed % (Math.PI * 2),
                phaseY: (seed * 1.3) % (Math.PI * 2),
                speed: 0.0018 + ((seed * 7) % 10) * 0.00035, // organic varied floating speeds
                ampX: 4.5 + ((seed * 3) % 10) * 0.55,       // 4.5px - 10px subtle drift
                ampY: 4.0 + ((seed * 5) % 10) * 0.55,
                currentX: px,
                currentY: py,
                vx: 0,
                vy: 0,
              });
            }
          }
        }
      }
    }

    initDots();

    const handleResize = () => {
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let startTime = performance.now();

    function render(time: number) {
      if (!ctx || !canvas) return;

      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.fillStyle = '#171717';
      ctx.beginPath();

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Slight organic oscillation
        const targetX = dot.baseX + Math.sin(elapsed * dot.speed + dot.phaseX) * dot.ampX;
        const targetY = dot.baseY + Math.cos(elapsed * dot.speed + dot.phaseY) * dot.ampY;

        // Subtle interactive mouse repulsion
        const dx = mouse.x - dot.currentX;
        const dy = mouse.y - dot.currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 12;
          dot.vx -= (dx / dist) * force * 0.08;
          dot.vy -= (dy / dist) * force * 0.08;
        }

        dot.vx *= 0.92;
        dot.vy *= 0.92;

        dot.currentX += (targetX - dot.currentX) * 0.08 + dot.vx;
        dot.currentY += (targetY - dot.currentY) * 0.08 + dot.vy;

        // Draw dot circle
        ctx.moveTo(dot.currentX + dot.r, dot.currentY);
        ctx.arc(dot.currentX, dot.currentY, dot.r, 0, Math.PI * 2);
      }

      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none select-none w-full h-full opacity-75"
      aria-hidden="true"
    />
  );
}
