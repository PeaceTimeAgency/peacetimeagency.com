'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ── Nano Banana 2 Noise Engine ──────────────────────────────────────────────
function smoothstepN(t: number): number {
  // normalized [0,1] → [0,1] smoothstep (no clamping needed at call sites)
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function hash2(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const a = hash2(ix, iy),     b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  const sx = smoothstepN(fx), sy = smoothstepN(fy);
  return lerp(lerp(a, b, sx), lerp(c, d, sx), sy);
}
function fbm(x: number, y: number, octaves = 6): number {
  let val = 0, amp = 0.5, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    val += valueNoise(x * freq, y * freq) * amp;
    max += amp; amp *= 0.5; freq *= 2.1;
  }
  return val / max;
}

// ── Particle System ─────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; alphaDir: number; hue: number;
}
function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.35 - 0.1,
    size: Math.random() * 2.2 + 0.4,
    alpha: Math.random() * 0.6 + 0.1,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    hue: Math.random() > 0.65 ? 350 + Math.random() * 20 : 260 + Math.random() * 30,
  };
}

// ── Main Canvas Renderer ─────────────────────────────────────────────────────
function useHeroCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rafRef        = useRef<number>(0);
  const particlesRef  = useRef<Particle[]>([]);
  const mouseRef      = useRef({ x: 0.5, y: 0.5 });

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h);

    // ── 1. Sky ──────────────────────────────────────────────────────────────
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.72);
    sky.addColorStop(0,    '#01020A');
    sky.addColorStop(0.28, '#040916');
    sky.addColorStop(0.55, '#0B1830');
    sky.addColorStop(0.78, '#12233D');
    sky.addColorStop(1,    '#1A3060');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // ── 2. Horizon Glow ─────────────────────────────────────────────────────
    const horizonY = h * 0.58;
    const hGlow = ctx.createRadialGradient(w * 0.5, horizonY, 0, w * 0.5, horizonY, w * 0.75);
    hGlow.addColorStop(0,   'rgba(255,60,95,0.22)');
    hGlow.addColorStop(0.3, 'rgba(160,100,255,0.11)');
    hGlow.addColorStop(0.7, 'rgba(30,60,120,0.06)');
    hGlow.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = hGlow;
    ctx.fillRect(0, 0, w, h);

    // ── 3. God Rays ─────────────────────────────────────────────────────────
    const rayOriginX = w * (0.5 + (mouseRef.current.x - 0.5) * 0.08);
    const rayOriginY = -h * 0.05;
    const rayCount   = 9;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < rayCount; i++) {
      const spread  = 0.55;
      const angle   = (-spread / 2) + (spread / (rayCount - 1)) * i;
      const endX    = rayOriginX + Math.sin(angle) * w * 1.4;
      const endY    = horizonY + h * 0.22;
      const opacity = (0.025 + Math.sin(t * 0.0004 + i) * 0.008) * (i === 4 ? 1.6 : 1);
      const rayWidth = (80 + i * 12) * (w / 1400);

      const rayGrad = ctx.createLinearGradient(rayOriginX, rayOriginY, endX, endY);
      rayGrad.addColorStop(0,   `rgba(255,220,180,${Math.min(1, opacity * 2)})`);
      rayGrad.addColorStop(0.5, `rgba(255,180,140,${Math.min(1, opacity)})`);
      rayGrad.addColorStop(1,   'rgba(255,150,120,0)');

      ctx.beginPath();
      ctx.moveTo(rayOriginX - rayWidth * 0.15, rayOriginY);
      ctx.lineTo(rayOriginX + rayWidth * 0.15, rayOriginY);
      ctx.lineTo(endX + rayWidth * 0.8, endY);
      ctx.lineTo(endX - rayWidth * 0.8, endY);
      ctx.closePath();
      ctx.fillStyle = rayGrad;
      ctx.fill();
    }
    ctx.restore(); // restores composite op to source-over + other state

    // ── 4. Terrain Layers (UE5.5 Multi-Pass) ────────────────────────────────
    const terrainLayers = [
      { yB: 0.90, yS: 0.35, nS: 0.9, nO: 80.0, c: ['#0A1220', '#080E1A'] as const, a: 1.0  },
      { yB: 0.83, yS: 0.28, nS: 1.4, nO: 50.0, c: ['#111D30', '#0D1726'] as const, a: 0.97 },
      { yB: 0.75, yS: 0.26, nS: 1.9, nO: 20.5, c: ['#1A2E48', '#152440'] as const, a: 0.90 },
      { yB: 0.68, yS: 0.22, nS: 2.8, nO: 10.0, c: ['#223558', '#1C2C4A'] as const, a: 0.82 },
      { yB: 0.61, yS: 0.16, nS: 3.8, nO: 0.5,  c: ['#2B405E', '#223550'] as const, a: 0.60 },
    ];

    const driftX  = (mouseRef.current.x - 0.5) * 28;
    const driftY  = (mouseRef.current.y - 0.5) * 12;
    const timeSlow = t * 0.00005;

    terrainLayers.forEach((layer, li) => {
      const pts    = Math.ceil(w / 2) + 2;
      const baseY  = h * layer.yB;
      const scaleY = h * layer.yS;
      const noise  = layer.nS;
      const nOff   = layer.nO;
      const pFactor = (terrainLayers.length - li) * 0.018;

      // Helper to compute terrain Y for a given screen X
      const terrainY = (px: number) => {
        const nx = (px / w) * noise + nOff + timeSlow * (1 + li * 0.3) + driftX * pFactor * 0.01;
        const ny = nOff * 0.3 + timeSlow * 0.5;
        return baseY - fbm(nx, ny, 6) * scaleY + driftY * pFactor;
      };

      // Fill terrain polygon
      ctx.beginPath();
      ctx.moveTo(-2, terrainY(0));
      for (let xi = 0; xi <= pts; xi++) {
        const px = (xi / pts) * w;
        ctx.lineTo(px, terrainY(px));
      }
      ctx.lineTo(w + 2, h);
      ctx.lineTo(-2, h);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - scaleY, 0, h);
      grad.addColorStop(0, layer.c[0]);
      grad.addColorStop(1, layer.c[1]);
      ctx.fillStyle = grad;
      ctx.globalAlpha = layer.a;
      ctx.fill();

      // Ridge shimmer: Nano Banana 2 material highlight (distance layers only)
      if (li >= 2) {
        ctx.beginPath();
        ctx.moveTo(-2, terrainY(0));
        for (let xi2 = 0; xi2 <= pts; xi2++) {
          const px = (xi2 / pts) * w;
          ctx.lineTo(px, terrainY(px));
        }

        // Clamp gradient color stop to [0,1]
        const shimStop = Math.max(0, Math.min(1, 0.3 + Math.sin(t * 0.0006 + li) * 0.15));
        const shimGrad = ctx.createLinearGradient(0, 0, w, 0);
        shimGrad.addColorStop(0,         'rgba(255,60,95,0)');
        shimGrad.addColorStop(shimStop,  `rgba(255,100,140,${0.06 + li * 0.018})`);
        shimGrad.addColorStop(Math.min(1, shimStop + 0.3), `rgba(167,139,250,${0.04 + li * 0.01})`);
        shimGrad.addColorStop(1,         'rgba(167,139,250,0)');

        ctx.strokeStyle = shimGrad;
        ctx.lineWidth   = 1.2 + li * 0.4;
        ctx.globalAlpha = 0.7;
        ctx.globalCompositeOperation = 'screen';
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
      }
    });
    ctx.globalAlpha = 1;

    // ── 5. Ground Fog Bands ──────────────────────────────────────────────────
    const fogY = h * 0.60;
    for (let fi = 0; fi < 5; fi++) {
      const fogAlpha = Math.max(0, (0.13 - fi * 0.02) * (1 + (mouseRef.current.y - 0.5) * 0.2));
      const fGrad = ctx.createLinearGradient(0, fogY + fi * h * 0.04, 0, fogY + (fi + 1) * h * 0.055);
      fGrad.addColorStop(0,   `rgba(30,50,100,${fogAlpha})`);
      fGrad.addColorStop(0.5, `rgba(20,35,80,${fogAlpha * 0.6})`);
      fGrad.addColorStop(1,   'rgba(10,20,50,0)');
      ctx.fillStyle = fGrad;
      ctx.fillRect(0, fogY + fi * h * 0.04, w, h * 0.06);
    }

    // ── 6. Particle Field ────────────────────────────────────────────────────
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    particlesRef.current.forEach((p) => {
      // update
      p.x += p.vx + (mouseRef.current.x - 0.5) * 0.15;
      p.y += p.vy;
      p.alpha += p.alphaDir * 0.005;
      if (p.alpha >= 0.75 || p.alpha <= 0.05) p.alphaDir *= -1;
      // respawn if out of bounds
      if (p.y < -10 || p.x < -20 || p.x > w + 20) {
        Object.assign(p, createParticle(w, h));
        p.y = h * 0.5 + Math.random() * h * 0.5;
      }
      // draw
      const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
      pGlow.addColorStop(0,   `hsla(${p.hue},90%,75%,${p.alpha})`);
      pGlow.addColorStop(0.4, `hsla(${p.hue},80%,60%,${p.alpha * 0.4})`);
      pGlow.addColorStop(1,   `hsla(${p.hue},70%,50%,0)`);
      ctx.fillStyle = pGlow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // ── 7. Vignette ──────────────────────────────────────────────────────────
    const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.1, w * 0.5, h * 0.5, w * 0.75);
    vig.addColorStop(0,   'rgba(0,0,0,0)');
    vig.addColorStop(0.6, 'rgba(0,0,0,0.12)');
    vig.addColorStop(1,   'rgba(0,0,0,0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);

    // ── 8. Scanlines ─────────────────────────────────────────────────────────
    ctx.globalAlpha = 0.025;
    ctx.fillStyle   = '#000';
    for (let y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 1);
    }
    ctx.globalAlpha = 1;

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;

      // Reset transform BEFORE setting dimensions to avoid DPR accumulation
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Re-init particles
      particlesRef.current = Array.from({ length: 220 }, () => createParticle(w, h));
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top)  / rect.height)),
      };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);

    let startTime: number | null = null;
    const loop = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      draw(ctx, w, h, elapsed);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [draw, canvasRef]);
}

// ── Fade-up animation variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// ── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: '250+',  label: 'Active Creators'  },
  { value: '$45M+', label: 'Network Revenue'  },
  { value: '99.9%', label: 'Uptime'           },
  { value: 'Top 1%',label: 'TikTok Agencies'  },
];

import { Hero3DObject } from "@/components/Hero3DObject";

// ── Hero Component ───────────────────────────────────────────────────────────
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useHeroCanvas(canvasRef);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#01020A] pt-20"
      style={{ isolation: 'isolate' }}
    >
      {/* ── 3D Visual Layer ────────────────────────────────────── */}
      <Hero3DObject />
      {/* ── UE5.5 Canvas Layer ─────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
        aria-hidden="true"
      />

      {/* ── Cinematic Letterbox Bars ───────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[3.5%] bg-black/85 z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[3.5%] bg-black/85 z-10 pointer-events-none" />

      {/* ── UE5 Corner HUD: Top Left ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="absolute top-[4.5%] left-6 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/30 tracking-[0.18em] uppercase">
          <span className="w-1 h-1 rounded-full bg-primary/60 animate-pulse inline-block" />
          CINEMATIC · UE 5.5 NANITE
        </div>
        <div className="mt-1 text-[9px] font-mono text-white/20 tracking-[0.12em]">
          ENV_HERO · LUMEN · LODS_HIGH
        </div>
      </motion.div>

      {/* ── UE5 Corner HUD: Top Right ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.3 }}
        className="absolute top-[4.5%] right-6 z-20 pointer-events-none text-right"
        aria-hidden="true"
      >
        <div className="font-mono text-[10px] text-white/25 tracking-[0.14em] uppercase">
          FRAME · REALTIME
        </div>
        <div className="mt-1 text-[9px] font-mono text-primary/40 tracking-[0.1em]">
          RES 4K · ULTRA
        </div>
      </motion.div>

      {/* ── UE5 Corner HUD: Bottom Left ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.5 }}
        className="absolute bottom-[5%] left-6 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="font-mono text-[9px] text-white/20 tracking-[0.1em] uppercase">
          PEACETIMEAGENCY.IO · BLACK LABEL
        </div>
      </motion.div>

      {/* ── Cinematic Scan Lines ────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
        className="absolute top-[4.2%] inset-x-0 h-px origin-left z-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,60,95,0.35) 30%, rgba(167,139,250,0.25) 70%, transparent 100%)' }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
        className="absolute bottom-[4.2%] inset-x-0 h-px origin-right z-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.25) 30%, rgba(255,60,95,0.35) 70%, transparent 100%)' }}
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center space-y-7 px-4 md:px-6">

        {/* Live badge */}
        <motion.div
          custom={0} initial="hidden" animate="show" variants={fadeUp}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold tracking-[0.22em] uppercase"
          style={{
            background:  'linear-gradient(135deg, rgba(255,60,95,0.12) 0%, rgba(167,139,250,0.08) 100%)',
            border:      '1px solid rgba(255,60,95,0.28)',
            boxShadow:   '0 0 24px rgba(255,60,95,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
              style={{ animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite' }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span
            style={{
              background:            'linear-gradient(90deg, #FF3C5F 0%, #FF8FA3 50%, #A78BFA 100%)',
              WebkitBackgroundClip:  'text',
              WebkitTextFillColor:   'transparent',
              backgroundClip:        'text',
            }}
          >
            Creator-First · Platform-Official
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} initial="hidden" animate="show" variants={fadeUp}
          className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.93]"
        >
          <span
            style={{
              background:           'linear-gradient(180deg, #FFFFFF 0%, rgba(210,225,255,0.82) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
            }}
          >
            The #1 TikTok LIVE
          </span>
          <br />
          <span
            style={{
              background:           'linear-gradient(135deg, #FF3C5F 0%, #FF7A8A 40%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              backgroundClip:       'text',
              filter:               'drop-shadow(0 0 32px rgba(255,60,95,0.45))',
            }}
          >
            Creator Agency.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2} initial="hidden" animate="show" variants={fadeUp}
          className="mx-auto max-w-xl text-base sm:text-lg text-white/50 leading-relaxed"
        >
          We provide the infrastructure, strategy, and community to help you grow on your own terms.{' '}
          <span className="text-white/70">No quotas. No pressure. No predatory contracts.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} initial="hidden" animate="show" variants={fadeUp}
          className="flex flex-col gap-4 sm:flex-row items-center justify-center pt-1 w-full"
        >
          {/* Primary CTA */}
          <button
            className="group relative inline-flex items-center justify-center h-[52px] px-8 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300"
            style={{
              background:  'linear-gradient(135deg, #FF3C5F 0%, #E0244C 100%)',
              boxShadow:   '0 0 0 1px rgba(255,60,95,0.4), 0 4px 24px rgba(255,60,95,0.3)',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,60,95,0.6), 0 8px 40px rgba(255,60,95,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,60,95,0.4), 0 4px 24px rgba(255,60,95,0.3)')}
          >
            <span className="relative z-10 tracking-wide">Join the Roster</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3C5F] to-[#FF8FA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Secondary CTA */}
          <button
            className="group inline-flex items-center justify-center h-[52px] px-8 rounded-xl font-semibold text-sm gap-2 transition-all duration-300"
            style={{
              background:     'rgba(255,255,255,0.035)',
              border:         '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              color:          'rgba(255,255,255,0.75)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <span className="group-hover:text-white transition-colors">View Creators</span>
            {/* Fixed: single transition class, removed duplicate */}
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-all"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          custom={5} initial="hidden" animate="show" variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 mt-14 w-full max-w-3xl rounded-2xl overflow-hidden"
          style={{
            background:     'linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(24px)',
            border:         '1px solid rgba(255,255,255,0.075)',
            boxShadow:      '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group flex flex-col items-center justify-center py-7 px-4 cursor-default transition-all duration-300 hover:bg-white/[0.03]"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderTop:   i >= 2               ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span
                className="text-2xl md:text-3xl font-black transition-all duration-300"
                style={{
                  background:           'linear-gradient(135deg, #FFFFFF 30%, rgba(167,139,250,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                  filter:               'drop-shadow(0 0 12px rgba(255,255,255,0.15))',
                }}
              >
                {s.value}
              </span>
              <span className="text-[10px] mt-1.5 font-semibold text-white/30 uppercase tracking-[0.18em] group-hover:text-white/50 transition-colors">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Bottom terrain fade → page ──────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to top, #01020A 0%, transparent 100%)' }}
      />
    </section>
  );
}
