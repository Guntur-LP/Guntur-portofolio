// src/sections/Contact.jsx
import { useState, useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { profile } from "../data/profile";

// Send icon
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// Error icon
function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-status-error)" }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// Check icon (success)
function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-status-success)" }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function FormField({ id, label, type = "text", required, error, children, charCount, maxChars }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "14px",
          fontWeight: "var(--font-weight-strong)",
          color: "var(--color-text-primary)",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--color-text-secondary)", fontWeight: 400, marginLeft: "4px" }}>
            (required)
          </span>
        )}
      </label>

      {children}

      {/* Char count */}
      {maxChars && (
        <p
          aria-live="polite"
          style={{
            fontSize: "12px",
            color: "var(--color-text-secondary)",
            margin: 0,
            alignSelf: "flex-end",
          }}
        >
          {charCount}/{maxChars}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontSize: "13px",
            color: "var(--color-status-error)",
            margin: 0,
          }}
        >
          <ErrorIcon />
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  height: "44px",
  padding: "0 var(--space-4)",
  borderRadius: "var(--radius-md)",
  border: `1.5px solid ${hasError ? "var(--color-status-error)" : "var(--color-border-strong)"}`,
  backgroundColor: "var(--color-surface-raised)",
  color: "var(--color-text-primary)",
  fontSize: "16px",
  fontFamily: "var(--font-primary)",
  outline: "none",
  boxSizing: "border-box",
  transition: `border-color var(--motion-instant) var(--motion-easing)`,
});

const textareaStyle = (hasError) => ({
  width: "100%",
  minHeight: "140px",
  padding: "var(--space-4)",
  borderRadius: "var(--radius-md)",
  border: `1.5px solid ${hasError ? "var(--color-status-error)" : "var(--color-border-strong)"}`,
  backgroundColor: "var(--color-surface-raised)",
  color: "var(--color-text-primary)",
  fontSize: "16px",
  fontFamily: "var(--font-primary)",
  lineHeight: "24px",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
  transition: `border-color var(--motion-instant) var(--motion-easing)`,
});

const MAX_MESSAGE = 2000;

function validateForm(fields) {
  const errors = {};
  if (!fields.name.trim()) {
    errors.name = "Enter your name so I know who to reply to.";
  }
  if (!fields.email.trim()) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }
  if (!fields.message.trim()) {
    errors.message = "Enter a message before sending.";
  }
  return errors;
}

export default function Contact() {
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const firstErrorRef = useRef(null);

  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE) return;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change (after touch)
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
    if (honeypot) return; // Spam protection

    setTouched({ name: true, email: true, message: true });
    const newErrors = validateForm(fields);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first error field
      const firstErrorField = ["name", "email", "message"].find(
        (f) => newErrors[f]
      );
      if (firstErrorField) {
        document.getElementById(`contact-${firstErrorField}`)?.focus();
      }
      return;
    }

    setStatus("sending");

    // Simulate submission (replace with actual form service endpoint)
    try {
      // TODO: Replace with actual form service (e.g. Formspree, EmailJS)
      await new Promise((res) => setTimeout(res, 1500));
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        paddingBlock: "var(--space-8)",
        backgroundColor: "var(--color-surface-muted)",
      }}
    >
      <div className="container">
        <SectionHeader
          number="07"
          eyebrow="Contact"
          heading="Let's Work Together"
          description="Have a project in mind, a role to discuss, or just want to say hello? I'd love to hear from you."
          headingId="contact-heading"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-8)",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Contact info */}
          <div ref={infoRef} className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <div
              style={{
                padding: "var(--space-9)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-raised)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--font-accent)",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 var(--space-5) 0",
                }}
              >
                Direct Contact
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {profile.links.email && (
                  <a
                    href={`mailto:${profile.links.email}`}
                    id="contact-email-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      color: "var(--color-text-primary)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      fontSize: "15px",
                    }}
                  >
                    {profile.links.email}
                  </a>
                )}
                {profile.links.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-linkedin-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      color: "var(--color-text-primary)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      fontSize: "15px",
                    }}
                  >
                    LinkedIn Profile
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                )}
              </div>
            </div>

            <div
              style={{
                padding: "var(--space-9)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-raised)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--font-accent)",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 var(--space-4) 0",
                }}
              >
                Response Time
              </h3>
              <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", margin: 0, lineHeight: "24px" }}>
                I typically respond within 1–2 business days. For urgent matters, please reach out directly via email.
              </p>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="reveal">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              style={{
                padding: "var(--space-9)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-default)",
                backgroundColor: "var(--color-surface-raised)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {/* Honeypot — hidden from users and screen readers */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                autoComplete="off"
              />

              {/* Success message */}
              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    padding: "var(--space-5)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-surface-muted)",
                    border: "1px solid var(--color-status-success)",
                    fontSize: "15px",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <CheckCircleIcon />
                  Message sent. I'll get back to you soon.
                </div>
              )}

              {/* Error banner */}
              {status === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-)",
                    padding: "var(--space-5)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-surface-muted)",
                    border: "1px solid var(--color-status-error)",
                    fontSize: "14px",
                    color: "var(--color-status-error)",
                  }}
                >
                  <ErrorIcon />
                  <span>
                    Couldn't send your message. Try again, or{" "}
                    <a
                      href={`mailto:${profile.links.email}`}
                      style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px" }}
                    >
                      email me directly
                    </a>
                    .
                  </span>
                </div>
              )}

              {/* Name */}
              <FormField
                id="contact-name"
                label="Name"
                required
                error={touched.name ? errors.name : undefined}
              >
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={touched.name && !!errors.name ? "true" : undefined}
                  aria-describedby={touched.name && errors.name ? "contact-name-error" : undefined}
                  disabled={isSending || status === "success"}
                  style={inputStyle(touched.name && !!errors.name)}
                  className="contact-input"
                />
              </FormField>

              {/* Email */}
              <FormField
                id="contact-email"
                label="Email"
                type="email"
                required
                error={touched.email ? errors.email : undefined}
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-required="true"
                  aria-invalid={touched.email && !!errors.email ? "true" : undefined}
                  aria-describedby={touched.email && errors.email ? "contact-email-error" : undefined}
                  disabled={isSending || status === "success"}
                  style={inputStyle(touched.email && !!errors.email)}
                  className="contact-input"
                />
              </FormField>

              {/* Message */}
              <FormField
                id="contact-message"
                label="Message"
                required
                error={touched.message ? errors.message : undefined}
                charCount={fields.message.length}
                maxChars={MAX_MESSAGE}
              >
                <textarea
                  id="contact-message"
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project or idea..."
                  aria-required="true"
                  aria-invalid={touched.message && !!errors.message ? "true" : undefined}
                  aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
                  disabled={isSending || status === "success"}
                  style={textareaStyle(touched.message && !!errors.message)}
                  className="contact-textarea"
                />
              </FormField>

              {/* Submit */}
              <button
                type="submit"
                id="contact-submit"
                disabled={isSending || status === "success"}
                aria-busy={isSending}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-3)",
                  width: "100%",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  backgroundColor:
                    isSending || status === "success"
                      ? "var(--color-surface-muted)"
                      : "var(--color-action-primary-bg)",
                  color:
                    isSending || status === "success"
                      ? "var(--color-text-disabled)"
                      : "var(--color-action-primary-fg)",
                  fontSize: "16px",
                  fontWeight: "var(--font-weight-strong)",
                  cursor: isSending || status === "success" ? "not-allowed" : "pointer",
                  transition: `background-color var(--motion-instant) var(--motion-easing)`,
                }}
                className={isSending || status === "success" ? "" : "submit-btn"}
              >
                <SendIcon />
                {isSending ? "Sending…" : status === "success" ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-input:hover, .contact-textarea:hover {
          border-color: var(--color-text-primary) !important;
        }
        .contact-input:focus, .contact-textarea:focus {
          outline: 2px solid var(--color-focus-ring) !important;
          outline-offset: 2px !important;
          border-color: var(--color-text-primary) !important;
        }
        .submit-btn:hover {
          background-color: var(--color-action-primary-bg-hover) !important;
        }
        .submit-btn:active {
          background-color: var(--color-action-primary-bg-active) !important;
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

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 360px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
