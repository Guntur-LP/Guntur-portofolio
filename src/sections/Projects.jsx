// src/sections/Projects.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projects";

// Close icon
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// External link icon
function ExternalIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// GitHub icon
function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// Figma icon
function FigmaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.001h3.117c1.475 0 2.491-1.016 2.491-2.491S17.327 2.02 15.852 2.02h-3.117v4.981zm0 1.98H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.491 4.49-4.491h4.588v8.981zm-4.587-6.001c-1.475 0-2.491 1.016-2.491 2.491S6.673 7.001 8.148 7.001h3.117V2.98H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.587-6.001c-1.475 0-2.491 1.016-2.491 2.491s1.016 2.49 2.491 2.49h3.117v-4.981H8.148zm4.587.001h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49v-4.49zm4.588 6.979c1.475 0 2.491-1.016 2.491-2.491s-1.016-2.49-2.491-2.49h-3.117v2.49c0 1.475 1.016 2.491 2.491 2.491h.626z" />
    </svg>
  );
}

// Project image placeholder
function ProjectImagePlaceholder({ title }) {
  const initial = title ? title.charAt(0).toUpperCase() : "P";
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        backgroundColor: "var(--color-surface-muted)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-accent)",
        fontSize: "clamp(2rem, 6vw, 4rem)",
        color: "var(--color-text-secondary)",
        letterSpacing: "-0.05em",
        userSelect: "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-default) 1px, transparent 1px),
            linear-gradient(to right, var(--color-border-default) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{initial}</span>
    </div>
  );
}

// Category chip
function CategoryChip({ category }) {
  const shortLabel = category.replace("Frontend/Web Development", "Frontend")
    .replace("Full-stack Web Application", "Full-stack")
    .replace("UI/UX Design", "UI/UX");

  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "11px",
        fontFamily: "var(--font-accent)",
        color: "var(--color-text-secondary)",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--color-border-default)",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {shortLabel}
    </span>
  );
}

// =============================================
// PROJECT MODAL
// =============================================
function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap + close on Escape
  useEffect(() => {
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap
      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [onClose]);

  const modalTitleId = `modal-title-${project.id}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-5)",
        animation: "modal-backdrop-in var(--motion-base) var(--motion-easing) forwards",
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--color-overlay)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "90dvh",
          overflowY: "auto",
          backgroundColor: "var(--color-surface-raised)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-modal)",
          border: "1px solid var(--color-border-default)",
          animation: "modal-panel-in var(--motion-base) var(--motion-easing) forwards",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-5)",
            padding: "var(--space-9)",
            borderBottom: "1px solid var(--color-border-default)",
            position: "sticky",
            top: 0,
            backgroundColor: "var(--color-surface-raised)",
            zIndex: 1,
          }}
        >
          <div>
            <CategoryChip category={project.category} />
            <h2
              id={modalTitleId}
              style={{
                fontSize: "22px",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-primary)",
                margin: "var(--space-3) 0 0 0",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close project details"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--color-border-strong)",
              backgroundColor: "transparent",
              color: "var(--color-text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: `background-color var(--motion-instant) var(--motion-easing)`,
            }}
            className="modal-close-btn"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "var(--space-9)" }}>
          {/* Project image */}
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
              style={{
                width: "100%",
                aspectRatio: "16/10",
                objectFit: "cover",
                borderRadius: "var(--radius-md)",
                marginBottom: "var(--space-9)",
                display: "block",
              }}
            />
          ) : (
            <div style={{ marginBottom: "var(--space-9)" }}>
              <ProjectImagePlaceholder title={project.title} />
            </div>
          )}

          {/* Summary */}
          <section aria-labelledby={`${project.id}-summary`} style={{ marginBottom: "var(--space-9)" }}>
            <h3
              id={`${project.id}-summary`}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-accent)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              Overview
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "24px", color: "var(--color-text-secondary)", margin: 0 }}>
              {project.summary}
            </p>
          </section>

          {/* Role */}
          <section aria-labelledby={`${project.id}-role`} style={{ marginBottom: "var(--space-9)" }}>
            <h3
              id={`${project.id}-role`}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-accent)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              Role & Contribution
            </h3>
            <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-strong)", color: "var(--color-text-primary)", margin: "0 0 var(--space-3) 0" }}>
              {project.role}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "24px", color: "var(--color-text-secondary)", margin: 0 }}>
              {project.contribution}
            </p>
          </section>

          {/* Tech */}
          <section aria-labelledby={`${project.id}-tech`} style={{ marginBottom: "var(--space-9)" }}>
            <h3
              id={`${project.id}-tech`}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-accent)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              Technologies
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-accent)",
                    color: "var(--color-text-primary)",
                    padding: "var(--space-2) var(--space-4)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border-strong)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Links — only render available ones */}
          {(project.links.github || project.links.demo || project.links.figma) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-4)",
                paddingTop: "var(--space-5)",
                borderTop: "1px solid var(--color-border-default)",
              }}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "0 var(--space-5)",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    border: "1.5px solid var(--color-border-strong)",
                    color: "var(--color-text-primary)",
                    fontSize: "14px",
                    fontWeight: "var(--font-weight-strong)",
                    textDecoration: "none",
                    transition: `background-color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="modal-link"
                >
                  <GithubIcon />
                  GitHub repository
                  <span className="sr-only"> — {project.title} (opens in new tab)</span>
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "0 var(--space-5)",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-action-primary-bg)",
                    color: "var(--color-action-primary-fg)",
                    fontSize: "14px",
                    fontWeight: "var(--font-weight-strong)",
                    textDecoration: "none",
                    transition: `background-color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="btn-primary"
                >
                  Live demo
                  <ExternalIcon />
                  <span className="sr-only"> — {project.title} (opens in new tab)</span>
                </a>
              )}
              {project.links.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "0 var(--space-5)",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    border: "1.5px solid var(--color-border-strong)",
                    color: "var(--color-text-primary)",
                    fontSize: "14px",
                    fontWeight: "var(--font-weight-strong)",
                    textDecoration: "none",
                    transition: `background-color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="modal-link"
                >
                  <FigmaIcon />
                  Figma design
                  <span className="sr-only"> — {project.title} (opens in new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-panel-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-close-btn:hover { background-color: var(--color-surface-muted) !important; }
        .modal-link:hover { background-color: var(--color-surface-muted) !important; }
        .btn-primary:hover { background-color: var(--color-action-primary-bg-hover) !important; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes modal-backdrop-in { from {} to {} }
          @keyframes modal-panel-in { from {} to {} }
        }
      `}</style>
    </div>
  );
}

// =============================================
// PROJECT CARD
// =============================================
function ProjectCard({ project, onOpen, index }) {
  const ref = useScrollReveal();

  const techToShow = project.tech.slice(0, 4);
  const remainingCount = project.tech.length - 4;

  return (
    <article
      ref={ref}
      className="reveal project-card"
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-raised)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: `border-color var(--motion-instant) var(--motion-easing), background-color var(--motion-instant) var(--motion-easing)`,
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ flexShrink: 0, padding: "var(--space-5) var(--space-5) 0" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "16/10",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
              display: "block",
            }}
          />
        ) : (
          <ProjectImagePlaceholder title={project.title} />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "var(--space-5)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          flex: 1,
        }}
      >
        <CategoryChip category={project.category} />

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "var(--font-weight-strong)",
            color: "var(--color-text-primary)",
            margin: 0,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "var(--color-text-secondary)",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {project.summary}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "auto" }}>
          {techToShow.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "11px",
                fontFamily: "var(--font-accent)",
                color: "var(--color-text-secondary)",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              {t}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              style={{
                fontSize: "11px",
                fontFamily: "var(--font-accent)",
                color: "var(--color-text-secondary)",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              +{remainingCount}
            </span>
          )}
        </div>

        {/* View details button */}
        <button
          onClick={() => onOpen(project)}
          id={`view-details-${project.id}`}
          aria-label={`View details — ${project.title}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "40px",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--color-border-strong)",
            backgroundColor: "transparent",
            color: "var(--color-text-primary)",
            fontSize: "14px",
            fontWeight: "var(--font-weight-strong)",
            cursor: "pointer",
            transition: `background-color var(--motion-instant) var(--motion-easing)`,
            marginTop: "var(--space-3)",
          }}
          className="view-details-btn"
        >
          View Details
        </button>
      </div>

      {/* Pseudo clickable area for whole card */}
      <style>{`
        .project-card:hover {
          border-color: var(--color-border-strong) !important;
          background-color: var(--color-surface-muted) !important;
        }
        .view-details-btn:hover {
          background-color: var(--color-surface-muted) !important;
        }
        .view-details-btn:active {
          background-color: var(--color-surface-muted) !important;
          border-color: var(--color-text-primary) !important;
        }
      `}</style>
    </article>
  );
}

// =============================================
// PROJECTS SECTION
// =============================================
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" aria-labelledby="projects-heading" style={{ paddingBlock: "var(--space-8)" }}>
        <div className="container">
          <SectionHeader
            number="06"
            eyebrow="Selected Projects"
            heading="Work That Speaks for Itself"
            headingId="projects-heading"
          />
          <p style={{ color: "var(--color-text-secondary)", fontSize: "16px" }}>
            Projects are being added.{" "}
            <a
              href="https://github.com/gunturlistyo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text-primary)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Browse my work on GitHub in the meantime
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        style={{ paddingBlock: "var(--space-8)" }}
      >
        <div className="container">
          <SectionHeader
            number="06"
            eyebrow="Selected Projects"
            heading="Work That Speaks for Itself"
            description="A selection of projects that demonstrate my approach to solving real problems with thoughtful design and clean implementation."
            headingId="projects-heading"
          />

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--space-5)",
            }}
            className="projects-grid"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpen}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleClose} />
      )}

      <style>{`
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  );
}
