// src/components/TechStackTicker.jsx
import { useMemo } from "react";
import { profile } from "../data/profile";

function TechIcon({ name }) {
  switch (name) {
    case "React":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" fill="#00A8E8" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00A8E8" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" stroke="#00A8E8" strokeWidth="1.6" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" stroke="#00A8E8" strokeWidth="1.6" />
        </svg>
      );

    case "Next.js":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path
            d="M8.5 16V8L16.8 18.8M15.5 8V13.5"
            stroke="var(--surface)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#3178C6" />
          <path
            d="M7.2 11.2H12.4M9.8 11.2V18M17.8 12.4C17.3 11.6 16.5 11.2 15.6 11.2C14.4 11.2 13.6 11.8 13.6 12.8C13.6 13.7 14.3 14.1 15.6 14.5C17 14.9 17.9 15.4 17.9 16.5C17.9 17.6 16.9 18.2 15.5 18.2C14.3 18.2 13.5 17.7 13.1 16.9"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "JavaScript (ES6+)":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#F7DF1E" />
          <path
            d="M11.2 11.2V16.4C11.2 17.5 10.5 18.1 9.5 18.1C8.6 18.1 8 17.6 7.7 16.9M17.8 12.3C17.4 11.6 16.7 11.2 15.8 11.2C14.7 11.2 13.9 11.8 13.9 12.7C13.9 13.6 14.6 14 15.8 14.4C17.1 14.8 17.9 15.3 17.9 16.4C17.9 17.5 16.9 18.1 15.6 18.1C14.5 18.1 13.7 17.6 13.3 16.8"
            stroke="#12161C"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "HTML5 & CSS3":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 3L5.5 19.5L12 21.5L18.5 19.5L20 3H4Z" fill="#E34F26" />
          <path d="M12 4.5V19.9L17.2 18.3L18.4 4.5H12Z" fill="#EF652A" />
          <path
            d="M7.5 7.5H16.5L16.2 10.5H8.8L9.1 13.5H15.9L15.4 17L12 18L8.6 17L8.4 15"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.8 9.24 12.41 9.85C13.39 10.85 14.53 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.2 8.76 16.59 8.15C15.61 7.15 14.47 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.8 15.24 7.41 15.85C8.39 16.85 9.53 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.2 14.76 11.59 14.15C10.61 13.15 9.47 12 7 12Z"
            fill="#06B6D4"
          />
        </svg>
      );

    case "Vite":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 4.5L12.3 20.5C12.1 20.9 11.5 20.9 11.3 20.5L3 4.5L12 6.8L21 4.5Z" fill="#8B5CF6" />
          <path d="M15.8 3L9.8 14.2H13.2L11.5 19.5L17.8 10.5H14.1L15.8 3Z" fill="#F59E0B" />
        </svg>
      );

    case "Node.js":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2.5L20.2 7.2V16.8L12 21.5L3.8 16.8V7.2L12 2.5Z"
            stroke="#16A34A"
            strokeWidth="1.8"
            fill="rgba(22, 163, 74, 0.12)"
          />
          <path
            d="M9.5 9.5V14.5L14.5 9.5V14.5"
            stroke="#16A34A"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "shadcn/ui":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.7" />
          <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="17.5" y1="12.5" x2="12.5" y2="17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "REST API":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8.5 6H15.5M7.5 8L10.8 15.8M16.5 8L13.2 15.8" />
        </svg>
      );

    case "Figma":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8.5 2H12V9H8.5C6.57 9 5 7.43 5 5.5C5 3.57 6.57 2 8.5 2Z" fill="#F24E1E" />
          <path d="M12 2H15.5C17.43 2 19 3.57 19 5.5C19 7.43 17.43 9 15.5 9H12V2Z" fill="#FF7262" />
          <path d="M12 9H15.5C17.43 9 19 10.57 19 12.5C19 14.43 17.43 16 15.5 16C13.57 16 12 14.43 12 12.5V9Z" fill="#1ABCFE" />
          <path d="M8.5 9H12V16H8.5C6.57 16 5 14.43 5 12.5C5 10.57 6.57 9 8.5 9Z" fill="#A259FF" />
          <path d="M8.5 16H12V19.5C12 21.43 10.43 23 8.5 23C6.57 23 5 21.43 5 19.5C5 17.57 6.57 16 8.5 16Z" fill="#0ACF83" />
        </svg>
      );

    case "Git & GitHub":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.57 7.18 9.96.53.1.72-.23.72-.51v-1.95c-2.92.63-3.53-1.24-3.53-1.24-.48-1.21-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.05.07 1.61 1.08 1.61 1.08.94 1.6 2.46 1.14 3.06.87.09-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.33.1-2.78 0 0 .88-.28 2.89 1.08a10.1 10.1 0 0 1 5.26 0c2.01-1.36 2.89-1.08 2.89-1.08.57 1.45.21 2.51.1 2.78.67.74 1.08 1.67 1.08 2.82 0 4.03-2.46 4.92-4.8 5.18.38.33.72.96.72 1.94v2.88c0 .28.19.61.73.51A10.51 10.51 0 0 0 22.5 12c0-5.8-4.7-10.5-10.5-10.5Z" />
        </svg>
      );

    case "VS Code":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M17.2 2.4L7.4 11.5L3.6 8.6L2 9.5V14.5L3.6 15.4L7.4 12.5L17.2 21.6L21.5 19.6V4.4L17.2 2.4ZM17.2 7.6V16.4L10.8 12L17.2 7.6Z"
            fill="#007ACC"
          />
        </svg>
      );

    case "Vercel":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 3.5 22 20.5 2 20.5" />
        </svg>
      );

    case "UI/UX Design":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );

    case "Design Systems":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
          <circle cx="17.25" cy="17.25" r="3.75" />
        </svg>
      );

    case "Prototyping":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );

    case "User Research":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" />
          <circle cx="10.5" cy="9" r="2" />
          <path d="M7.5 14c.6-1.3 1.7-2 3-2s2.4.7 3 2" />
        </svg>
      );

    case "Wireframing":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <line x1="3" y1="8.5" x2="21" y2="8.5" />
          <line x1="9" y1="21" x2="9" y2="8.5" />
        </svg>
      );

    case "Responsive Design":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="15" height="11" rx="2" />
          <line x1="6" y1="19" x2="12" y2="19" />
          <rect x="16" y="9" width="6" height="11" rx="1.5" fill="var(--surface)" />
        </svg>
      );

    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

function TickerBadge({ name }) {
  return (
    <div className="tech-carousel-pill">
      <span className="tech-carousel-icon">
        <TechIcon name={name} />
      </span>
      <span className="tech-carousel-name">{name}</span>
    </div>
  );
}

export default function TechStackTicker() {
  const { rowA, rowB } = useMemo(() => {
    const allSkills = [
      ...(profile.skills?.frontend || []),
      ...(profile.skills?.tools || []),
      ...(profile.skills?.design || []),
    ];
    const mid = Math.ceil(allSkills.length / 2);
    const firstHalf = allSkills.slice(0, mid);
    const secondHalf = allSkills.slice(mid);

    return {
      rowA: [...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf],
      rowB: [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf],
    };
  }, []);

  return (
    <div id="skills" className="tech-carousel-block">
      <div className="tech-carousel-header">
        <span className="font-accent text-[11px] font-semibold tracking-widest uppercase text-(--muted-foreground)">
          Tech Stack &amp; Tools
        </span>
        <span className="tech-header-line" aria-hidden="true" />
      </div>

      {/* Track 1 — Scrolls Left */}
      <div
        className="marquee-container marquee-mask overflow-hidden py-1.5"
        aria-label="Frontend and Engineering Tech Stack"
      >
        <div className="animate-marquee flex items-center gap-3 pr-3">
          {rowA.map((skill, index) => (
            <TickerBadge key={`track1-${skill}-${index}`} name={skill} />
          ))}
        </div>
      </div>

      {/* Track 2 — Scrolls Right */}
      <div
        className="marquee-container marquee-mask overflow-hidden py-1.5"
        aria-label="Design and Workflow Tech Stack"
      >
        <div className="animate-marquee-reverse flex items-center gap-3 pr-3">
          {rowB.map((skill, index) => (
            <TickerBadge key={`track2-${skill}-${index}`} name={skill} />
          ))}
        </div>
      </div>

      <style>{`
        .tech-carousel-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 28px;
          margin-top: 28px;
          border-top: 1px solid var(--border);
        }

        .tech-carousel-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 8px;
        }

        .tech-header-line {
          flex: 1;
          height: 1px;
          background-color: var(--border);
        }

        .tech-carousel-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          background-color: var(--surface);
          border: 1px solid var(--border);
          white-space: nowrap;
          user-select: none;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      background-color var(--motion-instant) var(--motion-easing),
                      transform var(--motion-instant) var(--motion-easing);
        }

        .tech-carousel-pill:hover {
          border-color: var(--primary);
          background-color: var(--surface-muted);
          transform: translateY(-2px);
        }

        .tech-carousel-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          color: var(--foreground);
        }

        .tech-carousel-name {
          font-family: var(--font-primary);
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  );
}
