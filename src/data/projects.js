// src/data/projects.js
// Project showcase data — update content here, not in components

export const projects = [
  {
    id: "proj-1",
    title: "E-Commerce Dashboard",
    category: "Full-stack Web Application",
    summary:
      "A comprehensive admin dashboard for managing products, orders, and analytics. Built to handle real-time data updates with an intuitive interface that reduces cognitive load for store managers.",
    role: "Frontend Developer & UI Designer",
    contribution:
      "Designed the entire UI system in Figma, then implemented it using React with a focus on data visualization and performance. Integrated REST APIs for live data and built reusable chart components.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API", "Recharts"],
    image: null, // will use placeholder
    links: {
      github: null,
      demo: null,
      figma: null,
    },
  },
  {
    id: "proj-2",
    title: "Personal Finance Tracker",
    category: "Frontend/Web Development",
    summary:
      "A clean and accessible web application for tracking income and expenses. Features intuitive data entry, monthly summaries, and visual breakdowns that help users understand their spending patterns.",
    role: "Frontend Developer",
    contribution:
      "Built the complete frontend using React and implemented local state management for real-time calculations. Focused on accessibility and mobile-first responsive layout.",
    tech: ["React", "JavaScript", "CSS Modules", "Chart.js"],
    image: null,
    links: {
      github: null,
      demo: null,
      figma: null,
    },
  },
  {
    id: "proj-3",
    title: "Restaurant Ordering App — UI/UX",
    category: "UI/UX Design",
    summary:
      "End-to-end UI/UX design project for a restaurant digital ordering system. Covers the full customer journey from menu browsing to checkout, with accessibility and mobile usability as core requirements.",
    role: "UI/UX Designer",
    contribution:
      "Conducted user research and competitive analysis, created wireframes and user flows, then designed high-fidelity prototypes in Figma including a reusable component library.",
    tech: ["Figma", "Prototyping", "User Research", "Design System"],
    image: null,
    links: {
      github: null,
      demo: null,
      figma: null,
    },
  },
  {
    id: "proj-4",
    title: "Portfolio Website",
    category: "Frontend/Web Development",
    summary:
      "This portfolio website — designed and built from scratch. Implements a complete design token system, light/dark mode, scroll animations, accessible modal dialogs, and a responsive layout.",
    role: "Frontend Developer & UI Designer",
    contribution:
      "Designed the visual system based on a detailed design guide, then implemented it with React and Tailwind CSS v4. Focused on performance, accessibility, and maintainability.",
    tech: ["React", "Vite", "Tailwind CSS v4", "CSS Variables"],
    image: null,
    links: {
      github: "https://github.com/gunturlistyo",
      demo: null,
      figma: null,
    },
  },
];

export const projectCategories = [
  "All",
  "Frontend/Web Development",
  "UI/UX Design",
  "Full-stack Web Application",
];
