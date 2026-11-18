# Krish Kumar, portfolio

Personal portfolio built with Next.js, Tailwind CSS and Motion. A cartoon avatar guides visitors and reacts as they browse: it laughs on hover, gets thoughtful over projects and explains them, and looks surprised when poked.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `lib/data.js`: all content (experience, projects, skills, awards)
- `components/`: page sections and the avatar system (`AvatarProvider`, `Avatar`, `Peek`, `Bubble`)
- `app/projects/[slug]`: one page per project, generated at build time
- `public/avatar/`: expression cut-outs; `public/shots/`: project screenshots
