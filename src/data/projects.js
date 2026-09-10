const GITHUB_USER = 'Amures';

/**
 * Featured products: live, in production, with a real audience.
 * `id` is also the key used by ProjectThumb to pick an illustration.
 */
export const featuredProjects = [
  {
    id: 'mefaltauno',
    title: 'Me Falta Uno',
    tagline: 'Pickup football, solved',
    description:
      'Marketplace for 5-a-side football in Uruguay: players find a match from the mobile app, while venue owners run courts, bookings, catalogue and revenue from this web portal. Includes a Mercado Pago subscription flow and a computer-vision service that tracks players on court.',
    liveUrl: 'https://mefaltauno.uy/',
    role: 'Full-stack · web portal, API and mobile app',
    tech: ['React', 'TypeScript', 'Node.js', 'Prisma', 'React Native', 'Docker'],
    accent: '#cdea5a',
  },
  {
    id: 'lugarcito',
    title: 'Lugarcito',
    tagline: 'Find your place by describing it',
    description:
      'Discovery and booking platform for bars, restaurants and cafés. You describe out loud the kind of place you feel like and it returns nearby venues that are open and match, with instant reservation. Venue owners get a dashboard for their profile, menu, events and bookings.',
    liveUrl: 'https://unlugarcito.com/',
    role: 'Full-stack · web app and owner dashboard',
    tech: ['Next.js', 'React 19', 'Tailwind CSS', 'Zod', 'Node.js'],
    accent: '#ff8a5b',
  },
  {
    id: 'tudivan',
    title: 'Tu Diván',
    tagline: 'Teleconsultation built for therapists',
    description:
      'Practice platform for independent psychologists: video session, encrypted clinical notes and scheduling in a single screen, so the clinical record and the invoice fall out of the session itself. Multi-tenant with per-organisation encryption keys.',
    liveUrl: 'https://tudivan-web.vercel.app/',
    role: 'Full-stack · product architecture and implementation',
    tech: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'BullMQ', 'Turborepo'],
    accent: '#8b7cf6',
  },
  {
    id: 'cv-analyzer-ai-portfolio',
    title: 'CV Analyzer AI',
    tagline: 'Match a CV against a job description',
    description:
      'Upload a CV and a job posting and get a structured read on how well they line up: matching skills, gaps and suggested rewrites, powered by Google Gemini.',
    liveUrl: 'https://cv-analyzer-ai-portfolio.vercel.app/',
    repo: 'cv-analyzer-ai-portfolio',
    role: 'Solo project',
    tech: ['React', 'Vite', 'Google Gemini'],
    accent: '#2ea6f2',
  },
  {
    id: 'TranscribeAI',
    title: 'TranscribeAI',
    tagline: 'Transcribe and translate any recording',
    description:
      'Drop in audio or video and get a transcript back, with optional translation. Built on Whisper for speech-to-text and MyMemory for translation.',
    liveUrl: 'https://transcribe-ai-eight.vercel.app/',
    repo: 'TranscribeAI',
    role: 'Solo project',
    tech: ['React', 'Whisper', 'MyMemory API'],
    accent: '#2ea6f2',
  },
];

/** Smaller public repositories, shown as a compact list. */
export const repoProjects = [
  {
    slug: 'React-MERN-backend',
    title: 'MERN backend',
    description: 'API backend for the MERN calendar stack.',
  },
  {
    slug: 'react-MERN-frontend',
    title: 'MERN frontend',
    description: 'Calendar app, React front end.',
  },
  {
    slug: 'journal-app',
    title: 'Journal app',
    description: 'Personal journal web app.',
  },
  {
    slug: 'custom-hooks',
    title: 'Custom hooks',
    description: 'Reusable React hooks collection.',
  },
  {
    slug: 'react-gife-expert',
    title: 'GifExpert',
    description: 'GIF search demo app.',
  },
  {
    slug: 'portfolio-react',
    title: 'This portfolio',
    description: 'The site you are looking at. React + Vite, no UI framework.',
  },
];

export const githubProfileUrl = `https://github.com/${GITHUB_USER}?tab=repositories`;

export const repoUrl = (slug) => `https://github.com/${GITHUB_USER}/${slug}`;
