// src/components/SectionHeader.jsx
import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Reusable section header component.
 * Renders eyebrow text, h2 heading, and optional description.
 * @param {string} number - Section number, e.g. "02"
 * @param {string} eyebrow - Eyebrow label
 * @param {string} heading - Main h2 heading text
 * @param {string} [description] - Optional description paragraph
 * @param {string} headingId - ID for the h2, used with aria-labelledby on section
 */
export default function SectionHeader({ number, eyebrow, heading, description, headingId }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal"
      style={{ marginBottom: "var(--space-8)" }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "var(--font-accent)",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 0,
          marginBottom: "var(--space-4)",
        }}
      >
        {number} — {eyebrow}
      </p>

      {/* h2 */}
      <h2
        id={headingId}
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          marginTop: 0,
          marginBottom: description ? "var(--space-5)" : 0,
          maxWidth: "600px",
        }}
      >
        {heading}
      </h2>

      {/* Optional description */}
      {description && (
        <p
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            color: "var(--color-text-secondary)",
            maxWidth: "580px",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
