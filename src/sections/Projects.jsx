// src/sections/Projects.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projects";

// Close Icon
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// Arrow Icon
function ArrowUpRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// GitHub Icon
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// Figma Icon
function FigmaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.001h3.117c1.475 0 2.491-1.016 2.491-2.491S17.327 2.02 15.852 2.02h-3.117v4.981zm0 1.98H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.491 4.49-4.491h4.588v8.981zm-4.587-6.001c-1.475 0-2.491 1.016-2.491 2.491S6.673 7.001 8.148 7.001h3.117V2.98H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.587-6.001c-1.475 0-2.491 1.016-2.491 2.491s1.016 2.49 2.491 2.49h3.117v-4.981H8.148zm4.587.001h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49v-4.49zm4.588 6.979c1.475 0 2.491-1.016 2.491-2.491s-1.016-2.49-2.491-2.49h-3.117v2.49c0 1.475 1.016 2.491 2.491 2.491h.626z" />
    </svg>
  );
}

// Project Modal
function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
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
  const links =
    typeof project.links === "object" && project.links !== null
      ? project.links
      : {};

  return (
    <div role="dialog" aria-modal="true" aria-labelledby={modalTitleId} className="modal-root">
      <div onClick={onClose} aria-hidden="true" className="modal-overlay" />

      <div ref={panelRef} className="modal-panel">
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="modal-category-chip">{project.category}</span>
            <h2 id={modalTitleId} className="modal-title">{project.title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close project modal"
            className="modal-close-button"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Image */}
          {project.image && (
            <div className="modal-img-wrap">
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                onError={(e) => {
                  if (!e.currentTarget.src.includes("Project1.jpg")) {
                    e.currentTarget.src = "/images/projects/Project1.jpg";
                  }
                }}
              />
            </div>
          )}

          {/* Details */}
          <div className="modal-body-grid">
            <div>
              <h3 className="modal-section-heading">Overview</h3>
              <p className="modal-paragraph">{project.summary}</p>

              <h3 className="modal-section-heading" style={{ marginTop: "24px" }}>
                Role &amp; Contribution
              </h3>
              <p className="modal-role-label">{project.role}</p>
              <p className="modal-paragraph">{project.contribution}</p>
            </div>

            <div className="modal-sidebar">
              <h3 className="modal-section-heading">Technologies</h3>
              <div className="modal-tech-chips">
                {project.tech.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>

              {(links.github || links.demo || links.figma) && (
                <div className="modal-links-section">
                  <h3 className="modal-section-heading">Project Links</h3>
                  <div className="modal-links-list">
                    {links.demo && (
                      <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary modal-action-btn">
                        <span>Live Demo</span>
                        <ArrowUpRightIcon />
                      </a>
                    )}
                    {links.github && (
                      <a href={links.github} target="_blank" rel="noopener noreferrer" className="modal-outline-link">
                        <GithubIcon />
                        <span>GitHub Repository</span>
                      </a>
                    )}
                    {links.figma && (
                      <a href={links.figma} target="_blank" rel="noopener noreferrer" className="modal-outline-link">
                        <FigmaIcon />
                        <span>Figma Design</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Project Card
function ProjectCard({ project, onOpen }) {
  const ref = useScrollReveal();
  const techToShow = project.tech.slice(0, 3);
  const remainingCount = project.tech.length - techToShow.length;

  return (
    <article ref={ref} className="reveal project-card-item">
      {/* Image Preview */}
      <div className="project-preview-wrap" onClick={() => onOpen(project)}>
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="project-preview-img"
            onError={(e) => {
              if (!e.currentTarget.src.includes("Project1.jpg")) {
                e.currentTarget.src = "/images/projects/Project1.jpg";
              }
            }}
          />
        ) : (
          <div className="project-placeholder-box">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="project-info-wrap">
        <div className="project-header-row">
          <span className="project-chip">{project.category}</span>
        </div>

        <h3 className="project-name" onClick={() => onOpen(project)}>
          {project.title}
        </h3>

        <p className="project-summary-text">{project.summary}</p>

        {/* Tech Chips */}
        <div className="project-chips-row">
          {techToShow.map((t) => (
            <span key={t} className="project-chip-mini">
              {t}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="project-chip-mini">+{remainingCount}</span>
          )}
        </div>

        {/* View Details Button */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="project-details-btn"
          aria-label={`View details — ${project.title}`}
        >
          <span>View Details</span>
          <ArrowUpRightIcon />
        </button>
      </div>
    </article>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = useCallback((p) => {
    setSelectedProject(p);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <section id="projects" aria-labelledby="projects-heading" className="portfolio-section portfolio-section-alt">
        <div className="container">
          <SectionHeader
            number="05"
            eyebrow="Selected Projects"
            heading="Work That Speaks for Itself"
            description="A selection of projects demonstrating clean execution, thoughtful interaction, and modern front-end craft."
            headingId="projects-heading"
          />

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpen}
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
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .project-card-item {
          display: flex;
          flex-direction: column;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: border-color var(--motion-instant) var(--motion-easing),
                      transform var(--motion-instant) var(--motion-easing),
                      box-shadow var(--motion-instant) var(--motion-easing);
        }

        .project-card-item:hover {
          border-color: var(--primary);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0, 153, 255, 0.08);
        }

        .project-preview-wrap {
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background-color: var(--surface-muted);
          cursor: pointer;
        }

        .project-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--motion-slow) var(--motion-easing);
        }

        .project-card-item:hover .project-preview-img {
          transform: scale(1.04);
        }

        .project-placeholder-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--muted-foreground);
        }

        .project-info-wrap {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .project-chip {
          display: inline-block;
          font-family: var(--font-accent);
          font-size: 11px;
          font-weight: var(--font-weight-strong);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }

        .project-name {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--foreground);
          margin: 0;
          cursor: pointer;
          line-height: 1.25;
          transition: color var(--motion-instant) var(--motion-easing);
        }

        .project-name:hover {
          color: var(--primary);
        }

        .project-summary-text {
          font-size: 14px;
          line-height: 22px;
          color: var(--muted-foreground);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 8px;
        }

        .project-chip-mini {
          font-family: var(--font-accent);
          font-size: 11px;
          padding: 3px 9px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
          color: var(--muted-foreground);
        }

        .project-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 10px 14px;
          margin-top: 8px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: var(--surface-muted);
          color: var(--foreground);
          font-size: 13px;
          font-weight: var(--font-weight-strong);
          cursor: pointer;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      background-color var(--motion-instant) var(--motion-easing),
                      color var(--motion-instant) var(--motion-easing);
        }

        .project-details-btn:hover {
          border-color: var(--primary);
          background-color: var(--surface);
          color: var(--primary);
        }

        /* Modal Styles */
        .modal-root {
          position: fixed;
          inset: 0;
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(11, 27, 43, 0.6);
          backdrop-filter: blur(8px);
        }

        .modal-panel {
          position: relative;
          width: 100%;
          max-width: 840px;
          max-height: 90vh;
          overflow-y: auto;
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          position: sticky;
          top: 0;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--border);
          background-color: var(--surface);
        }

        .modal-category-chip {
          font-family: var(--font-accent);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
          font-weight: var(--font-weight-strong);
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 400;
          color: var(--foreground);
          margin: 4px 0 0 0;
        }

        .modal-close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--surface-muted);
          color: var(--foreground);
          cursor: pointer;
          transition: all var(--motion-instant) var(--motion-easing);
        }

        .modal-close-button:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .modal-content {
          padding: 28px;
        }

        .modal-img-wrap {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border);
          margin-bottom: 24px;
        }

        .modal-img-wrap img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          display: block;
        }

        .modal-body-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .modal-body-grid {
            grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
          }
        }

        .modal-section-heading {
          font-family: var(--font-accent);
          font-size: 12px;
          font-weight: var(--font-weight-strong);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-foreground);
          margin: 0 0 10px 0;
        }

        .modal-paragraph {
          font-size: 15px;
          line-height: 24px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .modal-role-label {
          font-size: 15px;
          font-weight: var(--font-weight-strong);
          color: var(--foreground);
          margin: 0 0 6px 0;
        }

        .modal-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tech-chip {
          font-family: var(--font-accent);
          font-size: 12px;
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-muted);
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        .modal-links-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 42px;
          padding: 0 20px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: var(--font-weight-strong);
          text-decoration: none;
        }

        .modal-outline-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 42px;
          padding: 0 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: var(--surface-muted);
          color: var(--foreground);
          font-size: 14px;
          font-weight: var(--font-weight-strong);
          text-decoration: none;
          transition: all var(--motion-instant) var(--motion-easing);
        }

        .modal-outline-link:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
