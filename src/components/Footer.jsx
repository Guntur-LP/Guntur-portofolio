// src/components/Footer.jsx
import { profile } from "../data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-default)",
        paddingBlock: "var(--space-9)",
        backgroundColor: "var(--color-surface-base)",
      }}
      aria-label="Site footer"
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-5)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            © {currentYear} Guntur Listyo Prabowo
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              gap: "var(--space-6)",
              flexWrap: "wrap",
            }}
          >
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-github"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: `color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="footer-link"
                >
                  GitHub
                  <span
                    style={{
                      position: "absolute",
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      margin: "-1px",
                      overflow: "hidden",
                      clip: "rect(0,0,0,0)",
                      whiteSpace: "nowrap",
                      border: 0,
                    }}
                  >
                    {" "}(opens in new tab)
                  </span>
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
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: `color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="footer-link"
                >
                  LinkedIn
                  <span
                    style={{
                      position: "absolute",
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      margin: "-1px",
                      overflow: "hidden",
                      clip: "rect(0,0,0,0)",
                      whiteSpace: "nowrap",
                      border: 0,
                    }}
                  >
                    {" "}(opens in new tab)
                  </span>
                </a>
              </li>
            )}
            {profile.links.email && (
              <li>
                <a
                  href={`mailto:${profile.links.email}`}
                  id="footer-email"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: `color var(--motion-instant) var(--motion-easing)`,
                  }}
                  className="footer-link"
                >
                  Email
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-text-primary) !important;
        }
      `}</style>
    </footer>
  );
}
