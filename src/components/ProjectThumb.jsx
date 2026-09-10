/* eslint-disable react/prop-types -- small presentational helper */

/**
 * Hand-drawn mark per project. Every path uses `currentColor` so the card can
 * tint the whole illustration with the project's accent colour.
 */
const marks = {
  mefaltauno: (
    <>
      <rect x="6" y="14" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <path d="M32 14v36" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <path d="M6 24h7v16H6M58 24h-7v16h7" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <circle cx="32" cy="32" r="4.5" fill="currentColor" />
      <path
        d="M44 45a6 6 0 1 1 12 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="35" r="3.5" fill="currentColor" />
    </>
  ),
  lugarcito: (
    <>
      <path
        d="M32 8c-8.8 0-16 7-16 15.7C16 35.5 32 56 32 56s16-20.5 16-32.3C48 15 40.8 8 32 8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <circle cx="32" cy="23" r="5.5" fill="currentColor" />
      <path d="M22 44c3 3 6.5 4.5 10 4.5s7-1.5 10-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M52 18v10M56 18v10M54 28v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M8 18c0 5 2 7 4 7s4-2 4-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  tudivan: (
    <>
      <path
        d="M10 40V28a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <rect x="6" y="34" width="42" height="12" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.75" />
      <path d="M12 46v5M42 46v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M16 30h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path
        d="M52 12c-3.3 0-6 2.6-6 5.8 0 4.4 6 9.2 6 9.2s6-4.8 6-9.2c0-3.2-2.7-5.8-6-5.8z"
        fill="currentColor"
      />
    </>
  ),
  'cv-analyzer-ai-portfolio': (
    <>
      <rect x="14" y="8" width="34" height="44" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M21 20h20M21 28h20M21 36h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="44" cy="44" r="10" fill="currentColor" />
      <path d="M40 44l3 3 5-6" stroke="var(--navy-900)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  TranscribeAI: (
    <>
      <rect x="26" y="8" width="12" height="26" rx="6" fill="currentColor" opacity="0.85" />
      <path d="M18 28a14 14 0 0 0 28 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 42v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 54h24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M8 22v8M14 18v16M50 18v16M56 22v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
    </>
  ),
};

const fallback = (
  <>
    <rect x="10" y="12" width="44" height="40" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path d="M22 24l-6 8 6 8M42 24l6 8-6 8M36 22l-8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

export function ProjectThumb({ id, className = 'project-thumb' }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {marks[id] ?? fallback}
      </svg>
    </div>
  );
}
