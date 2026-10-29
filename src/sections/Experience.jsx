// src/sections/Experience.jsx
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

function ExperienceCard({ experience, index }) {
  const ref = useScrollReveal();

  return (
    <article
      ref={ref}
      className="reveal experience-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "var(--space-5)",
        padding: "var(--space-9)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-raised)",
        transition: `border-color var(--motion-instant) var(--motion-easing)`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "var(--font-weight-strong)",
              color: "var(--color-text-primary)",
              marginTop: 0,
              marginBottom: "var(--space-2)",
              lineHeight: 1.3,
            }}
          >
            {experience.role}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {experience.company}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-accent)",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.05em",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border-default)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {experience.period}
        </span>
      </div>

      {/* Contributions */}
      {experience.contributions && experience.contributions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          {experience.contributions.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-4)",
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: "20px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-text-secondary)",
                  flexShrink: 0,
                  marginTop: "8px",
                }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      style={{
        paddingBlock: "var(--space-8)",
        backgroundColor: "var(--color-surface-muted)",
      }}
    >
      <div className="container">
        <SectionHeader
          number="04"
          eyebrow="Experience & Contributions"
          heading="Where I've Worked and What I've Built"
          description="A track record of delivering quality interfaces and thoughtful design solutions."
          headingId="experience-heading"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          {profile.experience.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .experience-card:hover {
          border-color: var(--color-accent-start) !important;
          box-shadow: var(--shadow-card) !important;
        }
      `}</style>
    </section>
  );
}
