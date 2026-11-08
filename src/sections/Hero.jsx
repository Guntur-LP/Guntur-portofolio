import { useState, useEffect, useRef, useCallback } from "react";
import { profile } from "../data/profile";

const ROLES = ["DEVELOPER", "DESIGNER"];
const LINE_1 = "GUNTUR".split("");
const LINE_2 = "LISTYO".split("");

// Hero assets
const PORTRAIT_WEBP = "../images/Hero/Hero2.webp";

// Padding around portrait container so dust particles can drift freely into the Hero space
const PAD_LEFT = 70;
const PAD_RIGHT = 170;
const PAD_TOP = 110;

// CTA Arrow Icon
function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// CV / Resume Icon
function CvIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const snapDataRef = useRef(null);

  const animStateRef = useRef({
    progress: 0,
    startProgress: 0,
    targetProgress: 0,
    startTime: 0,
    duration: 1600,
    isAnimating: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 150);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timer);
    };
  }, []);

  // Build Thanos Snap pixel & dust particle buffers from the portrait image
  const buildSnapBuffers = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!container || !img || !canvas || !img.complete || !img.naturalWidth) {
      return null;
    }

    const rect = container.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;
    if (cw <= 0 || ch <= 0) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cssW = cw + PAD_LEFT + PAD_RIGHT;
    const cssH = ch + PAD_TOP;

    const canvasW = Math.round(cssW * dpr);
    const canvasH = Math.round(cssH * dpr);

    canvas.width = canvasW;
    canvas.height = canvasH;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const padL = Math.round(PAD_LEFT * dpr);
    const padT = Math.round(PAD_TOP * dpr);
    const pw = Math.round(cw * dpr);
    const ph = Math.round(ch * dpr);

    // Draw image with exact object-cover + object-bottom alignment at native device pixel ratio
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(pw / imgW, ph / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const offsetX = padL + (pw - drawW) / 2;
    const offsetY = padT + (ph - drawH);

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.beginPath();
    ctx.rect(padL, padT, pw, ph);
    ctx.clip();
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    const srcImageData = ctx.getImageData(0, 0, canvasW, canvasH);
    const srcPixels = srcImageData.data;
    const srcUint32 = new Uint32Array(srcImageData.data.buffer);
    ctx.clearRect(0, 0, canvasW, canvasH);

    // First pass: count solid pixels and dust particles
    let solidCount = 0;
    let particleCount = 0;
    const pStep = Math.max(2, Math.round(2 * dpr));

    for (let y = padT; y < padT + ph; y++) {
      const rowOffset = y * canvasW;
      const isPRow = (y - padT) % pStep === 0;
      for (let x = padL; x < padL + pw; x++) {
        const idx = rowOffset + x;
        const alpha = srcPixels[idx * 4 + 3];
        if (alpha > 16) {
          solidCount++;
          if (isPRow && (x - padL) % pStep === 0) {
            particleCount++;
          }
        }
      }
    }

    // Typed arrays for fast 60fps rendering
    const solidIdx = new Int32Array(solidCount);
    const solidColor = new Uint32Array(solidCount);
    const solidThresh = new Float32Array(solidCount);

    const pOrigX = new Float32Array(particleCount);
    const pOrigY = new Float32Array(particleCount);
    const pThresh = new Float32Array(particleCount);
    const pInvSpan = new Float32Array(particleCount);
    const pVx = new Float32Array(particleCount);
    const pVy = new Float32Array(particleCount);
    const pLift = new Float32Array(particleCount);
    const pFreq = new Float32Array(particleCount);
    const pSway = new Float32Array(particleCount);
    const pPhase = new Float32Array(particleCount);
    const pR = new Uint8Array(particleCount);
    const pG = new Uint8Array(particleCount);
    const pB = new Uint8Array(particleCount);
    const pA = new Uint8Array(particleCount);
    const pSize = new Uint8Array(particleCount);

    let sPtr = 0;
    let pPtr = 0;

    for (let y = padT; y < padT + ph; y++) {
      const ny = (y - padT) / ph;
      const rowOffset = y * canvasW;
      const isPRow = (y - padT) % pStep === 0;

      for (let x = padL; x < padL + pw; x++) {
        const idx = rowOffset + x;
        const p4 = idx * 4;
        const a = srcPixels[p4 + 3];
        if (a <= 16) continue;

        const nx = (x - padL) / pw;

        // Organic multi-wave disintegration front sweeping from top-left to bottom-right
        const wave =
          Math.sin(nx * 10.0 + ny * 6.5) * 0.055 +
          Math.cos(nx * 19.0 - ny * 15.0) * 0.035 +
          Math.sin((nx + ny) * 34.0) * 0.025;
        const grain = (Math.random() - 0.5) * 0.05;
        const thresh = Math.max(
          0.01,
          Math.min(0.56, nx * 0.25 + ny * 0.28 + wave + 0.06 + grain)
        );

        solidIdx[sPtr] = idx;
        solidColor[sPtr] = srcUint32[idx];
        solidThresh[sPtr] = thresh;
        sPtr++;

        // Spawn dust particle on 2x2 CSS grid
        if (isPRow && (x - padL) % pStep === 0) {
          pOrigX[pPtr] = x;
          pOrigY[pPtr] = y;
          pThresh[pPtr] = thresh;
          const span = 0.42 + Math.random() * 0.04;
          pInvSpan[pPtr] = 1 / span;

          // Wind trajectory: drifts right and lifts upward like ash in the wind
          const angle = -0.45 + (Math.random() - 0.5) * 0.7;
          const speed = (55 + Math.random() * 115) * dpr;
          pVx[pPtr] = Math.cos(angle) * speed + 25 * dpr;
          pVy[pPtr] = Math.sin(angle) * speed;
          pLift[pPtr] = (20 + Math.random() * 65) * dpr;
          pFreq[pPtr] = 5 + Math.random() * 8;
          pSway[pPtr] = (6 + Math.random() * 18) * dpr;
          pPhase[pPtr] = Math.random() * Math.PI * 2;

          // Warm dust tint blended with original pixel color
          const r = srcPixels[p4];
          const g = srcPixels[p4 + 1];
          const b = srcPixels[p4 + 2];
          pR[pPtr] = r;
          pG[pPtr] = g;
          pB[pPtr] = b;
          pA[pPtr] = a;
          const baseSize = Math.random() > 0.42 ? 2 : 1;
          pSize[pPtr] = Math.max(1, Math.round(baseSize * dpr));
          pPtr++;
        }
      }
    }

    const outImageData = ctx.createImageData(canvasW, canvasH);
    const outUint32 = new Uint32Array(outImageData.data.buffer);

    const data = {
      ctx,
      canvasW,
      canvasH,
      outImageData,
      outUint32,
      solidCount,
      solidIdx,
      solidColor,
      solidThresh,
      particleCount,
      pOrigX,
      pOrigY,
      pThresh,
      pInvSpan,
      pVx,
      pVy,
      pLift,
      pFreq,
      pSway,
      pPhase,
      pR,
      pG,
      pB,
      pA,
      pSize,
    };

    snapDataRef.current = data;
    return data;
  }, []);

  // Render a single frame at given progress [0..1]
  const renderSnapFrame = useCallback((progress) => {
    const d = snapDataRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!d || !canvas || !img) return;

    if (progress <= 0.001) {
      canvas.style.opacity = "0";
      img.style.opacity = "1";
      return;
    }

    canvas.style.opacity = "1";
    img.style.opacity = "0";

    const {
      ctx,
      canvasW,
      canvasH,
      outImageData,
      outUint32,
      solidCount,
      solidIdx,
      solidColor,
      solidThresh,
      particleCount,
      pOrigX,
      pOrigY,
      pThresh,
      pInvSpan,
      pVx,
      pVy,
      pLift,
      pFreq,
      pSway,
      pPhase,
      pR,
      pG,
      pB,
      pA,
      pSize,
    } = d;

    outUint32.fill(0);

    // 1. Draw intact portrait pixels that haven't crossed the disintegration wave yet
    for (let i = 0; i < solidCount; i++) {
      if (progress <= solidThresh[i]) {
        outUint32[solidIdx[i]] = solidColor[i];
      }
    }

    // 2. Draw flying dust particles
    const maxW = canvasW - 4;
    const maxH = canvasH - 4;

    for (let i = 0; i < particleCount; i++) {
      const th = pThresh[i];
      if (progress > th) {
        const localT = (progress - th) * pInvSpan[i];
        if (localT < 1) {
          const drift = localT * localT;
          const ease = localT * (1.4 - 0.4 * localT);
          const swayOffset =
            Math.sin(localT * pFreq[i] + pPhase[i]) * pSway[i] * localT;

          const px = (pOrigX[i] + pVx[i] * drift + swayOffset) | 0;
          const py = (pOrigY[i] + pVy[i] * drift - pLift[i] * ease) | 0;

          if (px >= 0 && px < maxW && py >= 0 && py < maxH) {
            const fade = 1 - drift;
            const alpha = (pA[i] * fade) | 0;
            if (alpha > 10) {
              // Subtle warm ash shift as particle disintegrates
              const ashMix = localT * 0.28;
              const r = (pR[i] * (1 - ashMix) + 195 * ashMix) | 0;
              const g = (pG[i] * (1 - ashMix) + 165 * ashMix) | 0;
              const b = (pB[i] * (1 - ashMix) + 135 * ashMix) | 0;

              const color32 = (alpha << 24) | (b << 16) | (g << 8) | r;
              const outIdx = py * canvasW + px;
              outUint32[outIdx] = color32;

              const sz = pSize[i];
              if (sz >= 2) {
                outUint32[outIdx + 1] = color32;
                outUint32[outIdx + canvasW] = color32;
                if (sz >= 3) {
                  outUint32[outIdx + canvasW + 1] = color32;
                  outUint32[outIdx + 2] = color32;
                  outUint32[outIdx + (canvasW << 1)] = color32;
                }
              }
            }
          }
        }
      }
    }

    ctx.putImageData(outImageData, 0, 0);
  }, []);

  const animateSnap = useCallback(
    (targetProgress, duration) => {
      const isDesktopPointer = window.matchMedia(
        "(pointer: fine) and (min-width: 769px)"
      ).matches;
      if (!isDesktopPointer || isReducedMotion) return;

      if (!snapDataRef.current) {
        buildSnapBuffers();
      }
      if (!snapDataRef.current) return;

      const s = animStateRef.current;
      s.startProgress = s.progress;
      s.targetProgress = targetProgress;
      s.startTime = performance.now();
      // Scale duration proportionally to remaining distance
      const distance = Math.abs(targetProgress - s.startProgress);
      s.duration = Math.max(300, duration * distance);

      if (!s.isAnimating) {
        s.isAnimating = true;

        const step = (now) => {
          const elapsed = now - s.startTime;
          const t = Math.min(1, elapsed / s.duration);
          // Smooth cubic ease-in-out
          const eased =
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          s.progress =
            s.startProgress + (s.targetProgress - s.startProgress) * eased;

          renderSnapFrame(s.progress);

          if (t < 1) {
            animFrameRef.current = requestAnimationFrame(step);
          } else {
            s.isAnimating = false;
            s.progress = s.targetProgress;
            renderSnapFrame(s.progress);
          }
        };

        animFrameRef.current = requestAnimationFrame(step);
      }
    },
    [isReducedMotion, buildSnapBuffers, renderSnapFrame]
  );

  const handleMouseEnter = () => {
    animateSnap(1, 1650);
  };

  const handleMouseLeave = () => {
    animateSnap(0, 1100);
  };

  // Rebuild buffers on window resize
  useEffect(() => {
    const handleResize = () => {
      snapDataRef.current = null;
      const s = animStateRef.current;
      s.progress = 0;
      s.targetProgress = 0;
      if (canvasRef.current && imgRef.current) {
        canvasRef.current.style.opacity = "0";
        imgRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex flex-col min-h-svh w-full overflow-hidden select-none"
      style={{
        background: "var(--gradient-sky)",
      }}
    >
      {/* Layer 1A: Mobile Top Row (Role Labels placed strictly at top on mobile) */}
      <div className="md:hidden relative z-20 w-full px-(--gutter) pt-[clamp(5.5rem,11vh,7.5rem)] flex flex-col items-start">
        <div className="flex flex-col">
          {ROLES.map((role, idx) => (
            <div key={`mob-${role}`} className="overflow-hidden">
              <div
                className="founder-role-text text-[1.75rem] transition-transform will-change-transform"
                style={{
                  transform:
                    isRevealed || isReducedMotion
                      ? "translateY(0)"
                      : "translateY(110%)",
                  transitionDuration: isReducedMotion ? "0ms" : "760ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isReducedMotion
                    ? "0ms"
                    : `${150 + idx * 80}ms`,
                }}
              >
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 1B: Desktop Centered Content (Role Labels + Copy + CTAs centered on Y-axis) */}
      <div className="hidden md:flex absolute inset-y-0 left-0 z-20 w-full px-(--gutter) items-center pointer-events-none">
        <div className="pointer-events-auto max-w-xl flex flex-col items-start gap-4">
          {/* Stacked Role Labels for Desktop */}
          <div className="flex flex-col">
            {ROLES.map((role, idx) => (
              <div key={`desk-${role}`} className="overflow-hidden">
                <div
                  className="founder-role-text text-[3.25rem] transition-transform will-change-transform"
                  style={{
                    transform:
                      isRevealed || isReducedMotion
                        ? "translateY(0)"
                        : "translateY(110%)",
                    transitionDuration: isReducedMotion ? "0ms" : "760ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: isReducedMotion
                      ? "0ms"
                      : `${150 + idx * 80}ms`,
                  }}
                >
                  {role}
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-[1.0625rem] leading-[1.6] text-(--color-text-secondary) transition-all will-change-transform max-w-96"
            style={{
              opacity: isRevealed || isReducedMotion ? 1 : 0,
              transform:
                isRevealed || isReducedMotion
                  ? "translateY(0)"
                  : "translateY(16px)",
              transitionDuration: isReducedMotion ? "0ms" : "520ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isReducedMotion ? "0ms" : "320ms",
            }}
          >
            {profile.subheadline ||
              "Building thoughtful digital experiences. A Frontend Developer and UI/UX Designer focused on creating intuitive interfaces and polished web applications."}
          </p>

          <div
            className="flex flex-wrap items-center gap-3 pt-2 transition-all will-change-transform"
            style={{
              opacity: isRevealed || isReducedMotion ? 1 : 0,
              transform:
                isRevealed || isReducedMotion
                  ? "translateY(0)"
                  : "translateY(16px)",
              transitionDuration: isReducedMotion ? "0ms" : "520ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isReducedMotion ? "0ms" : "440ms",
            }}
          >
            <a
              href={profile.links.cv || "/cv.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-cv"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-(--color-border-default) bg-(--color-surface-raised) text-(--color-text-primary) text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              <CvIcon />
              View CV
            </a>
            <a
              href="#projects"
              id="hero-cta-projects"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Layer 1C: Mobile Bottom Copy & CTAs */}
      <div className="md:hidden absolute bottom-24 left-(--gutter) right-(--gutter) z-25 flex flex-col items-start gap-4">
        <p
          className="text-[1rem] leading-[1.6] text-(--color-text-secondary) transition-all will-change-transform max-w-sm"
          style={{
            opacity: isRevealed || isReducedMotion ? 1 : 0,
            transform:
              isRevealed || isReducedMotion
                ? "translateY(0)"
                : "translateY(16px)",
            transitionDuration: isReducedMotion ? "0ms" : "520ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isReducedMotion ? "0ms" : "320ms",
          }}
        >
          {profile.subheadline ||
            "Building thoughtful digital experiences. A Frontend Developer and UI/UX Designer focused on creating intuitive interfaces and polished web applications."}
        </p>

        <div
          className="flex flex-wrap items-center gap-3 pt-1 transition-all will-change-transform"
          style={{
            opacity: isRevealed || isReducedMotion ? 1 : 0,
            transform:
              isRevealed || isReducedMotion
                ? "translateY(0)"
                : "translateY(16px)",
            transitionDuration: isReducedMotion ? "0ms" : "520ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isReducedMotion ? "0ms" : "440ms",
          }}
        >
          <a
            href={profile.links.cv || "/cv.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-cv-mob"
            className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-(--color-border-default) bg-(--color-surface-raised) text-(--color-text-primary) text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <CvIcon />
            View CV
          </a>
          <a
            href="#projects"
            id="hero-cta-projects-mob"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            View Projects
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Layer 2: Oversized Hero Headline (Positioned behind portrait) */}
      <div
        className="absolute left-0 right-0 bottom-0 z-5 pointer-events-none flex flex-col items-center justify-end"
        style={{ transform: "translateY(6%)" }}
      >
        {/* Line 1: GUNTUR */}
        <div className="hero-name-line flex justify-center">
          {LINE_1.map((char, idx) => (
            <span
              key={`line1-${idx}`}
              className="inline-block overflow-hidden align-top"
            >
              <span
                className="inline-block transition-all will-change-transform"
                style={{
                  transform:
                    isRevealed || isReducedMotion
                      ? "translateY(0)"
                      : "translateY(100%)",
                  opacity: isRevealed || isReducedMotion ? 1 : 0,
                  transitionDuration: isReducedMotion ? "0ms" : "900ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isReducedMotion
                    ? "0ms"
                    : `${80 + idx * 45}ms`,
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Line 2: LISTYO */}
        <div className="hero-name-line flex justify-center">
          {LINE_2.map((char, idx) => (
            <span
              key={`line2-${idx}`}
              className="inline-block overflow-hidden align-top"
            >
              <span
                className="inline-block transition-all will-change-transform"
                style={{
                  transform:
                    isRevealed || isReducedMotion
                      ? "translateY(0)"
                      : "translateY(100%)",
                  opacity: isRevealed || isReducedMotion ? 1 : 0,
                  transitionDuration: isReducedMotion ? "0ms" : "900ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isReducedMotion
                    ? "0ms"
                    : `${260 + idx * 45}ms`,
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Layer 3: Silhouette Portrait Media with Thanos Snap Particle Disintegration */}
      <div
        ref={containerRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[86vh] w-[80vw] sm:w-[48vw] lg:w-[36vw] pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={PORTRAIT_WEBP}
          alt="Guntur Listyo Prabowo"
          loading="eager"
          fetchPriority="high"
          onLoad={buildSnapBuffers}
          className="w-full h-full object-cover object-bottom select-none"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none select-none"
          style={{
            position: "absolute",
            left: `-${PAD_LEFT}px`,
            top: `-${PAD_TOP}px`,
            opacity: 0,
          }}
        />
      </div>

      {/* Layer 4: Bottom Gradient (Smoothly blends hero into the page surface) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[20vh] z-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Scroll Cue (Positioned in lower-left on mobile, lower-right on desktop) */}
      <a
        href="#about"
        className="absolute bottom-8 left-(--gutter) md:left-auto md:right-(--gutter) z-25 flex items-center md:flex-row-reverse gap-3 transition-opacity will-change-transform group cursor-pointer"
        style={{
          opacity: isRevealed || isReducedMotion ? 1 : 0,
          transitionDuration: isReducedMotion ? "0ms" : "600ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: isReducedMotion ? "0ms" : "700ms",
        }}
        aria-label="Scroll down to About section"
      >
        <div className="w-[1.5px] h-10 bg-(--primary) transition-transform duration-300 group-hover:scale-y-125 origin-top" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-(--color-text-secondary) group-hover:text-(--color-text-primary) transition-colors">
          Scroll to explore
        </span>
      </a>
    </section>
  );
}
