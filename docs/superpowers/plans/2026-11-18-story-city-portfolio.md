# Story City Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page with a scroll-driven, five-chapter illustrated story of Krish's journey, ending in one real 3D "lights out" race car moment, while keeping the project pages and contact form.

**Architecture:** Story content lives in one data module (`lib/story.js`) that every renderer reads. A `Chapter` component pins each chapter with GSAP ScrollTrigger and scrubs parallax layers and the travelling avatar through it. Chapter 5's 3D scene is a React Three Fiber component, dynamically imported only when a capability check passes; otherwise a 2D version renders. A separate static renderer of the same data serves reduced-motion visitors.

**Tech Stack:** Next.js 16 (App Router, JS), React 19, Tailwind CSS 4, Motion 14 (`motion/react`), GSAP 3 + ScrollTrigger, three + @react-three/fiber, Vitest + Testing Library + jsdom, cwebp/Pillow for assets.

**Spec:** `docs/superpowers/specs/2026-11-18-story-city-portfolio-design.md`

## Global Constraints

- Branch `story-city` in `/Users/krishkumar/Downloads/github/MY-PORTFOLIO-`. Never push without Krish's go-ahead. No `Co-Authored-By: Claude` trailers in commits.
- Palette (unchanged tokens in `app/globals.css`): sky `#A8DDF3`, teal `#7FD6CF`, ink `#15212B`, mustard `#E3A73A`, paper `#F6FBFD`. Night scenes add navy `#0F1B2D` and window-light `#FFD58A`.
- Fonts stay Bricolage Grotesque (display) and Instrument Sans (body).
- Performance budget: under 2.5 MB transferred before the 3D scene loads; the 3D scene adds under 1.5 MB.
- No studio-owned characters (Naruto, Marvel) or athletes' likenesses as artwork. Naming interests in copy is fine.
- Tone rule: every `low` beat is immediately followed by a `next` beat (what Krish did next).
- Do not publish `design-assets/photos/dps-tapi-class.jpg` (other children's faces; Krish not yet identified in it). Friends appear only after Krish confirms their consent; until then the crew panel uses the canteen illustration with names, which Krish supplied for that purpose.
- Dates follow the documents: PRISM internship Mar–Aug 2025 (certificate), Infosys Mar–Apr 2026, PRISM Excellence Award 2026, prize ₹80,000.
- Accessibility: every photo and illustration with meaning has alt text; decorative layers `aria-hidden`; full keyboard access to all links; visible focus (already in `globals.css`).

## Review Focus

1. A phone rotates or the window resizes mid-story: pinned chapters must re-measure (ScrollTrigger refresh) and not leave blank gaps. Test in Task 4.
2. A visitor lands on `/#projects` or `/#contact`: they must arrive at that section, not at the top of the story. Test in Task 9.
3. The 3D chunk fails to load or the WebGL context is lost: the 2D lights-out version must appear instead of an empty box. Test in Task 7.
4. Reduced motion is on: no pinning, no scrubbing, no 3D; the whole story reads top to bottom with photos. Test in Task 8.
5. Slow network: photos and scene art must reserve their space (explicit width/height) so text does not jump. Test in Task 3.

---

## File structure

```
lib/story.js                      chapter + beat data (single source of truth)
lib/capability.js                 canRun3D(env) pure function + readEnv() browser probe
components/story/Story.js         client entry: picks animated vs static renderer
components/story/Chapter.js       pinned chapter shell (GSAP), renders scene + beats
components/story/Beat.js          one beat card: low / next / win / note, optional photo
components/story/Traveler.js      avatar with motion states
components/story/scenes/*.js      SVG scenes (Surat, Crossroads, Canteen, Rooftops, Ground, Grid, Tower)
components/story/LightsOut.js     loader: 3D or 2D by capability, error boundary
components/story/LightsOut3D.js   React Three Fiber scene
components/story/LightsOut2D.js   SVG/CSS fallback
components/story/StaticStory.js   reduced-motion renderer
scripts/process-photos.sh         source photos -> public/photos/*.webp
scripts/shoot.mjs                 headless-Chrome screenshots (desktop 1360, phone 390 via iframe)
tests/*.test.js                   Vitest tests
```

Existing files kept: `components/{AvatarProvider,Avatar,Bubble,Nav,Footer,Peek,Projects,ProjectVisual,Contact,Section,BrandIcons,SetMood}.js`, `app/projects/[slug]/page.js`, `lib/data.js`. Removed in Task 9: `components/{Hero,Experience,Skills,Recognition,Stars}.js` (the story replaces them).

---

### Task 1: Test setup and story data

**Files:**
- Create: `vitest.config.mjs`, `tests/setup.js`, `lib/story.js`, `tests/story.test.js`
- Modify: `package.json` (scripts `test`, devDependencies)

**Interfaces:**
- Produces: `export const chapters: Chapter[]` where
  `Chapter = { id: 'surat'|'lost'|'crew'|'grind'|'lightsout', number: 1..5, title: string, years: string, scene: 'surat'|'crossroads'|'canteen'|'rooftops'|'grid', mood: 'confident'|'thoughtful'|'laughing'|'surprised'|'excited', travel: 'walk'|'run'|'drive', beats: Beat[] }`
  `Beat = { kind: 'note'|'low'|'next'|'win', text: string, photo?: { src: string, alt: string, w: number, h: number }, link?: { href: string, label: string } }`
  `export function lowsFollowedByNext(chapters): string[]` returns ids of chapters that break the tone rule.

- [ ] **Step 1:** `npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`; add `"test": "vitest run"`. Config: jsdom environment, `@` alias to project root, setup file imports `@testing-library/jest-dom/vitest`.
- [ ] **Step 2: Write the failing tests** in `tests/story.test.js`:

```js
import { chapters, lowsFollowedByNext } from '@/lib/story';
test('five chapters in order', () => {
  expect(chapters.map(c => c.id)).toEqual(['surat', 'lost', 'crew', 'grind', 'lightsout']);
  expect(chapters.map(c => c.number)).toEqual([1, 2, 3, 4, 5]);
});
test('every low is followed by what Krish did next', () => {
  expect(lowsFollowedByNext(chapters)).toEqual([]);
});
test('facts match the documents', () => {
  const text = JSON.stringify(chapters);
  expect(text).toContain('10/10');
  expect(text).toContain('₹80,000');
  expect(text).toContain('Mar – Aug 2025');
  expect(text).toContain('Infosys');
  expect(text).not.toMatch(/dps-tapi-class/);
});
test('every photo has alt text and dimensions', () => {
  for (const b of chapters.flatMap(c => c.beats)) if (b.photo) {
    expect(b.photo.alt.length).toBeGreaterThan(10);
    expect(b.photo.w).toBeGreaterThan(0); expect(b.photo.h).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 3:** `npm test` → FAIL (module not found).
- [ ] **Step 4: Write `lib/story.js`.** Copy is fixed by these beats (wording can be tightened, facts cannot change):
  1. **Surat** (`travel: 'walk'`, mood confident): note "Grew up in Surat, Gujarat, by the Tapi river." photo `childhood-with-mom`; note "Family first, always." photo `family`.
  2. **Lost** (2023–24, mood thoughtful): low "First year at SRM. No idea what to build or where I was heading." next "So I picked the one thing I could control: my grades." photo `srm-campus`.
  3. **The crew** (2024–25, mood laughing, `travel: 'run'`): win "Second year: a perfect 10/10 CGPA." note "Started building real products, and found my people: Aditya, Aabidha, Vinith and Swastik." photo `/art/crew-canteen.webp`; win "Won the Red Bull Basement Hackathon, 2024."
  4. **The grind** (2025–26, mood surprised then excited): note "Joined the iOS Development Program and built ParentBud." low "Rejected by the App Store. Then rejected again." next "Fixed it, resubmitted, and kept going." link `/projects/parentbud`; low "Samsung PRISM, Mar – Aug 2025: six months on LLM-powered SQL optimization with almost no background in it. Late nights, harsh feedback from mentors, and plenty of self-doubt." photo `prism-lab-2`; next "Learned it anyway, one night at a time." link `/projects/sql-optimizer`; win "Samsung PRISM Excellence Award and ₹80,000 prize money." photo `prism-certificate`; win "Academic Excellence Award and a performance-based scholarship."
  5. **Lights out** (2026–, mood excited, `travel: 'drive'`): note "First step into industry: iOS Developer Intern at Infosys, Mysuru, Mar – Apr 2026." photo `infosys-team-steps`; note "Now: placements, interviews and new projects." note "Still figuring it out. That's the point." link `#projects` "See what I've built".
  `lowsFollowedByNext` returns chapter ids where a `low` beat's next beat is not `next`.
- [ ] **Step 5:** `npm test` → PASS.
- [ ] **Step 6:** Commit `feat: story data with tone-rule tests`.

### Task 2: Device capability check

**Files:** Create `lib/capability.js`, `tests/capability.test.js`

**Interfaces:**
- Produces: `canRun3D({ webgl2: boolean, deviceMemory?: number, cores?: number, reducedMotion: boolean, saveData: boolean }): boolean` and `readEnv(): same shape` (browser only).

- [ ] **Step 1: Failing tests:**

```js
import { canRun3D } from '@/lib/capability';
const ok = { webgl2: true, deviceMemory: 8, cores: 8, reducedMotion: false, saveData: false };
test('capable desktop', () => expect(canRun3D(ok)).toBe(true));
test('no WebGL2', () => expect(canRun3D({ ...ok, webgl2: false })).toBe(false));
test('reduced motion', () => expect(canRun3D({ ...ok, reducedMotion: true })).toBe(false));
test('data saver', () => expect(canRun3D({ ...ok, saveData: true })).toBe(false));
test('low memory phone', () => expect(canRun3D({ ...ok, deviceMemory: 2 })).toBe(false));
test('few cores', () => expect(canRun3D({ ...ok, cores: 2 })).toBe(false));
test('unknown memory (Safari) is allowed', () => expect(canRun3D({ ...ok, deviceMemory: undefined })).toBe(true));
```

- [ ] **Step 2:** run → FAIL. **Step 3:** implement (thresholds: memory ≥ 4 when known, cores ≥ 4 when known). `readEnv` uses `canvas.getContext('webgl2')`, `navigator.deviceMemory`, `navigator.hardwareConcurrency`, `matchMedia('(prefers-reduced-motion: reduce)')`, `navigator.connection?.saveData`. **Step 4:** run → PASS. **Step 5:** commit `feat: 3D capability check`.

### Task 3: Assets pipeline

**Files:** Create `scripts/process-photos.sh`; outputs `public/photos/*.webp`, `public/art/crew-canteen.webp`; Create `tests/assets.test.js`

- [ ] **Step 1: Failing test:** for every `photo.src` in `chapters`, the file exists under `public/` and is under 220 KB; total of `public/photos` + `public/art` under 1.2 MB.
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** script: `cwebp -q 78 -resize 1200 0` for landscape photos, `-resize 0 1200` for portrait, certificate `-q 85 -resize 1400 0`, canteen art `-q 82 -resize 1024 0`. Excludes `dps-tapi-class.jpg`. Strips EXIF (cwebp default drops metadata; verify with `webpinfo`). Record each output's width/height into the matching `photo.w/h` in `lib/story.js`.
- [ ] **Step 4:** run → PASS. **Step 5:** commit `feat: optimized story photos`.

### Task 4: Chapter shell, beats and traveller

**Files:** Create `components/story/Chapter.js`, `components/story/Beat.js`, `components/story/Traveler.js`, `tests/chapter.test.js`

**Interfaces:**
- Consumes: `Chapter`, `Beat` (Task 1); `AvatarFace`, `useAvatar` (existing `components/Avatar.js`, `components/AvatarProvider.js`).
- Produces: `<Chapter chapter={Chapter} Scene={Component} />`; `<Beat beat={Beat} />`; `<Traveler travel="walk|run|drive" progress={MotionValue<number>} />`. `Scene` components accept `{ progress: MotionValue<number> }` (0→1 through the chapter).

- [ ] **Step 1: Failing tests:** rendering `<Chapter>` for chapter `grind` shows heading text `The grind`, an `h2` with the chapter number, every beat's text, and `low` beats carry `data-kind="low"`; images render with `width`/`height` attributes (Review Focus 5).
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** Implement. Desktop (≥ 1024px): pin the chapter for `beats.length * 70vh`, scrub a horizontal track of beat cards across the scene with `gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), scrollTrigger: { pin: true, scrub: 1, end: () => '+=' + ... , invalidateOnRefresh: true } })`. Phone: no pin; beats stack vertically, scene sits as a sticky backdrop. Register `ScrollTrigger` once; call `ScrollTrigger.refresh()` on `orientationchange` (Review Focus 1). On enter, `setBase({ mood, say: chapter.title })`. Beat styles: `low` = navy card with a small dented-corner shape; `next` = white sticker card with a mustard left rule; `win` = mustard card. Traveler: `walk` = 0.5s step bob + slight lean; `run` = faster bob + 8° lean + motion streaks; `drive` = avatar inside a simple side-view car SVG with Krish's number `27` (Krish to confirm the number). Avatar x follows `progress`.
- [ ] **Step 4:** run → PASS; `node scripts/shoot.mjs /` (Task 9 creates the script; until then use the command from Task 9 inline) and inspect one desktop and one 390px frame.
- [ ] **Step 5:** commit `feat: chapter shell, beats and traveller`.

### Task 5: Scenes for chapters 1–3

**Files:** Create `components/story/scenes/Surat.js`, `Crossroads.js`, `Canteen.js`, `tests/scenes.test.js`

- [ ] **Step 1: Failing test:** each scene renders an `svg` with `aria-hidden="true"` and at least three `[data-depth]` layers.
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** Each scene: 3–4 layers (`data-depth` 0.2 / 0.5 / 1) moving at `progress * depth * -120px`. Surat: dusk sky, Tapi river band, city skyline silhouettes, a bridge. Crossroads: signposts pointing many ways (labels: "Web?", "ML?", "iOS?", "Drop out?"), fog layer. Canteen: warm interior, tables and green chairs echoing the crew art, the crew image framed on the wall layer. Ink 2px outlines, palette tokens only.
- [ ] **Step 4:** run → PASS; screenshot check. **Step 5:** commit `feat: scenes for Surat, first year and the crew`.

### Task 6: Scenes for chapter 4

**Files:** Create `components/story/scenes/Rooftops.js`, `Ground.js`; extend `tests/scenes.test.js`

- [ ] **Step 1:** failing test as Task 5 for both scenes, plus `Ground` exposes `[data-scoreboard]` containing "Samsung PRISM Excellence Award".
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** Rooftops (night, navy + window light): rows of flat roofs, water tanks, a lit laptop window, a stack of App Store rejection notes that grows with `progress`, a headband-style cloth fluttering on the avatar (original design, no clan symbols). Ground: floodlit cricket ground, scoreboard lines lighting up one by one as `progress` crosses 0.25/0.5/0.75 with the three wins from chapter 4.
- [ ] **Step 4:** run → PASS; screenshot check. **Step 5:** commit `feat: night rooftops and scoreboard scenes`.

### Task 7: Lights out (3D with 2D fallback)

**Files:** Create `components/story/LightsOut.js`, `LightsOut3D.js`, `LightsOut2D.js`, `components/story/scenes/Grid.js`, `tests/lightsout.test.js`; `npm i three @react-three/fiber`

**Interfaces:**
- Consumes: `canRun3D`, `readEnv` (Task 2).
- Produces: `<LightsOut progress={MotionValue<number>} />`.

- [ ] **Step 1: Failing tests:** with `canRun3D` mocked false → renders `LightsOut2D` (`data-testid="lightsout-2d"`). With it true but the 3D import rejecting → still renders 2D (Review Focus 3). Five light elements exist and switch from red to off as progress passes 0.2, 0.35, 0.5, 0.65, then all go out at 0.8.
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** `LightsOut` loads `LightsOut3D` with `next/dynamic(..., { ssr: false })` only when the chapter is within one viewport (IntersectionObserver) and `canRun3D(readEnv())`; wraps it in an error boundary and listens for `webglcontextlost` to swap to 2D. 3D scene: low-poly track ribbon, gantry with five red lights, an original open-wheel car built from primitives in mustard/ink with number `27`, camera behind the car; at lights out the car launches down the track and the camera follows. `<Canvas dpr={[1, 1.75]} frameloop="demand">`, invalidate on progress change. 2D: same beat in SVG with a speed-lines launch. After the launch, the chapter ends at `components/story/scenes/Tower.js`: a hero tower with an original emblem (a mustard "K" inside a rounded shield, ink outline) lighting up, the avatar on the roof with the excited face, and the last beat's link to `#projects`. Add a test: `Tower` renders `[data-emblem]`.
- [ ] **Step 4:** run → PASS; build and confirm the 3D chunk is separate and under 1.5 MB (`ls -la .next/static/chunks` after `npm run build`).
- [ ] **Step 5:** commit `feat: lights-out moment with 3D and 2D versions`.

### Task 8: Reduced-motion story

**Files:** Create `components/story/StaticStory.js`, `components/story/Story.js`, `tests/static.test.js`

**Interfaces:** `<Story />` renders `<StaticStory chapters />` when `prefers-reduced-motion: reduce`, else the animated chapters with their scenes (map `scene` → component).

- [ ] **Step 1: Failing test:** with `matchMedia` mocked to reduce, `<Story />` renders all five chapter headings, every beat, no element with `data-pinned`, and no `canvas` (Review Focus 4).
- [ ] **Step 2:** run → FAIL. **Step 3:** implement: chapters stacked, each with its scene as a static image (scene SVG at progress 0.5), beats as a list, photos inline. **Step 4:** run → PASS. **Step 5:** commit `feat: reduced-motion story`.

### Task 9: Page assembly, navigation and verification

**Files:** Modify `app/page.js`, `components/Nav.js`, `components/Peek.js`; delete `components/{Hero,Experience,Skills,Recognition,Stars}.js`; Create `scripts/shoot.mjs`, `tests/page.test.js`; update `README.md`

- [ ] **Step 1: Failing test:** `app/page.js` renders, in order, the story intro (h1 "Krish Kumar" plus the thesis line "Someone who refused to stop figuring things out."), `<Story />`, `#projects`, `#contact`; Nav links are `Story` (`/#story`), `Projects`, `Contact`, `Resume`.
- [ ] **Step 2:** run → FAIL.
- [ ] **Step 3:** Implement. Intro is a short full-height opener: name, thesis line, "Scroll to start" cue, avatar standing at the city edge. Hash landing (Review Focus 2): on load, if `location.hash` targets `#projects`/`#contact`, call `ScrollTrigger.refresh()` then `scrollIntoView` after pins are measured. `Peek` hides while a chapter is pinned (the traveller is already on screen). `scripts/shoot.mjs` takes a path and writes `desktop.png` (1360×860 at several scroll offsets) and `phone.png` (390px iframe page) to the scratchpad using headless Chrome with `--virtual-time-budget=6000`.
- [ ] **Step 4:** `npm test` → all PASS; `npm run build` → success; check first-load JS + images under 2.5 MB (sum of `.next` route manifest assets + above-the-fold images); screenshots at desktop and 390px look right with no horizontal overflow.
- [ ] **Step 5:** commit `feat: story home page`.

---

## Open items for Krish (do not block tasks)

- Friends' consent to appear on the public site.
- Car number (plan uses `27` as a placeholder).
- Whether to use the DPS Tapi class photo (excluded by default).
