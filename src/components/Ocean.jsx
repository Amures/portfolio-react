import { useEffect, useRef } from 'react';
import '../assets/styles/Ocean.css';

const MOTE_AREA = 26000; // one mote per this many CSS pixels
const MIN_MOTES = 18;
const MAX_MOTES = 68;
const BUBBLE_COUNT = 9;
const SHAFT_COUNT = 7;
const CAUSTIC_COUNT = 10;
const TARGET_FPS = 30;
const POINTER_RADIUS = 120;

/*
  The shafts and caustics are rendered into a buffer at a quarter of the
  resolution and scaled up. They are nothing but soft gradients, so the
  upscale is invisible, and additively blending two dozen full-height sprites
  at full size cost ~0.18s of script per scroll versus ~0.04s this way.
*/
const LIGHT_SCALE = 4;

const random = (min, max) => min + Math.random() * (max - min);

/**
 * A soft round light, rendered once into an offscreen canvas. Building a
 * radial gradient is expensive; drawing a ready-made one is not, so every
 * light in the scene is this same sprite stretched and tinted.
 */
function makeGlowSprite(size, rgb, mid = 0.4) {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const c = sprite.getContext('2d');
  const half = size / 2;
  const grad = c.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, `rgba(${rgb}, 1)`);
  grad.addColorStop(mid, `rgba(${rgb}, 0.3)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  c.fillStyle = grad;
  c.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * The water: light shafts from the surface, caustics, suspended particles and
 * the occasional bubble, all on one canvas.
 *
 * Everything is depth-aware. The page is a descent, so how far down you have
 * scrolled decides how much surface light is left: the shafts and caustics are
 * gone by roughly a third of the way down, and the particles dim as the light
 * goes.
 *
 * It is a canvas rather than CSS layers because animated CSS layers cost a
 * style recalculation per frame whether or not the page is being scrolled and
 * with or without a GPU (measured: ~150 per scroll versus 1). A canvas updates
 * a bitmap and touches no styles. Capped at 30fps, paused when the tab is
 * hidden, frozen under prefers-reduced-motion.
 */
export const Ocean = () => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const shaftSprite = makeGlowSprite(128, '150, 214, 255', 0.5);
    const causticSprite = makeGlowSprite(96, '186, 236, 255', 0.35);
    const bubbleSprite = makeGlowSprite(48, '198, 232, 255', 0.62);

    const lightCanvas = document.createElement('canvas');
    const lightCtx = lightCanvas.getContext('2d');

    let width = 0;
    let height = 0;
    let lightW = 1;
    let lightH = 1;
    let maxScroll = 1;
    let motes = [];
    let bubbles = [];
    let shafts = [];
    let caustics = [];
    let frame = 0;
    let lastDraw = 0;
    let elapsed = 0;

    let pointerTargetX = -9999;
    let pointerTargetY = -9999;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    const makeMote = (seedY) => ({
      x: random(0, width),
      y: seedY ?? random(0, height),
      r: random(0.6, 2.1),
      rise: random(4, 14), // px per second
      drift: random(-0.35, 0.35),
      phase: random(0, Math.PI * 2),
      wobble: random(0.15, 0.5),
      alpha: random(0.18, 0.5),
      dx: 0,
      dy: 0,
    });

    const makeBubble = (seedY) => ({
      x: random(0, width),
      y: seedY ?? random(0, height),
      r: random(1.6, 4.4),
      rise: random(26, 62),
      phase: random(0, Math.PI * 2),
      wobble: random(0.8, 1.9),
      sway: random(6, 16),
      alpha: random(0.12, 0.3),
    });

    const build = () => {
      const moteCount = Math.round(
        Math.min(MAX_MOTES, Math.max(MIN_MOTES, (width * height) / MOTE_AREA)),
      );
      motes = Array.from({ length: moteCount }, () => makeMote());
      bubbles = Array.from({ length: BUBBLE_COUNT }, () => makeBubble());

      shafts = Array.from({ length: SHAFT_COUNT }, (_, i) => ({
        x: (i + random(0.15, 0.85)) * (width / SHAFT_COUNT),
        w: random(90, 260),
        h: random(0.75, 1.5), // multiples of viewport height
        tilt: random(-0.22, 0.16),
        alpha: random(0.05, 0.14),
        sway: random(14, 46),
        speed: random(0.05, 0.16),
        phase: random(0, Math.PI * 2),
      }));

      caustics = Array.from({ length: CAUSTIC_COUNT }, () => ({
        x: random(-0.1, 1.1),
        y: random(-0.02, 0.3),
        w: random(90, 300),
        h: random(18, 54),
        alpha: random(0.05, 0.13),
        speed: random(0.08, 0.26),
        phase: random(0, Math.PI * 2),
        sway: random(30, 110),
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Assigning canvas.width resets the whole 2D context state, so the
      // transform has to be reapplied after it, not before.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      lightW = Math.max(1, Math.ceil(width / LIGHT_SCALE));
      lightH = Math.max(1, Math.ceil(height / LIGHT_SCALE));
      lightCanvas.width = lightW;
      lightCanvas.height = lightH;

      // scrollHeight forces layout, so it is read here and not per frame.
      maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      build();
    };

    const draw = (now) => {
      frame = requestAnimationFrame(draw);

      // These move at a few pixels a second; redrawing 60 times a second
      // would buy nothing.
      if (now - lastDraw < 1000 / TARGET_FPS) return;
      const dt = Math.min((now - lastDraw) / 1000, 0.1);
      lastDraw = now;
      elapsed += dt;

      // How deep we are. scrollY is a cheap read; scrollHeight is not, which
      // is why maxScroll is cached.
      const depth = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const surface = Math.max(0, 1 - depth * 2.7); // sunlight is gone by ~37%
      const light = 1 - depth * 0.55;

      // The push point trails the cursor, so the water keeps moving for a
      // moment after you stop.
      pointerX += (pointerTargetX - pointerX) * 0.18;
      pointerY += (pointerTargetY - pointerY) * 0.18;

      ctx.clearRect(0, 0, width, height);

      // --- Light from above ---
      // Accumulated additively in the small buffer, then laid down once at
      // full size with ordinary alpha. One cheap composite instead of two
      // dozen expensive ones.
      if (surface > 0.01) {
        const k = 1 / LIGHT_SCALE;
        lightCtx.clearRect(0, 0, lightW, lightH);
        lightCtx.globalCompositeOperation = 'lighter';

        for (const s of shafts) {
          const sway = Math.sin(elapsed * s.speed + s.phase) * s.sway;
          lightCtx.globalAlpha = s.alpha * surface;
          lightCtx.save();
          lightCtx.translate((s.x + sway) * k, -height * 0.12 * k);
          lightCtx.rotate(s.tilt + Math.sin(elapsed * s.speed * 0.6 + s.phase) * 0.012);
          lightCtx.drawImage(shaftSprite, (-s.w / 2) * k, 0, s.w * k, height * s.h * k);
          lightCtx.restore();
        }

        for (const c of caustics) {
          const sway = Math.sin(elapsed * c.speed + c.phase) * c.sway;
          const pulse = 0.7 + Math.sin(elapsed * c.speed * 2.3 + c.phase) * 0.3;
          lightCtx.globalAlpha = c.alpha * surface * pulse;
          lightCtx.drawImage(
            causticSprite,
            (c.x * width + sway - c.w / 2) * k,
            (c.y * height - c.h / 2) * k,
            c.w * k,
            c.h * k,
          );
        }

        lightCtx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.drawImage(lightCanvas, 0, 0, width, height);
      }

      // --- Suspended particles ---
      ctx.fillStyle = 'rgb(196, 228, 255)';
      for (const p of motes) {
        p.phase += p.wobble * dt;
        p.y -= p.rise * dt;
        p.x += (p.drift + Math.sin(p.phase) * 0.4) * dt * 12;

        if (pointerActive) {
          const vx = p.x + p.dx - pointerX;
          const vy = p.y + p.dy - pointerY;
          const dist = Math.hypot(vx, vy);
          if (dist < POINTER_RADIUS && dist > 0.01) {
            const push = (1 - dist / POINTER_RADIUS) ** 2 * 26;
            p.dx += (vx / dist) * push * dt;
            p.dy += (vy / dist) * push * dt;
          }
        }

        // Always relax back, so the water settles once the cursor leaves.
        p.dx *= 0.96;
        p.dy *= 0.96;

        if (p.y < -8) Object.assign(p, makeMote(height + 8));
        else if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        ctx.globalAlpha = p.alpha * light;
        ctx.beginPath();
        ctx.arc(p.x + p.dx, p.y + p.dy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Bubbles: bigger, faster, and they wander on the way up ---
      for (const b of bubbles) {
        b.phase += b.wobble * dt;
        b.y -= b.rise * dt;
        if (b.y < -10) Object.assign(b, makeBubble(height + 10));

        const x = b.x + Math.sin(b.phase) * b.sway;
        ctx.globalAlpha = b.alpha * light;
        ctx.drawImage(bubbleSprite, x - b.r * 2, b.y - b.r * 2, b.r * 4, b.r * 4);
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
      // The glow eases via a CSS transition, so this stays one style write
      // per pointer event. The canvas easing happens in draw().
      if (glow) {
        glow.classList.add('is-lit');
        glow.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
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
        // Render the water once and leave it still.
        lastDraw = performance.now() - 1000;
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
      <canvas ref={canvasRef} className="ocean__water" />
      <div ref={glowRef} className="ocean__glow" />
    </div>
  );
};
