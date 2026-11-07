// src/sections/Experience.jsx
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ExperienceCard({ experience, index }) {
  const ref = useScrollReveal();

  return (
    <article ref={ref} className="reveal exp-scaffold-card">
      <div className="exp-card-header">
        <div>
          <span className="exp-index-label">
            {String(index + 1).padStart(2, "0")} / ROLE
          </span>
          <h3 className="exp-role-title">{experience.role}</h3>
          <p className="exp-company-name">{experience.company}</p>
        </div>

        <div className="exp-period-badge">
          <CalendarIcon />
          <span>{experience.period}</span>
        </div>
      </div>

      {experience.contributions && experience.contributions.length > 0 && (
        <ul className="exp-points-list">
          {experience.contributions.map((item, idx) => (
            <li key={idx} className="exp-point-item">
              <span className="exp-point-num" aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="exp-point-text">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="portfolio-section portfolio-section-alt">
      <div className="container">
        <SectionHeader
          number="03"
          eyebrow="Experience & Contributions"
          heading="Where I've Worked and What I've Built"
          description="A track record of delivering quality interfaces and thoughtful design solutions."
          headingId="experience-heading"
        />

        <div className="exp-list-container">
          {profile.experience.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} index={idx} />
          ))}
        </div>
      </div>

      <style>{`
        .exp-list-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .exp-scaffold-card {
          padding: clamp(24px, 3vw, 34px);
          border-radius: var(--radius-lg);
          background-color: var(--surface);
          border: 1px solid var(--border);
          transition: border-color var(--motion-instant) var(--motion-easing);
        }

        .exp-scaffold-card:hover {
          border-color: var(--primary);
        }

        .exp-card-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }

        .exp-index-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--muted-foreground);
          margin-bottom: 6px;
        }

        .exp-role-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--foreground);
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .exp-company-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
          margin: 0;
        }

        .exp-period-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
          font-size: 11px;
          color: var(--muted-foreground);
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .exp-points-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 900px) {
          .exp-points-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        .exp-point-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
        }

        .exp-point-num {
          font-size: 11px;
          font-weight: 600;
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .exp-point-text {
          font-size: 14px;
          line-height: 22px;
          color: var(--muted-foreground);
        }
      `}</style>
    </section>
  );
}
