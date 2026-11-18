# Story city portfolio: design

Date: 2026-11-18. Status: draft, awaiting Krish's approval.

## Intent

The portfolio tells Krish's story from Surat to placements as one scroll-driven journey through an illustrated city. Anyone can be the visitor: a recruiter, a friend, someone curious. They should leave knowing the story and impressed by the design.

The thesis, in Krish's words: *portray me as someone who refused to stop figuring things out.*

## Goals

- Tell the story in five chapters, in order, with honest lows and earned wins.
- Make the avatar feel alive: walking, running, driving, reacting, with expression changes.
- Weave Krish's passions (F1, Naruto, cricket, Marvel) into the story as story beats, not wallpaper.
- Give one real 3D moment: the race car at lights-out.
- Run smoothly on phones and desktops.

## Non-goals

- A full 3D city or a 3D model of Krish (approach B was dropped as too complex).
- A CMS or editable content. Content lives in code.
- Replacing the project detail pages or the contact form. Both stay.

## Anti-goals (failure even if it works)

- The lows read as self-pity or sympathy-seeking.
- The wins read as handed out rather than earned.
- It stutters or drains battery on a mid-range Android phone.
- People can't find the projects, the resume or a way to contact Krish.
- It uses studio-owned characters (Naruto, Marvel) or athletes' likenesses as artwork. Naming them as personal interests is fine; Krish's own photos are fine.

## Approaches considered

- **A. 2.5D illustrated scroll story.** Layered parallax scenes, 2D avatar with motion. Light, phone-friendly. No real 3D.
- **B. True 3D city (React Three Fiber).** Biggest desktop wow. Needs a 3D Krish, 5–15 MB, phone performance risk. Krish first chose this, then judged it too complex.
- **C. A plus one real 3D moment. Chosen.** Everyone gets the full story fast. The single 3D scene (race car, lights-out) hits harder because it is the only one, and it is where the F1 passion lives.

## The story

Each chapter is a scene in the city. The avatar travels between them as the visitor scrolls.

1. **Surat.** Home, before code. Visual cues of Surat: the Tapi river, the city at dusk. The avatar as a kid-ish version is not needed; current avatar, nostalgic tone.
2. **Lost (1st year, SRM).** Confused, no direction. Avatar at a crossroads of signposts pointing everywhere. Decision: get the grades right first.
3. **The crew (2nd year).** Perfect 10/10 CGPA. Starts building real products. Aditya, Aabidha, Vinith and Swastik arrive (canteen scene, cut-outs from the supplied image). Red Bull Basement Hackathon win.
4. **The grind (3rd year).** Two threads, shown honestly:
   - iOS Development Program and ParentBud: repeated App Store rejection notices stacking up, then the app shipping.
   - Samsung PRISM, six months: little prior knowledge, late nights, harsh mentor feedback, self-doubt. Told on ninja-style rooftops at night (the never-give-up beat).
   - Payoff: Academic Excellence Award, performance-based scholarship, and the Samsung PRISM Excellence Award with ₹80k prize money, shown on a floodlit cricket-ground scoreboard.
5. **Lights out (4th year).** Infosys iOS internship (Mar–Apr 2026) as the first step into industry, then placements, interviews, projects. The real 3D moment: five red lights go out and the car launches. Ends at a hero tower with Krish's own emblem: "still figuring it out" and calls to action (projects, resume, contact).

Tone rule for lows: each low is one short, concrete beat (a rejection email, a 3 a.m. desk, a mentor's line), immediately followed by what Krish did next. No lingering, no sad music cues in copy.

## Visual language

- Carries over the current site's palette from the avatar art: sky `#A8DDF3`, teal `#7FD6CF`, ink `#15212B`, mustard `#E3A73A`, paper `#F6FBFD`. Night scenes (PRISM, rooftops) shift to a deep navy with warm window light.
- Illustrated, flat-shaded scenes with ink outlines, matching the cartoon avatar.
- Original nods only: race car with Krish's own number and livery; ninja-style rooftops and headband; cricket ground and scoreboard; hero tower with a personal emblem.

## Characters

- Krish: the five existing expression cut-outs (confident, laughing, thoughtful, surprised, excited) plus the expression sheet's side profiles for walking. Motion: bob, lean, squash and stretch, tilt, shadow.
- Friends: cut out from the supplied canteen image. Krish confirms they are okay being on a public site. Krish offered more avatar art; if supplied, it replaces the cut-outs.

## How it is built (Krish's choice: C; tool calls are the builder's, stated here)

- Next.js app on the existing `MY-PORTFOLIO-` repo, branch `story-city`.
- Scroll-driven scenes with GSAP ScrollTrigger (pinning and scrubbing). Scenes are SVG and layered images.
- The 3D lights-out scene with React Three Fiber, loaded only when the visitor approaches chapter 5. On low-end devices (no WebGL2, low memory, or a slow GPU check) it is replaced by an animated 2D version.
- Reduced motion: scenes render as a static illustrated story, with no scrubbing or 3D.
- Existing project pages (`/projects/[slug]`) and contact form stay; linked from chapter endings and the final stop.
- Performance budget: under 2.5 MB before the 3D scene loads; 3D scene adds under 1.5 MB; 60 fps target on desktop, smooth on a mid-range phone.

## Left to the builder

- Exact scene compositions and illustration details.
- Copy wording within the tone rule.
- Animation timing and easing.
- Whether scenes travel horizontally or vertically on phones.

## Open with Krish

- Friends' consent to appear.
- Any extra assets: friends' avatars, real photos (Surat, hackathon, PRISM award).
