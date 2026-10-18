
export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Song = {
  spotify: string; // open.spotify.com/track/... URL
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type FreelanceProject = {
  title: string;
  category: string;
  description: string;
  overview: string;
  responsibilities: string[];
  technologies: string[];
  fullStack: string[];
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export type OpenSourceContribution = {
  title: string;
  repo: string;
  prNumber: number;
  url: string;
  status: "Merged";
  description: string;
  technologies: string[];
};

export const site = {
  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  name: "Sohil Khan",

  firstName: "Sohil",

  url: "https://sohil-k16.github.io",

  quote: {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },

  profileImages: [
    "/profile.jpg",
  ],

  bannerImage: "/banner-mountain.jpg",

  socialBannerImage: "/banner-mountain.jpg",

  initials: "SK",

  role: "Software Engineer | Full-Stack Developer",

  location: "Delhi, India",

  timezone: "Asia/Kolkata",

  email: "sohilk.1607@gmail.com",

  greeting: "Hey, I'm Sohil", 

  tagline:
    "I build full-stack web applications and AI-powered products, turning ideas into useful software.",

  // =========================================================
  // ABOUT
  // =========================================================

  about: [
    "I'm Sohil Khan, a 2026 Computer Science and Engineering graduate focused on building full-stack web applications and AI-powered products. I enjoy turning ideas into useful software using modern frontend technologies, backend APIs, and databases.",

    "I work primarily with React, Next.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, TypeScript, Docker, and modern AI tooling, taking an idea from the initial concept all the way to a working product.",

    "Currently open to Software Engineer and Full-Stack Developer opportunities — I'd love to build products that solve real problems.",
  ],

  tldr: [
    "Building full-stack products.",
    "Exploring AI-powered applications.",
    "Learning system design.",
    "Looking for SDE roles.",
  ],

  // =========================================================
  // CURRENT STATUS
  // =========================================================

  status: {
    available: true,

    availableText:
      "open to software engineering and full-stack opportunities",

    nowLearning: "System Design · DSA · Backend Engineering · DevOps",

    nowBuilding:
      "BrandBid — a brand visibility leaderboard platform",

    nowListening:
      "focus playlists",
  },

  // =========================================================
  // SOCIAL LINKS
  // =========================================================

  socials: {
    github:
      "https://github.com/Sohil-K16",

    twitter:
      "",

    linkedin:
      "https://www.linkedin.com/in/sohil-khan-549024351/",

    email:
      "mailto:sohilk.1607@gmail.com",

    resume: "",

    discord:
      "",

    medium:
      "",
  },

  // =========================================================
  // EXPERIENCE
  // =========================================================

experience: [
  {
    company: "HCLTech",
    role: "Data Analyst Intern",
    period: "July 2025 – September 2025",
    blurb:
      "Worked on data cleaning and preparation, data extraction, analysis, visualization, reporting, and process automation. Supported senior team members in preparing reports for business and client meetings.",
    url: "https://www.hcltech.com/",
  },
] as Job[],

  // =========================================================
  // FREELANCE PROJECTS
  // =========================================================
  // Empty for now. Add real client work here later.
  // =========================================================

  freelanceProjects: [] as FreelanceProject[],

  // =========================================================
  // PROJECTS
  // =========================================================


projects: [
  {
    title: "BrandBid",

    blurb:
      "A leaderboard platform where brands and startups compete for visibility through paid placements.",

    stack: [
      "Next.js",
      "TypeScript",
      "Payments",
      "Database",
    ],

    year: "2026",

    links: {},

    status: "In Progress",

    featured: true,

    categories: [
      "Fullstack",
      "Frontend",
    ],
  },

  {
    title: "File Upload & Sharing App",

    blurb:
      "A full-stack application for uploading and sharing files with authentication and file management.",

    stack: [
      "React",
      "Spring Boot",
      "MongoDB",
      "Tailwind CSS",
      "Clerk Authentication",
    ],

    year: "2025",

    links: {},

    status: "In Progress",

    featured: true,

    categories: [
      "Fullstack",
      "Backend",
    ],
  },
] as Project[],



  // =========================================================
  // SKILLS
  // =========================================================

  skills: [
    // Languages
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Python",

    // Frontend
    "React.js",
    "Next.js",
    "Tailwind CSS",

    // Backend
    "Node.js",
    "Express.js",
    "REST APIs",
    "LLM APIs",

    // Database
    "MongoDB",
    "MySQL",
    "PostgreSQL",

    // DevOps / Cloud
    "Docker",
    "Git",
    "GitHub",
  ],

  // =========================================================
  // WRITING
  // =========================================================
  // Empty until you have your own articles.
  // =========================================================

  writing: [] as Post[],

  // =========================================================
  // OPEN SOURCE
  // =========================================================
  // Empty until genuine contributions are added.
  // =========================================================

  openSourceContributions: [] as OpenSourceContribution[],

  // =========================================================
  // GITHUB
  // =========================================================

  github: {
    username: "Sohil-K16",

    contributionsLastYear: "",
  },

  // =========================================================
  // SONGS (Spotify)
  // =========================================================
  // Add open.spotify.com/track/... URLs here — one per playlist row.
  // Then run `npm run songs:sync` so the player can bake in the
  // title, artist, cover art and 30s preview.
  // =========================================================

  songs: [
    {
      spotify: "https://open.spotify.com/track/0DTSnA1bcVI5niJzoyBPyZ",
    },
    {
      spotify: "https://open.spotify.com/track/22NHkFYbgxB2Zirj29Gbp8",
    },
    {
      spotify: "https://open.spotify.com/track/0eAuGrXyGFYwur9ARUe7LJ",
    },
    {
      spotify: "https://open.spotify.com/track/1XrSjpNe49IiygZfzb74pk",
    },
    {
      spotify: "https://open.spotify.com/track/3sK8wGT43QFpWrvNQsrQya",
    },
    {
      spotify: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P",
    },
    {
      spotify: "https://open.spotify.com/track/6Ec5LeRzkisa5KJtwLfOoW",
    },
  ] as Song[],

  // =========================================================
  // FOOTER
  // =========================================================

  footerNote: "Built by Sohil Khan",
} as const;

export type Site = typeof site;

