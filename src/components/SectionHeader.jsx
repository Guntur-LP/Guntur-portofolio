// src/components/SectionHeader.jsx

export default function SectionHeader({ number, eyebrow, heading, description, headingId }) {
  return (
    <div
      style={{
        marginBottom: "clamp(24px, 3vw, 36px)",
      }}
    >
      {/* Clean Architectural Eyebrow Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px 12px",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
            display: "inline-block",
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "var(--font-accent)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
          }}
        >
          {number} / {eyebrow}
        </span>
      </div>

      {/* Main Heading */}
      <h2
        id={headingId}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.1rem, 3.8vw, 3rem)",
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: "0.02em",
          color: "var(--foreground)",
          margin: 0,
          marginBottom: description ? "12px" : 0,
          maxWidth: "760px",
        }}
      >
        {heading}
      </h2>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: "15px",
            lineHeight: "26px",
            color: "var(--muted-foreground)",
            margin: 0,
            maxWidth: "600px",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
