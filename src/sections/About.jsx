// src/sections/About.jsx
import SectionHeader from "../components/SectionHeader";
import TechStackTicker from "../components/TechStackTicker";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

export default function About() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-section"
      style={{ paddingTop: "clamp(28px, 3.5vw, 44px)" }}
    >
      <div className="container">
        <SectionHeader
          number="02"
          eyebrow="About & Tech Stack"
          heading="Crafting Interfaces That Matter"
          description="I believe good design and clean code are inseparable — both serve the same goal of creating experiences people love to use."
          headingId="about-heading"
        />

        <div ref={sectionRef} className="reveal about-scaffold-panel">
          <div className="about-prose-grid">
            <p className="about-lead">{profile.bio}</p>
            <p className="about-text">{profile.bio2}</p>
          </div>

          <TechStackTicker />
        </div>
      </div>

      <style>{`
        .about-scaffold-panel {
          padding: clamp(24px, 3.2vw, 36px);
          border-radius: var(--radius-lg);
          background-color: var(--surface);
          border: 1px solid var(--border);
        }

        .about-prose-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items: start;
        }

        @media (min-width: 900px) {
          .about-prose-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        .about-lead {
          font-size: clamp(1.04rem, 1.45vw, 1.15rem);
          line-height: 1.7;
          font-weight: 500;
          color: var(--foreground);
          margin: 0;
        }

        .about-text {
          font-size: 15px;
          line-height: 1.75;
          color: var(--muted-foreground);
          margin: 0;
        }
      `}</style>
    </section>
  );
}
