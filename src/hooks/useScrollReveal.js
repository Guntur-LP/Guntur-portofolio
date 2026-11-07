// src/hooks/useScrollReveal.js
import { useEffect, useRef } from "react";

/**
 * Robust scroll reveal hook using IntersectionObserver.
 * Ensures elements already in/above viewport are immediately revealed.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(threshold = 0.05) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion, reveal immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.classList.add("revealed");
      return;
    }

    // Immediately reveal if already in or above viewport
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 1.05) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px 80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
