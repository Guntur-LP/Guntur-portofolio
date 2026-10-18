// src/hooks/useTheme.js
import { useState, useEffect, useCallback } from "react";

/**
 * Theme hook that syncs with localStorage and system preference.
 * Sets data-theme attribute on <html> element.
 * Wrapped in try/catch to handle environments where localStorage is unavailable.
 */
export function useTheme() {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch (_) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
