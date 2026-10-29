import { useState, useEffect, useRef } from "react";
import { profile } from "../data/profile";

const ROLES = ["DEVELOPER", "DESIGNER"];
const LINE_1 = "GUNTUR".split("");
const LINE_2 = "LISTYO".split("");

// Hero assets
const PORTRAIT_WEBP =
  "../images/Hero/New.png";

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

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);
  const animFrameRef = useRef(null);

  // SVG Distortion Animation State
  const animStateRef = useRef({
    currentScale: 1,
    currentFreq: 0.009,
    startScale: 1,
    startFreq: 0.009,
    targetScale: 1,
    targetFreq: 0.009,
    startTime: 0,
    duration: 520,
    isAnimating: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    // Auto trigger cinematic entrance animation on mount
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 150);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timer);
    };
  }, []);

  // Liquid distortion spring interpolation (Desktop hover)
  const animateDistortion = (toScale, toFreq) => {
    const isDesktopPointer = window.matchMedia(
      "(pointer: fine) and (min-width: 769px)"
    ).matches;
    if (!isDesktopPointer || isReducedMotion) return;

    const s = animStateRef.current;
    s.startScale = s.currentScale;
    s.startFreq = s.currentFreq;
    s.targetScale = toScale;
    s.targetFreq = toFreq;
    s.startTime = performance.now();
    s.duration = 520;

    if (!s.isAnimating) {
      s.isAnimating = true;

      const step = (time) => {
        const elapsed = time - s.startTime;
        const progress = Math.min(1, elapsed / s.duration);

        // Fluid spring dampening curve
        const eased =
          progress >= 1
            ? 1
            : 1 - Math.exp(-6 * progress) * Math.cos(4 * progress);

        s.currentScale =
          s.startScale + (s.targetScale - s.startScale) * eased;
        s.currentFreq =
          s.startFreq + (s.targetFreq - s.startFreq) * eased;

        if (displacementRef.current) {
          displacementRef.current.setAttribute(
            "scale",
            s.currentScale.toFixed(2)
          );
        }
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute(
            "baseFrequency",
            s.currentFreq.toFixed(5)
          );
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          s.isAnimating = false;
          s.currentScale = s.targetScale;
          s.currentFreq = s.targetFreq;
          if (displacementRef.current) {
            displacementRef.current.setAttribute("scale", s.targetScale.toString());
          }
          if (turbulenceRef.current) {
            turbulenceRef.current.setAttribute(
              "baseFrequency",
              s.targetFreq.toString()
            );
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    }
  };

  const handleMouseEnter = () => {
    animateDistortion(30, 0.022);
  };

  const handleMouseLeave = () => {
    animateDistortion(1, 0.009);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex flex-col min-h-[100svh] w-full overflow-hidden select-none"
      style={{
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      {/* SVG Liquid Distortion Filter Definition */}
      <svg
        className="sr-only absolute pointer-events-none"
        aria-hidden="true"
        width="0"
        height="0"
      >
        <defs>
          <filter
            id="portrait-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.009"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Top Row (Role Labels + Availability & Intro Description) */}
      <div className="md:relative z-20 w-full px-[var(--gutter)] pt-[clamp(6rem,12vh,8.5rem)] flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
        {/* Left Column: Stacked Role Labels (Anton typography) */}
        <div className="flex flex-col">
          {ROLES.map((role, idx) => (
            <div key={role} className="overflow-hidden">
              <div
                className="founder-role-text text-[1.75rem] sm:text-[3.25rem] transition-transform will-change-transform"
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

        {/* Right Column: Status Badge, Intro Copy & CTAs
            Mobile: menempel di bawah layar (di atas "Scroll to explore")
            Desktop (md+): kembali ke posisi normal di kanan atas */}
        <div className="absolute bottom-24 left-[var(--gutter)] right-[var(--gutter)] z-[25] md:static md:bottom-auto md:left-auto md:right-auto md:z-auto max-w-[28rem] flex flex-col items-start md:items-end text-left md:text-right gap-4">
          {/* Availability Badge */}
          {profile.available && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-muted)] text-xs font-mono tracking-wider text-[var(--color-text-secondary)] transition-all will-change-transform"
              style={{
                opacity: isRevealed || isReducedMotion ? 1 : 0,
                transform:
                  isRevealed || isReducedMotion
                    ? "translateY(0)"
                    : "translateY(12px)",
                transitionDuration: isReducedMotion ? "0ms" : "500ms",
                transitionDelay: isReducedMotion ? "0ms" : "200ms",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-status-success)] animate-pulse" />
              Available for opportunities
            </div>
          )}

          {/* Intro Description */}
          <p
            className="text-[1.0625rem] leading-[1.6] text-[var(--color-text-secondary)] transition-all will-change-transform"
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

          {/* Action CTAs */}
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
              href="#projects"
              id="hero-cta-projects"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <ArrowIcon />
            </a>
            <a
              href="#contact"
              id="hero-cta-contact"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Oversized Hero Headline (Positioned behind portrait) */}
      <div
        className="absolute left-0 right-0 bottom-0 z-[5] pointer-events-none flex flex-col items-center justify-end"
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

      {/* Layer 3: Silhouette Portrait Media (Foreground cutout with liquid distortion) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[86vh] w-[80vw] sm:w-[48vw] lg:w-[36vw] pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={PORTRAIT_WEBP}
          alt="Guntur Listyo Prabowo"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-bottom select-none"
          style={{
            filter: isReducedMotion ? "none" : "url(#portrait-distortion)",
          }}
        />
      </div>

      {/* Layer 4: Bottom Gradient (Smoothly blends hero into the page surface) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[26vh] z-[12] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-surface-base))",
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Scroll Cue (Positioned in lower-left corner) */}
      <a
        href="#about"
        className="absolute bottom-8 left-[var(--gutter)] z-[25] flex items-center gap-3 transition-opacity will-change-transform group cursor-pointer"
        style={{
          opacity: isRevealed || isReducedMotion ? 1 : 0,
          transitionDuration: isReducedMotion ? "0ms" : "600ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: isReducedMotion ? "0ms" : "700ms",
        }}
        aria-label="Scroll down to About section"
      >
        {/* Accent Vertical Rule */}
        <div className="w-[1.5px] h-10 bg-[var(--color-accent-start)] transition-transform duration-300 group-hover:scale-y-125 origin-top" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
          Scroll to explore
        </span>
      </a>
    </section>
  );
}