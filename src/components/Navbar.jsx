// src/components/Navbar.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Sun Icon
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// Moon Icon
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// Menu Icon
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// Close Icon
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef(null);
  const menuId = "mobile-nav-menu";

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest("nav")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    // Move focus to section heading
    const id = href.replace("#", "");
    setTimeout(() => {
      const heading = document.querySelector(`#${id} h2, #${id} h1`);
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }, 100);
  };

  return (
    <>
      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: "var(--z-nav)",
          height: "72px",
          backgroundColor: scrolled
            ? "var(--color-surface-base)"
            : "var(--color-surface-base)",
          borderBottom: `1px solid ${scrolled ? "var(--color-border-default)" : "transparent"}`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: `border-color var(--motion-instant) var(--motion-easing), backdrop-filter var(--motion-instant) var(--motion-easing)`,
        }}
        aria-label="Main navigation"
      >
        <div
          className="container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand mark */}
          <a
            href="#top"
            aria-label="Guntur Listyo Prabowo, back to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              textDecoration: "none",
              color: "var(--color-text-primary)",
            }}
            className="brand-link"
          >
            {/* Name — hidden below md */}
            <span
              style={{
                fontSize: "18px",
                fontWeight: "var(--font-weight-strong)",
                color: "var(--color-text-primary)",
                lineHeight: 1,
              }}
              className="brand-name"
            >
              Guntur Listyo Prabowo
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-10)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav-links"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      fontSize: "14px",
                      fontWeight: "var(--font-weight-base)",
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: "3px",
                      transition: `color var(--motion-instant) var(--motion-easing)`,
                    }}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid var(--color-border-strong)",
                background: "transparent",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `background-color var(--motion-instant) var(--motion-easing)`,
                flexShrink: 0,
              }}
              className="theme-toggle"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-md)",
                border: "1.5px solid var(--color-border-strong)",
                background: "transparent",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `background-color var(--motion-instant) var(--motion-easing)`,
              }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          id={menuId}
          role="menu"
          aria-hidden={!menuOpen}
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "var(--color-surface-base)",
            borderTop: "1px solid var(--color-border-default)",
            padding: "var(--space-5)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            overflowY: "auto",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: menuOpen ? "auto" : "none",
            transition: `opacity var(--motion-base) var(--motion-easing), transform var(--motion-base) var(--motion-easing)`,
          }}
          className="mobile-menu"
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive ? "location" : undefined}
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  padding: "var(--space-4) var(--space-5)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-default)",
                  textDecoration: "none",
                  color: isActive
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                  backgroundColor: isActive
                    ? "var(--color-surface-muted)"
                    : "transparent",
                  fontSize: "16px",
                  fontWeight: isActive
                    ? "var(--font-weight-strong)"
                    : "var(--font-weight-base)",
                  transition: `background-color var(--motion-instant) var(--motion-easing), color var(--motion-instant) var(--motion-easing)`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                    minWidth: "20px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>

      <style>{`
        .brand-link:hover .brand-name {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .brand-link:active {
          opacity: 0.8;
        }
        .nav-link:hover {
          color: var(--color-text-primary) !important;
        }
        .theme-toggle:hover {
          background-color: var(--color-surface-muted) !important;
        }
        .theme-toggle:active {
          background-color: var(--color-surface-muted) !important;
          border-color: var(--color-text-primary) !important;
        }
        .mobile-menu-btn:hover {
          background-color: var(--color-surface-muted) !important;
        }

        /* Desktop: show nav links, hide mobile button */
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }

        /* Mobile: hide nav links, show mobile button */
        @media (max-width: 767px) {
          .desktop-nav-links { display: none !important; }
          .brand-name { display: none !important; }
        }

        @media (hover: hover) {
          .nav-link:hover {
            color: var(--color-text-primary) !important;
          }
        }
      `}</style>
    </>
  );
}
