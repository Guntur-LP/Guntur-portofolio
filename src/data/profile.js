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
      role: "Frontend Developer",
      company: "Freelance",
      period: "2023 — Present",
      description:
        "Designing and developing custom web applications and interfaces for clients across various industries. Focus on clean code, performance, and exceptional user experience.",
      contributions: [
        "Built responsive web applications using React and Next.js",
        "Designed UI components with Figma and implemented them in production",
        "Optimized web performance to achieve Core Web Vitals targets",
      ],
    },
    {
      id: "exp-2",
      role: "UI/UX Designer",
      company: "Academic Projects — Bina Nusantara University",
      period: "2022 — Present",
      description:
        "Led design initiatives for multiple academic projects, creating comprehensive design systems and prototypes that bridge user needs with technical constraints.",
      contributions: [
        "Created user research-driven prototypes and design systems in Figma",
        "Collaborated with development teams to ensure design implementation fidelity",
        "Conducted usability testing and iterated designs based on feedback",
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
