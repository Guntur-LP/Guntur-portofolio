// src/components/Navbar.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
import SkyToggle from "./ui/SkyToggle";

const navLinks = [
  { label: "About", href: "#about" },
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
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef(null);
  const menuId = "mobile-nav-menu";

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect active section via high-precision scroll spy
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    let ticking = false;

    const determineActiveSection = () => {
      // If user clicked a nav link and smooth scroll is in progress, preserve clicked active section
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at the top of the page (Hero section), no section link should be active
      const aboutEl = document.getElementById("about");
      const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top + scrollY : 500;
      if (scrollY < Math.max(120, aboutTop - 250)) {
        setActiveSection("");
        return;
      }

      // 2. If scrolled near the bottom of the page, the last section (Contact) is always active
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Focal reading line: ~25% down the viewport (minimum 120px to sit below 72px navbar)
      const focalLine = Math.max(120, windowHeight * 0.25);

      // Find the section that contains the focal reading line
      let matchedSection = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedSection = id;
          break;
        }
      }

      // Fallback: pick the latest section that has crossed the focal line and is still visible
      if (!matchedSection) {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > 72) {
            matchedSection = id;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // User manual interactions cancel programmatic navigation lock immediately
    const unlockNav = () => {
      isNavigatingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("wheel", unlockNav, { passive: true });
    window.addEventListener("touchmove", unlockNav, { passive: true });
    window.addEventListener("pointerdown", unlockNav, { passive: true });

    // Initial check on mount
    determineActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("wheel", unlockNav);
      window.removeEventListener("touchmove", unlockNav);
      window.removeEventListener("pointerdown", unlockNav);
      if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    };
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

  // Close menu on outside click or touch
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest("nav") && !e.target.closest(".mobile-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
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

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e?.preventDefault();
    }
    setMenuOpen(false);
    document.body.style.overflow = "";

    const id = href.replace("#", "");
    setActiveSection(id);

    // Lock programmatic navigation so intermediate sections don't flash during smooth scroll
    isNavigatingRef.current = true;
    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);

    // Smooth scroll to target section
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // Move focus to section heading
    setTimeout(() => {
      const heading = document.querySelector(`#${id} h2, #${id} h1`);
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }, 150);
  };

  const handleBrandClick = (e) => {
    e?.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = "";
    setActiveSection("");
    isNavigatingRef.current = true;
    if (navigationTimeoutRef.current) clearTimeout(navigationTimeoutRef.current);
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          backgroundColor: menuOpen
            ? "var(--background)"
            : scrolled
            ? "var(--nav-bg)"
            : "transparent",
          backdropFilter: menuOpen ? "none" : "blur(16px)",
          WebkitBackdropFilter: menuOpen ? "none" : "blur(16px)",
          borderBottom: "none",
          transition: `background-color var(--motion-base) var(--motion-easing)`,
        }}
        aria-label="Main navigation"
      >
        <div
          className="relative w-full px-(--gutter)"
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
            onClick={handleBrandClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: `transform var(--motion-instant) var(--motion-easing), opacity var(--motion-instant) var(--motion-easing)`,
              flexShrink: 0,
            }}
            className="brand-link group"
          >
            {/* Logo Image */}
            <img
              src="/images/Logo2.webp"
              alt="GLP Logo"
              width="68"
              height="68"
              className="w-14.5 h-14.5 md:w-24 md:h-24 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links (Precisely centered horizontally against the viewport) */}
          <ul
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-10)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav-links pointer-events-auto"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? "var(--font-weight-strong)" : "var(--font-weight-base)",
                      color: "var(--color-text-primary)",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: "4px",
                      transition: `color var(--motion-instant) var(--motion-easing)`,
                    }}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            {/* Sky Theme Toggle */}
            <SkyToggle
              checked={theme === "dark"}
              onChange={toggleTheme}
              ariaLabel={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
            />

            {/* Mobile Menu Button */}
            <button
              type="button"
              ref={menuButtonRef}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
                color: "var(--foreground)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `all var(--motion-instant) var(--motion-easing)`,
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
            height: "calc(100dvh - 72px)",
            backgroundColor: "var(--background)",
            borderTop: "1px solid var(--border)",
            padding: "var(--space-5)",
            display: menuOpen ? "flex" : "none",
            flexDirection: "column",
            gap: "var(--space-3)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            zIndex: 999,
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
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  padding: "var(--space-4) var(--space-5)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-default)",
                  textDecoration: "none",
                  color: "var(--color-text-primary)",
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
        .brand-link:hover {
          opacity: 0.85;
        }
        .brand-link:active {
          opacity: 0.7;
        }
        .nav-link:hover {
          color: var(--color-text-primary) !important;
          text-decoration: underline;
        }
        .nav-link:active, .nav-link.active {
          color: var(--color-text-primary) !important;
        }
        .mobile-menu-btn:hover {
          background-color: var(--surface-muted) !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }
        .mobile-menu a:hover {
          color: var(--color-text-primary) !important;
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
      `}</style>
    </>
  );
}
