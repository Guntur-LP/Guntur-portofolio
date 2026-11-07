// src/sections/Services.jsx
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PenToolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const iconMap = {
  monitor: <MonitorIcon />,
  "pen-tool": <PenToolIcon />,
  layers: <LayersIcon />,
};

export default function Services() {
  const cardsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="services" aria-labelledby="services-heading" className="portfolio-section">
      <div className="container">
        <SectionHeader
          number="04"
          eyebrow="Services & Expertise"
          heading="What I Can Do For You"
          description="Whether you need a high-quality interface built from scratch or a thoughtful design to guide development — here's how I can help."
          headingId="services-heading"
        />

        <div ref={cardsRef} className="reveal services-grid">
          {profile.services.map((service, idx) => (
            <div key={service.id} className="service-scaffold-card">
              <div className="service-card-top">
                <div className="service-icon-box" aria-hidden="true">
                  {iconMap[service.icon] || <MonitorIcon />}
                </div>
                <span className="font-accent text-xs font-semibold text-(--muted-foreground)">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>

              <div className="service-tags-row">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="reveal service-cta-banner">
          <div>
            <h3 className="service-cta-title">Have a project in mind?</h3>
            <p className="service-cta-desc">Let&apos;s collaborate and bring your ideas to life.</p>
          </div>

          <a href="#contact" id="services-cta" className="btn-primary service-cta-btn">
            <span>Get in Touch</span>
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .service-scaffold-card {
          padding: 28px;
          border-radius: var(--radius-lg);
          background-color: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      transform var(--motion-instant) var(--motion-easing);
        }

        .service-scaffold-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .service-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
          color: var(--primary);
          flex-shrink: 0;
        }

        .service-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .service-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--foreground);
          margin: 0;
          line-height: 1.25;
        }

        .service-description {
          font-size: 14px;
          line-height: 24px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .service-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }

        .service-tag-chip {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        .service-cta-banner {
          margin-top: 24px;
          padding: 24px 28px;
          border-radius: var(--radius-lg);
          background-color: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .service-cta-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--foreground);
          margin: 0 0 4px 0;
        }

        .service-cta-desc {
          font-size: 14px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .service-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
