// src/sections/Contact.jsx
import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-status-error)" }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-status-success)" }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const MAX_MESSAGE = 2000;

function validateForm(fields) {
  const errors = {};
  if (!fields.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!fields.email.trim()) {
    errors.email = "Please enter a valid email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Please enter your message.";
  }
  return errors;
}

export default function Contact() {
  const formRef = useScrollReveal();

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE) return;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validateForm({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;

    setTouched({ name: true, email: true, message: true });
    const newErrors = validateForm(fields);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const first = ["name", "email", "message"].find((f) => newErrors[f]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const isLocked = isSending || status === "success";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="portfolio-section">
      <div className="container">
        <div className="contact-split-layout">
          {/* Left Column: Section Heading & Copy */}
          <div className="contact-header-col">
            <SectionHeader
              number="06"
              eyebrow="Get in Touch"
              heading="Let's Work Together"
              description="Have an idea, project, or opportunity in mind? Drop a message and let's start a conversation."
              headingId="contact-heading"
            />
          </div>

          {/* Right Column: Compact Contact Form */}
          <div ref={formRef} className="reveal contact-form-col">
            <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="clean-contact-form">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                autoComplete="off"
              />

              {status === "success" && (
                <div role="status" aria-live="polite" className="form-status-banner banner-success">
                  <CheckCircleIcon />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div role="alert" aria-live="assertive" className="form-status-banner banner-error">
                  <ErrorIcon />
                  <span>Couldn&apos;t send your message. Please try again.</span>
                </div>
              )}

              <div className="form-two-cols">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    disabled={isLocked}
                    className={`form-input-field ${touched.name && errors.name ? "has-error" : ""}`}
                  />
                  {touched.name && errors.name && (
                    <span className="form-error-msg"><ErrorIcon /> {errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    disabled={isLocked}
                    className={`form-input-field ${touched.email && errors.email ? "has-error" : ""}`}
                  />
                  {touched.email && errors.email && (
                    <span className="form-error-msg"><ErrorIcon /> {errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <span className="form-char-count">{fields.message.length}/{MAX_MESSAGE}</span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project, idea, or questions..."
                  rows={4}
                  disabled={isLocked}
                  className={`form-input-field form-textarea-field ${touched.message && errors.message ? "has-error" : ""}`}
                />
                {touched.message && errors.message && (
                  <span className="form-error-msg"><ErrorIcon /> {errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                id="contact-submit"
                disabled={isLocked}
                className={`btn-primary form-submit-btn ${isLocked ? "btn-disabled" : ""}`}
              >
                <SendIcon />
                <span>{isSending ? "Sending…" : status === "success" ? "Message Sent" : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-split-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .contact-split-layout {
            grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
            gap: 48px;
          }

          .contact-header-col > div {
            margin-bottom: 0 !important;
          }
        }

        .clean-contact-form {
          padding: 28px;
          border-radius: var(--radius-lg);
          background-color: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        @media (max-width: 640px) {
          .clean-contact-form {
            padding: 22px;
          }
        }

        .form-two-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .form-two-cols {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--foreground);
        }

        .form-char-count {
          font-size: 11px;
          color: var(--muted-foreground);
        }

        .form-input-field {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: var(--surface-muted);
          color: var(--foreground);
          font-family: var(--font-primary);
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color var(--motion-instant) var(--motion-easing),
                      background-color var(--motion-instant) var(--motion-easing);
        }

        .form-input-field:focus {
          border-color: var(--primary);
          background-color: var(--surface);
          box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.15);
        }

        .form-input-field.has-error {
          border-color: var(--color-status-error);
        }

        .form-textarea-field {
          height: auto;
          min-height: 110px;
          padding: 12px 14px;
          resize: vertical;
          line-height: 22px;
        }

        .form-error-msg {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--color-status-error);
        }

        .form-status-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 14px;
        }

        .banner-success {
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #065F46;
        }

        .banner-error {
          background-color: rgba(244, 41, 2, 0.1);
          border: 1px solid rgba(244, 41, 2, 0.3);
          color: var(--color-status-error);
        }

        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 46px;
          padding: 0 26px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }

        .btn-disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
