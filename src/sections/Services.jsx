// src/sections/Services.jsx
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

// Icon components per service
function MonitorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PenToolIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const iconMap = {
  monitor: <MonitorIcon />,
  "pen-tool": <PenToolIcon />,
  layers: <LayersIcon />,
};

function ServiceCard({ service, index }) {
  const ref = useScrollReveal();

  return (
    <article
      ref={ref}
      className="reveal service-card"
      style={{
        padding: "var(--space-9)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-raised)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        transition: `border-color var(--motion-instant) var(--motion-easing), background-color var(--motion-instant) var(--motion-easing)`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border-default)",
          color: "var(--color-text-primary)",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {iconMap[service.icon] || <MonitorIcon />}
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "var(--font-weight-strong)",
            color: "var(--color-text-primary)",
            marginTop: 0,
            marginBottom: "var(--space-4)",
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "24px",
            color: "var(--color-text-secondary)",
            marginTop: 0,
            marginBottom: "var(--space-5)",
            maxWidth: "50ch",
          }}
        >
          {service.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
          }}
        >
          {service.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
                fontFamily: "var(--font-accent)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{ paddingBlock: "var(--space-8)" }}
    >
      <div className="container">
        <SectionHeader
          number="05"
          eyebrow="Services"
          heading="What I Can Do For You"
          description="Whether you need a high-quality interface built from scratch or a thoughtful design to guide development — here's how I can help."
          headingId="services-heading"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {profile.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "var(--space-8)",
            padding: "var(--space-9)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-default)",
            backgroundColor: "var(--color-surface-muted)",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-5)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-primary)",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              Have a project in mind?
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Let's talk about what we can build together.
            </p>
          </div>
          <a
            href="#contact"
            id="services-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "0 var(--space-9)",
              height: "44px",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-action-primary-bg)",
              color: "var(--color-action-primary-fg)",
              fontSize: "15px",
              fontWeight: "var(--font-weight-strong)",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              transition: `background-color var(--motion-instant) var(--motion-easing)`,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            className="btn-primary"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <style>{`
        .service-card:hover {
          border-color: var(--color-border-strong) !important;
        }
        .btn-primary:hover {
          background-color: var(--color-action-primary-bg-hover) !important;
        }
        .btn-primary:active {
          background-color: var(--color-action-primary-bg-active) !important;
        }
      `}</style>
    </section>
  );
}
