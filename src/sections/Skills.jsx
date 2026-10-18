// src/sections/Skills.jsx
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

// Check icon for skill items
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-text-secondary)" }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SkillGroup({ heading, items, headingLevel = "h3" }) {
  const ref = useScrollReveal();
  const Tag = headingLevel;

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        padding: "var(--space-9)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-raised)",
      }}
    >
      <Tag
        style={{
          fontSize: "14px",
          fontFamily: "var(--font-accent)",
          fontWeight: "var(--font-weight-strong)",
          color: "var(--color-text-secondary)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginTop: 0,
          marginBottom: "var(--space-5)",
        }}
      >
        {heading}
      </Tag>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {items.map((skill) => (
          <li
            key={skill}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              fontSize: "15px",
              color: "var(--color-text-primary)",
              lineHeight: 1.4,
            }}
          >
            <CheckIcon />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ paddingBlock: "var(--space-8)" }}
    >
      <div className="container">
        <SectionHeader
          number="03"
          eyebrow="Skills & Tech Stack"
          heading="Tools and Technologies I Work With"
          description="A curated selection of the technologies and tools I use to bring ideas to life — no inflated skill bars, just honest experience."
          headingId="skills-heading"
        />

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          <SkillGroup
            heading="Frontend Development"
            items={profile.skills.frontend}
          />
          <SkillGroup
            heading="UI/UX Design"
            items={profile.skills.design}
          />
          <SkillGroup
            heading="Tools & Ecosystem"
            items={profile.skills.tools}
          />
        </div>
      </div>
    </section>
  );
}
