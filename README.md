# Krish Kumar, portfolio

Personal portfolio built with Next.js, Tailwind CSS and Motion. The home page is a five-chapter animated story, from Surat to placements, told through illustrated scenes, real photos and a reactive cartoon avatar. Chapter 5 has one real 3D moment (React Three Fiber) that loads only on capable devices, with a 2D version for everyone else and a still version for reduced motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run tests with `npm test`. Source photos live in the git-ignored `design-assets/`; `scripts/process-photos.sh` builds the web versions, and `node scripts/shoot.mjs <url> <dir>` takes desktop and phone screenshots.

## Where things live

- `lib/story.js`: the story, chapter by chapter (every low is followed by what happened next; tests enforce it)
- `components/story/`: chapter engine, beats, travelling avatar, scenes, lights-out 3D/2D, still version
- `lib/data.js`: project, experience, skills and awards content for the sections after the story
- `components/`: page sections and the avatar system (`AvatarProvider`, `Avatar`, `Peek`, `Bubble`)
- `app/projects/[slug]`: one page per project, generated at build time
- `public/avatar/`: expression cut-outs; `public/shots/`: project screenshots
