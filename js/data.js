/**
 * data.js — Central content store for Mohamuud Nuur Abdullahi (Muudhi).
 * All portfolio content is cleanly rendered by main.js from this store.
 *
 * Editable placeholders are marked with square brackets (e.g. [School / Institute Name]).
 * Empty URLs ("") are skipped by the renderer so no broken or dead buttons appear.
 */

const profileData = Object.freeze({
  name: "Mohamuud Nuur Abdullahi",
  nickname: "Muudhi",
  title: "Computer Science Student & Web Developer",
  location: "Mogadishu, Somalia",
  email: "exmuudhi@gmail.com",
  cvFile: "assets/Mohamuud_Nuur_Abdullahi_CV.pdf", // Place your PDF in assets/ folder with this name
  socials: [
    { id: "github", label: "GitHub", icon: "github", url: "https://github.com/MUUDHI", display: "github.com/MUUDHI" },
    { id: "email", label: "Email", icon: "mail", url: "mailto:exmuudhi@gmail.com", display: "exmuudhi@gmail.com" },
    { id: "linkedin", label: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/in/[your-username]", display: "linkedin.com/in/[your-username]" }
  ]
});

const aboutData = Object.freeze({
  stats: [
    { value: "2", label: "Practical projects built for Murtazim Academy" },
    { value: "Active", label: "Early-stage CS student building real software" }
  ],
  direction: [
    "Building practical, real-world web projects to reinforce hands-on development.",
    "Strengthening computer science fundamentals, logic, and problem-solving skills.",
    "Expanding core foundations in HTML5, CSS3, JavaScript, Python, and modern tooling.",
    "Growing into a disciplined, high-standard software professional."
  ]
});

const projectsData = [
  {
    id: "murtazim-portal",
    title: "Murtazim Academy Website",
    category: "Educational Website",
    description:
      "A clean, structured website project for Murtazim Academy, designed to present the school, its educational curriculum, and essential information to parents and students with a clear and professional presentation.",
    image: "assets/project-murtazim-web.png",
    imageAlt: "Preview illustration for the Murtazim Academy website project",
    features: [
      "Responsive layout for mobile and desktop screens",
      "Structured presentation of academic programs and school information",
      "Semantic HTML structure and clean CSS styling"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://murtazim-academy.netlify.app/",   // Add live URL when available
    githubUrl: "https://github.com/MUUDHI" // Project repository link
  },
  {
    id: "masms-system",
    title: "MASMS — Murtazim Academy School Management System",
    category: "School Management System",
    description:
      "A practical school management application designed to manage core school operations and academic records, including student data, subjects, fees, and exams.",
    image: "assets/project-masms.png",
    imageAlt: "Preview illustration for the MASMS school management system project",
    features: [
      "Student records and subject management",
      "Fee tracking and record keeping",
      "Exam information and academic data organization"
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Supabase", "Git & GitHub", "Vercel"],
    liveUrl: "https://masms.muudhi.workers.dev/login",   // Add live URL when available
    githubUrl: "https://github.com/MUUDHI" // Project repository link
  }
];

const skillsData = [
  {
    id: "web",
    category: "Web Development",
    icon: "code",
    items: [
      { name: "HTML5", level: "Core" },
      { name: "CSS3", level: "Core" },
      { name: "Responsive Web Design", level: "Applied" },
      { name: "JavaScript", level: "Developing" },
      { name: "DOM fundamentals", level: "Developing" }
    ]
  },
  {
    id: "programming",
    category: "Programming",
    icon: "cpu",
    items: [
      { name: "Python", level: "Developing" }
    ]
  },
  {
    id: "tools",
    category: "Tools & Platforms",
    icon: "tool",
    items: [
      { name: "Git", level: "Active" },
      { name: "GitHub", level: "Active" },
      { name: "VS Code", level: "Active" },
      { name: "Supabase", level: "Developing" },
      { name: "Vercel", level: "Developing" }
    ]
  }
];

const experienceData = [
  {
    id: "exp-cs-student",
    role: "Computer Science Student",
    organization: "Somali National University",
    date: "Present",
    description:
      "Pursuing undergraduate studies in Computer Science while actively building practical web applications and reinforcing technical fundamentals.",
    achievements: [
      "Studying core computing fundamentals and foundational software concepts.",
      "Translating coursework into practical projects including the Murtazim Academy website and MASMS.",
      "Consistently developing practical coding and problem-solving discipline through project work."
    ]
  },
  {
    id: "exp-teaching-cs",
    role: "Teacher — Computer Applications & Basics",
    organization: "Murtazim Academy",
    date: "2025 - Present",
    description:
      "Taught introductory computer applications and digital literacy, guiding students through practical computer usage and foundational tools.",
    achievements: [
      "Explained technical and software concepts clearly to beginner students.",
      "Guided hands-on computer sessions and helped students develop essential digital competencies.",
      "Prepared structured lesson plans and practical exercises."
    ]
  },
  {
    id: "exp-teaching-math-eng",
    role: "Teacher — Mathematics & English",
    organization: "Murtazim Academy",
    date: "2024 - 2025",
    description:
      "Delivered structured lessons in Mathematics and English / Pre-start English, emphasizing academic growth, understanding, and clear communication.",
    achievements: [
      "Broke down complex mathematical and language concepts into accessible, step-by-step lessons.",
      "Managed classroom activities, assessed student progress, and provided constructive feedback.",
      "Cultivated strong communication, patience, and leadership skills while mentoring students."
    ]
  }
];

// Certificates data: Pre-prepared structures for your credentials.
// Fill in the issuer, date, and optional credentialUrl for each entry.
const certificatesData = [
  {
    id: "cert-english",
    category: "English",
    name: "English Language Certificate",
    issuer: "[Issuing Institution / Academy]", // e.g. Murtazim Academy or Language Institute
    date: "[Date / Year]",                    // e.g. 2024
    credentialUrl: ""                         // Optional verification URL
  },
  {
    id: "cert-meta-frontend",
    category: "Web Development",
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",                // Replace or confirm issuer
    date: "[Date / Year]",                    // e.g. 2025 / In Progress
    credentialUrl: ""                         // Optional verification URL
  },
  {
    id: "cert-fcc-rwd",
    category: "Web Development",
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "[Date / Year]",                    // e.g. 2024
    credentialUrl: ""                         // Optional verification URL
  },
  {
    id: "cert-google-python",
    category: "Programming",
    name: "Google IT Automation with Python Professional Certificate",
    issuer: "Google / Coursera",              // Replace or confirm issuer
    date: "[Date / Year]",                    // e.g. 2025 / In Progress
    credentialUrl: ""                         // Optional verification URL
  }
];

const cvData = Object.freeze({
  summary:
    "Early-stage Computer Science student and web developer with practical experience building school management software and educational websites. Experienced in classroom teaching with strong communication and analytical skills.",
  education: [
    { title: "BSc in Computer Science (In Progress)", place: "Somali National University", date: "Present" }
  ],
  highlights: [
    "Developed the Murtazim Academy website and the MASMS school management system.",
    "Hands-on foundational skills in HTML5, CSS3, JavaScript, Python, Git/GitHub, Supabase, and Vercel.",
    "Teaching experience in Mathematics, English, and Computer Basics demonstrating strong communication and leadership.",
    "Fluent in Somali and proficient in English."
  ]
});
