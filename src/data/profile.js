// src/data/profile.js
// Central content file — update here, not in components

export const profile = {
  name: "Guntur Listyo Prabowo",
  initials: "GLP",
  headline: "Building Thoughtful Digital Experiences.",
  subheadline: "A Frontend Developer and UI/UX Designer focused on creating intuitive interfaces and polished web experiences.",
  bio: `I'm Guntur — a Frontend Developer and UI/UX Designer passionate about crafting digital products that feel great to use. I bridge the gap between design and engineering, ensuring that every interface I build is both visually cohesive and technically solid.`,
  bio2: `My approach centers on understanding user needs first, then translating them into clean, accessible, and performant interfaces. Whether working on complex web applications or precise design systems, I bring the same attention to detail and care for quality.`,
  location: "Indonesia",
  available: true,

  links: {
    github: "https://github.com/gunturlistyo",
    linkedin: "https://linkedin.com/in/gunturlistyo",
    email: "gunturlistyo@gmail.com",
    cv: null, // Set to "/cv.pdf" when file is ready
  },

  skills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Vite",
    ],
    design: [
      "UI/UX Design",
      "Figma",
      "Design Systems",
      "Prototyping",
      "User Research",
      "Wireframing",
      "Responsive Design",
    ],
    tools: [
      "Git & GitHub",
      "VS Code",
      "Vercel",
      "REST API",
      "Node.js",
      "shadcn/ui",
    ],
  },

  experience: [
    {
      id: "exp-1",
      role: "UI Designer",
      company: "PT.Telkom Indonesia",
      period: "Feb 2025 — Feb 2026",
      contributions: [
        "Designed responsive web and mobile interfaces for Antares Eazy, supporting a consistent user experience across devices",
        "Designed and refined Eazy Store features, including checkout, transaction status, and shipment tracking, to improve access to order information",
        "Created wireframes, user flows, high-fidelity UI designs, and interactive prototypes in Figma for web, dashboard, and IoT monitoring features.",
        "Collaborated with Product Managers and Developers to align UI designs with product requirements and support implementation"
      ],
    },
  ],

  services: [
    {
      id: "svc-1",
      icon: "monitor",
      title: "Frontend Development",
      description:
        "Building fast, accessible, and maintainable web applications using modern frameworks like React and Next.js — with a strong focus on performance and code quality.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "svc-2",
      icon: "pen-tool",
      title: "UI/UX Design",
      description:
        "Designing intuitive user interfaces and experiences from research through high-fidelity prototypes — creating design systems that scale and feel cohesive.",
      tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    },
    {
      id: "svc-3",
      icon: "layers",
      title: "Full-Stack Integration",
      description:
        "Connecting frontend interfaces with backend services and APIs — building complete, production-ready web solutions with clean architecture.",
      tags: ["Node.js", "REST API", "Vercel", "GitHub"],
    },
  ],
};
