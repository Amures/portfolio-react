import { useEffect, useRef } from 'react';
import '../assets/styles/Ocean.css';

const PARTICLE_AREA = 26000; // one mote per this many CSS pixels
const MIN_PARTICLES = 18;
const MAX_PARTICLES = 70;
const TARGET_FPS = 30;
const POINTER_RADIUS = 190;

const random = (min, max) => min + Math.random() * (max - min);

/**
 * Ambient underwater layers behind the whole page: sunlight from the surface,
 * suspended particles drifting up past you, and a soft current that follows
 * the pointer.
 *
 * The particles are drawn on a canvas rather than animated in CSS. As two
 * transform-animated layers they cost a style recalculation on every frame,
 * whether or not the page was being scrolled and with or without a GPU
 * (measured: ~150 recalculations per scroll versus 1 with them removed).
 * A canvas updates a bitmap and touches no styles at all, and it makes the
 * motes able to actually respond to the cursor.
 */
export const Ocean = () => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const raysRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const rays = raysRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let lastDraw = 0;

    // Eased pointer position. The lag is what makes it read as water being
    // pushed rather than as something stuck to the cursor.
    let pointerTargetX = -9999;
    let pointerTargetY = -9999;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    const makeParticle = (seedY) => ({
      x: random(0, width),
      y: seedY ?? random(0, height),
      r: random(0.6, 2.1),
      rise: random(4, 14), // px per second
      drift: random(-0.35, 0.35),
      phase: random(0, Math.PI * 2),
      wobble: random(0.15, 0.5),
      alpha: random(0.18, 0.5),
      // Displacement from the cursor, eased back to zero.
      dx: 0,
      dy: 0,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Assigning canvas.width resets the whole 2D context state, so the
      // transform and the fill colour have to be set again after it, not before.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = 'rgb(196, 228, 255)';

      const count = Math.round(
        Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, (width * height) / PARTICLE_AREA)),
      );
      particles = Array.from({ length: count }, () => makeParticle());
    };

    const draw = (now) => {
      frame = requestAnimationFrame(draw);

      // Hand-rolled frame cap: these move at a few pixels a second, so
      // there is nothing to gain from redrawing 60 times a second.
      if (now - lastDraw < 1000 / TARGET_FPS) return;
      const dt = Math.min((now - lastDraw) / 1000, 0.1);
      lastDraw = now;

      pointerX += (pointerTargetX - pointerX) * 0.08;
      pointerY += (pointerTargetY - pointerY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += p.wobble * dt;
        p.y -= p.rise * dt;
        p.x += (p.drift + Math.sin(p.phase) * 0.4) * dt * 12;

        if (pointerActive) {
          const vx = p.x + p.dx - pointerX;
          const vy = p.y + p.dy - pointerY;
          const dist = Math.hypot(vx, vy);
          if (dist < POINTER_RADIUS && dist > 0.01) {
            // Push outward, strongest at the centre of the current.
            const push = (1 - dist / POINTER_RADIUS) ** 2 * 26;
            p.dx += (vx / dist) * push * dt;
            p.dy += (vy / dist) * push * dt;
          }
        }

        // Always relax back, so the water settles once the cursor leaves.
        p.dx *= 0.96;
        p.dy *= 0.96;

        if (p.y < -8) {
          Object.assign(p, makeParticle(height + 8));
        } else if (p.x < -20) {
          p.x = width + 20;
        } else if (p.x > width + 20) {
          p.x = -20;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x + p.dx, p.y + p.dy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (!frame) {
        lastDraw = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const onPointerMove = (event) => {
      pointerTargetX = event.clientX;
      pointerTargetY = event.clientY;
      if (!pointerActive) {
        pointerX = pointerTargetX;
        pointerY = pointerTargetY;
        pointerActive = true;
      }
      if (glow) {
        glow.classList.add('is-lit');
        glow.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (rays) {
        const driftX = (event.clientX / window.innerWidth - 0.5) * -44;
        const driftY = (event.clientY / window.innerHeight - 0.5) * -22;
        rays.style.transform = `translate3d(${driftX}px, ${driftY}px, 0)`;
      }
    };

    const onPointerLeave = () => {
      pointerActive = false;
      pointerTargetX = -9999;
      pointerTargetY = -9999;
      if (glow) glow.classList.remove('is-lit');
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 180);
    };

    const applyMotionPreference = () => {
      stop();
      resize();
      if (reduced.matches) {
        // Still render the motes, just frozen where they are.
        draw(performance.now());
        stop();
      } else {
        start();
      }
    };

    applyMotionPreference();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', applyMotionPreference);

    const wantsPointer = finePointer.matches && !reduced.matches;
    if (wantsPointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', applyMotionPreference);
      if (wantsPointer) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <div className="ocean" aria-hidden="true">
      <div ref={raysRef} className="ocean__rays" />
      <canvas ref={canvasRef} className="ocean__motes" />
      <div ref={glowRef} className="ocean__glow" />
    </div>
  );
};
