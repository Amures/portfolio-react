/* eslint-disable react/prop-types -- small presentational helper */
const accent = '#2ea6f2';
const dim = '#8eb8d4';
const light = '#e8f4fc';

function SvgWrap({ children }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {children}
    </svg>
  );
}

const thumbs = {
  'React-MERN-backend': (
    <SvgWrap>
      <rect x="8" y="12" width="48" height="40" rx="4" stroke={accent} strokeWidth="2" fill="rgba(46,166,242,0.12)" />
      <path d="M16 24h32M16 32h24M16 40h28" stroke={light} strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="44" r="6" fill={accent} opacity="0.9" />
      <path d="M46 44l2 2 4-5" stroke="#002262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrap>
  ),
  'react-MERN-frontend': (
    <SvgWrap>
      <rect x="10" y="14" width="44" height="38" rx="3" stroke={accent} strokeWidth="2" fill="rgba(46,166,242,0.1)" />
      <rect x="14" y="20" width="36" height="26" rx="2" fill="rgba(0,34,98,0.5)" stroke={dim} strokeWidth="1" />
      <rect x="18" y="24" width="8" height="8" rx="1" fill={accent} opacity="0.85" />
      <rect x="30" y="24" width="8" height="8" rx="1" fill={dim} />
      <rect x="42" y="24" width="8" height="8" rx="1" fill={dim} />
      <rect x="18" y="36" width="32" height="6" rx="1" fill={light} opacity="0.35" />
    </SvgWrap>
  ),
  'journal-app': (
    <SvgWrap>
      <path
        d="M18 10h20c2 0 4 2 4 4v40c0 2-2 4-4 4H18c-2 0-4-2-4-4V14c0-2 2-4 4-4z"
        stroke={accent}
        strokeWidth="2"
        fill="rgba(46,166,242,0.12)"
      />
      <path d="M22 14h12v4H22v-4z" fill={accent} opacity="0.7" />
      <path d="M22 24h28M22 32h24M22 40h28" stroke={light} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </SvgWrap>
  ),
  'custom-hooks': (
    <SvgWrap>
      <path
        d="M44 12c-6 0-10 4-10 10 0 4 2 7 5 9-8 2-14 9-14 17v8h8v-8c0-4 4-8 9-8h2c5 0 9-4 9-9s-4-9-9-9z"
        stroke={accent}
        strokeWidth="2"
        fill="rgba(46,166,242,0.15)"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="48" r="4" fill={accent} />
      <path d="M24 44v-10" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </SvgWrap>
  ),
  'portfolio-react': (
    <SvgWrap>
      <rect x="8" y="16" width="48" height="34" rx="3" stroke={accent} strokeWidth="2" fill="rgba(46,166,242,0.1)" />
      <path d="M8 22h48" stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <circle cx="14" cy="19" r="2" fill={dim} />
      <circle cx="21" cy="19" r="2" fill={dim} />
      <circle cx="28" cy="19" r="2" fill={dim} />
      <path
        d="M22 36l4-8 4 8m-6-3h4M38 32l-3 6h6l-3-6z"
        stroke={light}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgWrap>
  ),
  'react-gife-expert': (
    <SvgWrap>
      <rect x="10" y="18" width="44" height="30" rx="3" stroke={accent} strokeWidth="2" fill="rgba(46,166,242,0.12)" />
      <rect x="14" y="22" width="36" height="22" rx="2" fill="rgba(0,34,98,0.45)" />
      <path d="M22 26h6v6h-6zM30 26h6v6h-6zM22 34h14v6H22z" fill={accent} opacity="0.55" />
      <path
        d="M40 38l6-4v8l-6-4z"
        fill={light}
        opacity="0.9"
      />
    </SvgWrap>
  ),
};

const fallback = (
  <SvgWrap>
    <rect x="12" y="12" width="40" height="40" rx="6" stroke={accent} strokeWidth="2" fill="rgba(46,166,242,0.1)" />
    <path d="M28 24l12 8-12 8V24z" fill={light} opacity="0.85" />
  </SvgWrap>
);

export function ProjectThumb({ slug }) {
  return <div className="project-thumb">{thumbs[slug] ?? fallback}</div>;
}
