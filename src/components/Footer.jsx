// src/components/Footer.jsx
import { profile } from "../data/profile";

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container footer-bar">
        {/* Left: Brand & Copyright */}
        <div className="footer-brand-block">
          <a
            href="#top"
            onClick={scrollToTop}
            className="footer-brand-title"
            aria-label={`${profile.name}, back to top`}
          >
            {profile.name}
          </a>
          <p className="footer-copyright">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>

        {/* Right: Social Icon Pills + Back to Top */}
        <nav aria-label="Footer navigation" className="footer-actions-wrap">
          <ul className="footer-social-list">
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-github"
                  className="footer-social-pill"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            )}

            {profile.links.linkedin && (
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-linkedin"
                  className="footer-social-pill"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            )}

            {profile.links.email && (
              <li>
                <a
                  href={`mailto:${profile.links.email}`}
                  id="footer-email"
                  className="footer-social-pill"
                >
                  <MailIcon />
                  <span>Email</span>
                </a>
              </li>
            )}
          </ul>

          <span className="footer-divider" aria-hidden="true" />

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <ArrowUpIcon />
          </button>
        </nav>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid var(--border);
          background-color: var(--surface-muted);
          padding-block: 28px;
        }

        .footer-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-brand-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-brand-title {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 400;
          letter-spacing: 0.03em;
          color: var(--foreground);
          text-decoration: none;
          line-height: 1.15;
          transition: color var(--motion-instant) var(--motion-easing);
        }

        .footer-brand-title:hover {
          color: var(--primary);
        }

        .footer-copyright {
          font-family: var(--font-primary);
          font-size: 13px;
          color: var(--muted-foreground);
          margin: 0;
        }

        .footer-actions-wrap {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-social-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .footer-social-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 14px;
          border-radius: var(--radius-md);
          background-color: var(--surface);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-family: var(--font-primary);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      color var(--motion-instant) var(--motion-easing),
                      transform var(--motion-instant) var(--motion-easing);
        }

        .footer-social-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
        }

        .footer-divider {
          width: 1px;
          height: 22px;
          background-color: var(--border);
          margin-inline: 2px;
        }

        @media (max-width: 640px) {
          .footer-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-divider {
            display: none;
          }
        }

        .footer-top-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background-color: var(--surface);
          border: 1px solid var(--border);
          color: var(--foreground);
          cursor: pointer;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      color var(--motion-instant) var(--motion-easing),
                      transform var(--motion-instant) var(--motion-easing);
        }

        .footer-top-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
