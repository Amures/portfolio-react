# Portfolio — Antonio Mures

Single-page portfolio built with React + Vite. No UI framework: the design system
lives in `src/index.css` as CSS custom properties, and each component keeps its own
stylesheet in `src/assets/styles/`.

Live at <https://antonio-mures.vercel.app/>.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the build
npm run lint
```

### Environment

Copy `.env.example` to `.env` and fill in the contact-form key:

| Variable | What it does |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | [Web3Forms](https://web3forms.com) access key used by the contact form. If it is missing, the form tells the visitor to email instead of failing silently. |

On Vercel the same variable has to be set in *Project → Settings → Environment Variables*.

## Structure

```
index.html              SEO/meta, fonts, JSON-LD
src/
  index.css             design tokens, reset, shared .btn/.section/.container
  main.jsx
  pages/
    App.jsx             header + main + waves + footer
    HomePage.jsx        the five sections, in order
  components/
    NavHeader.jsx       sticky header, mobile drawer, scroll-spy
    Hero.jsx  About.jsx  Projects.jsx  Skills.jsx  Contact.jsx
    ProjectCard bits:   ProjectThumb.jsx (per-project SVG marks)
    Curves.jsx          decorative wave band above the footer
    SocialIcons.jsx     inline brand SVGs
    ScrollToTopButton.jsx
  data/projects.js      single source of truth for the work section
  hooks/
    useReveal.js        IntersectionObserver scroll reveal
    useScrollSpy.js     highlights the current section in the header
  utils/booking.js      calendar link
  assets/               images, icons, CV, per-component CSS
```

### Adding a project

Everything in the *Work* section comes from `src/data/projects.js`:

- `featuredProjects` — the big cards. Give it an `id`, copy, `tech`, `liveUrl`,
  an `accent` colour (it tints the card) and optionally `repo`.
- `repoProjects` — the compact "Also on GitHub" list, keyed by repo `slug`.

If you add a featured project, add a matching SVG mark under the same `id` in
`components/ProjectThumb.jsx`; without one it falls back to a generic code icon.

## Deployment

Vercel, static build from `dist/`. `vercel.json` adds the SPA rewrite,
long-lived caching for hashed assets and a few security headers.
