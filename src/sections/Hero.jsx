// src/sections/Hero.jsx
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

// Arrow icon for CTA
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Download icon
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// Status dot (available for opportunities)
function AvailableBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-muted)",
        fontSize: "12px",
        fontFamily: "var(--font-accent)",
        color: "var(--color-text-secondary)",
        letterSpacing: "0.05em",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-status-success)",
          display: "inline-block",
          animation: "pulse-badge 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      Available for opportunities
    </span>
  );
}

export default function Hero() {
  const headlineRef = useScrollReveal(0.1);
  const subRef = useScrollReveal(0.1);
  const ctaRef = useScrollReveal(0.1);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "72px", // navbar height
        paddingBottom: "var(--space-8)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-default) 1px, transparent 1px),
            linear-gradient(to right, var(--color-border-default) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Available badge */}
        <div
          ref={useScrollReveal(0.1)}
          className="reveal"
          style={{ marginBottom: "var(--space-9)" }}
        >
          {profile.available && <AvailableBadge />}
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-accent)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "var(--space-5)",
            marginTop: 0,
          }}
          className="reveal"
          ref={useScrollReveal(0.1)}
        >
          01 — Introduction
        </p>

        {/* Main headline */}
        <h1
          id="hero-heading"
          ref={headlineRef}
          className="reveal"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-text-primary)",
            maxWidth: "800px",
            marginTop: 0,
            marginBottom: "var(--space-5)",
          }}
        >
          {profile.headline}
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="reveal"
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            color: "var(--color-text-secondary)",
            maxWidth: "580px",
            marginTop: 0,
            marginBottom: "var(--space-8)",
          }}
        >
          {profile.subheadline}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            alignItems: "center",
          }}
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            id="hero-cta-projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "0 var(--space-9)",
              height: "44px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-action-primary-bg)",
              color: "var(--color-action-primary-fg)",
              fontSize: "16px",
              fontWeight: "var(--font-weight-strong)",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: `background-color var(--motion-instant) var(--motion-easing)`,
              whiteSpace: "nowrap",
            }}
            className="btn-primary"
          >
            View Projects
            <ArrowIcon />
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            id="hero-cta-contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "0 var(--space-9)",
              height: "44px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "transparent",
              color: "var(--color-text-primary)",
              fontSize: "16px",
              fontWeight: "var(--font-weight-strong)",
              textDecoration: "none",
              border: "1.5px solid var(--color-border-strong)",
              cursor: "pointer",
              transition: `background-color var(--motion-instant) var(--motion-easing), border-color var(--motion-instant) var(--motion-easing)`,
              whiteSpace: "nowrap",
            }}
            className="btn-secondary"
          >
            Get in Touch
          </a>

          {/* Download CV — only render if cv file is available */}
          {profile.links.cv && (
            <a
              href={profile.links.cv}
              download
              id="hero-cta-cv"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "0 var(--space-9)",
                height: "44px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "transparent",
                color: "var(--color-text-primary)",
                fontSize: "16px",
                fontWeight: "var(--font-weight-strong)",
                textDecoration: "none",
                border: "1.5px solid var(--color-border-strong)",
                cursor: "pointer",
                transition: `background-color var(--motion-instant) var(--motion-easing)`,
                whiteSpace: "nowrap",
              }}
              className="btn-secondary"
            >
              <DownloadIcon />
              Download CV
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "var(--space-8)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          <span
            style={{
              display: "block",
              width: "1px",
              height: "48px",
              backgroundColor: "var(--color-border-strong)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "11px",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        .btn-primary:hover {
          background-color: var(--color-action-primary-bg-hover) !important;
        }
        .btn-primary:active {
          background-color: var(--color-action-primary-bg-active) !important;
        }
        .btn-secondary:hover {
          background-color: var(--color-surface-muted) !important;
        }
        .btn-secondary:active {
          background-color: var(--color-surface-muted) !important;
          border-color: var(--color-text-primary) !important;
        }

        /* Stack buttons on small screens */
        @media (max-width: 479px) {
          #hero-cta-projects,
          #hero-cta-contact,
          #hero-cta-cv {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse-badge { from {} to {} }
          @keyframes scroll-line { from {} to {} }
        }
      `}</style>
    </section>
  );
}
