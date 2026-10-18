// src/hooks/useScrollReveal.js
import { useEffect, useRef } from "react";

/**
 * Scroll reveal hook using IntersectionObserver.
 * Adds .revealed class when element enters viewport.
 * Respects prefers-reduced-motion — elements are visible immediately.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion, skip animation
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
