// src/data/projects.js
// Project showcase data — update content here, not in components

export const projects = [
  {
    id: "proj-1",
    title: "JCC Website",
    category: "Frontend Web Application",
    summary:
      "A web application for Jakarta Convention Center (JCC) that helps users explore venue rental options for various events, such as conferences, exhibitions, and other gatherings. Users can browse available rental packages, compare prices and included facilities, and check ongoing events to learn more about activities taking place at the venue.",
    role: "Frontend Developer & UI/UX Designer",
    contribution:
      "Designed the UI/UX in Figma, including the page layouts and user interface components, then developed the web application using HTML, CSS, and JavaScript. Focused on presenting venue rental information, package details, pricing, and event listings in a clear and organized way to make the website easy to navigate.",
    tech: ["Figma", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/Project1.jpg",
    links: {
      github: "https://github.com/Guntur-LP/Project-HCI",
      demo: null,
      figma: null,
    },
  },
  {
    id: "proj-2",
    title: "Brain Academy",
    category: "UI/UX Design",
    summary:
      "Brain Academy is an online learning platform that allows users to access learning materials and complete quizzes to test their understanding. The platform uses a points-based system to encourage users to actively participate in learning activities. Users can earn points by completing quizzes and collect badges based on their achievements, making the learning experience more interactive and engaging.",
    role: "UI/UX Designer",
    contribution:
      "Designed the UI/UX of Brain Academy in Figma, including page layouts, quiz interfaces, and point and badge elements. Focused on creating a user-friendly interface that makes learning activities easy to navigate and encourages users to engage with the platform.",
    tech: ["Figma", "Prototyping", "User Research", "Design System"],
    image: "/images/projects/Project2.jpg",
    links: {
      github: null,
      demo: null,
      figma: "https://www.figma.com/design/Jk7XUV64DZP9hVCctVEqyL/Mulmed-System?node-id=0-1&t=CK01pw91pXFZMg7k-1",
    },
  },
  {
    id: "proj-3",
    title: "RenovaHome",
    category: "UI/UX Design",
    summary:
      "RenovaHome is a website designed to showcase home renovation services and property development projects. It allows visitors to explore different services, browse completed projects such as houses, apartments, villas, and resorts, and learn about renovation plans and pricing. The website also provides information about the team, company background, and contact details to help potential clients learn more about the business.",
    role: "UI/UX Designer",
    contribution:
      "Designed the UI/UX of the RenovaHome website, focusing on page layouts, visual elements, and content organization. Worked on presenting renovation services, project galleries, pricing information, and company details in a clear and consistent way. Focused on creating an intuitive browsing experience that helps visitors explore the website and find relevant information easily.",
    tech: ["Figma", "Prototyping", "User Research", "Design System"],
    image: "/images/projects/Project3.jpg",
    links: {
      github: null,
      demo: null,
      figma: "https://www.figma.com/file/XKpD62W3qmqP67kw2a3jSU/Untitled?type=design&node-id=0%3A1&mode=design&t=blhn4mW5gSddpL2e-1",
    },
  },
  {
    id: "proj-4",
    title: "Game Development Project",
    category: "Frontend/Web Development",
    summary:
      "A 2D platformer game developed in Unity where players control a character that can move through the environment and fight enemies. Players can collect heart icons to restore health and coins to increase their in-game currency. The game also features dungeon areas filled with regular enemies and boss fights, adding more challenges to the gameplay.",
    role: "Game Developer",
    contribution:
      "Developed a 2D platformer game using Unity, implementing character movement, combat mechanics, and collectible items such as health-restoring hearts and coins. Worked on gameplay features involving enemy encounters and dungeon exploration, including regular enemies and boss battles.",
    tech: ["Unity", "C#"],
    image: "/images/projects/Project4.png",
    links: {
      github: "https://github.com/Guntur-LP/Project_Game",
      demo: null,
      figma: null,
    },
  },
  {
    id: "proj-5",
    title: "Factit - AI Image Verification WebApp",
    category: "Full-stack Web Application",
    summary:
      "Fact.it is a web application designed to detect potential deepfake images using a deep learning model based on Convolutional Neural Networks (CNN). Users can upload images for analysis and view prediction results to help identify potentially manipulated facial images. The platform also provides user authentication, detection history, and PDF report exports, allowing users to review and manage their detection results.",
    role: "Frontend Developer & UI/UX Designer",
    contribution:
      "Designed the UI/UX in Figma and developed the frontend using React JS. Built responsive interfaces for image uploads, detection results, authentication, detection history, and PDF report exports. Integrated the frontend with the FastAPI backend and PostgreSQL database to support data exchange, user authentication, and access to detection history. Focused on creating a clear and user-friendly experience throughout the application.",
    tech: ["Figma", "React JS", "Python", "Machine Learning", "PostgreSQL"],
    image: "/images/projects/Project5.png",
    links: {
      github: null,
      demo: "https://factit.online/",
      figma: null,
    },
  },
];

export const projectCategories = [
  "All",
  "Frontend Web Application",
  "UI/UX Design",
  "Frontend/Web Development",
  "Full-stack Web Application",
];
