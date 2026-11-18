/**
 * Krish's story, chapter by chapter. Every renderer (animated, static) reads this.
 * Facts come from Krish's own account, his resume and his certificates. Don't invent any.
 * Tone rule: every `low` beat is followed by a `next` beat (what he did about it).
 */

const photo = (name, alt, w, h) => ({ src: `/photos/${name}.webp`, alt, w, h });

export const chapters = [
  {
    id: 'surat',
    number: 1,
    title: 'Surat',
    years: 'Where it starts',
    scene: 'surat',
    mood: 'confident',
    travel: 'walk',
    line: 'Before the code, there was home.',
    beats: [
      { kind: 'note', text: 'I grew up in Surat, Gujarat, by the Tapi river.', photo: photo('childhood-with-mom', 'Young Krish in a purple striped shirt, hugged by his mother', 798, 1200) },
      { kind: 'note', text: 'Family first, always. They’re the reason I keep going.', photo: photo('family', 'Krish taking a selfie with his mother and father at night', 1200, 900) },
    ],
  },
  {
    id: 'lost',
    number: 2,
    title: 'Lost',
    years: '2023 – 24',
    scene: 'crossroads',
    mood: 'thoughtful',
    travel: 'walk',
    line: 'Everyone seemed to know where they were going. I didn’t.',
    beats: [
      { kind: 'low', text: 'First year at SRM. I had no idea what to build, what to learn, or where I was heading.', photo: photo('srm-campus', 'Krish standing outside an SRM University building in an orange striped t-shirt', 900, 1200) },
      { kind: 'next', text: 'So I picked the one thing I could control: my grades. I showed up, every single day.' },
    ],
  },
  {
    id: 'crew',
    number: 3,
    title: 'The crew',
    years: '2024 – 25',
    scene: 'canteen',
    mood: 'laughing',
    travel: 'run',
    line: 'Things change when you find your people.',
    beats: [
      { kind: 'win', text: 'Second year: a perfect 10/10 CGPA.' },
      { kind: 'note', text: 'I started building real products, and found my people: the friends I still build with.' },
      { kind: 'win', text: 'Won the Red Bull Basement Hackathon, 2024.' },
    ],
  },
  {
    id: 'grind',
    number: 4,
    title: 'The grind',
    years: '2025 – 26',
    scene: 'rooftops',
    mood: 'surprised',
    travel: 'run',
    line: 'The year that tested everything.',
    beats: [
      { kind: 'note', text: 'I joined the iOS Development Program and started building ParentBud, an app for parents.' },
      { kind: 'low', text: 'Rejected by the App Store. Then rejected again. And again.' },
      { kind: 'next', text: 'I read every rejection, fixed what they flagged, and resubmitted. Each one taught me something the docs didn’t.', link: { href: '/projects/parentbud', label: 'See ParentBud' } },
      { kind: 'low', text: 'Samsung PRISM, Mar – Aug 2025: six months on LLM-powered SQL optimization with almost no background in it. Late nights, harsh feedback from mentors, and plenty of self-doubt.', photo: photo('prism-lab-2', 'Krish and a teammate working late at a lab computer with code on screen', 1200, 900) },
      { kind: 'next', text: 'I learned it anyway, one night at a time, with my teammates beside me.', link: { href: '/projects/sql-optimizer', label: 'See the SQL optimizer' } },
      { kind: 'win', text: 'Samsung PRISM Excellence Award, and ₹80,000 in prize money.', photo: photo('prism-certificate', 'Samsung PRISM Certificate of Excellence awarded to Krish Kumar for LLM Powered SQL Optimization', 1400, 924) },
      { kind: 'win', text: 'Academic Excellence Award at SRM, and a performance-based scholarship.' },
    ],
  },
  {
    id: 'lightsout',
    number: 5,
    title: 'Lights out',
    years: '2026 →',
    scene: 'grid',
    mood: 'excited',
    travel: 'drive',
    line: 'Five red lights. Then go.',
    beats: [
      { kind: 'note', text: 'First step into industry: iOS Developer Intern at Infosys, Mysuru, Mar – Apr 2026.', photo: photo('infosys-team-steps', 'Krish holding a stack of completion certificates with five fellow interns on the Infosys campus steps', 1200, 900) },
      { kind: 'note', text: 'Now: placements, interviews and new projects.' },
      { kind: 'note', text: 'Still figuring it out. That’s the point.', link: { href: '#projects', label: 'See what I’ve built' } },
    ],
  },
];

/** Ids of chapters where a `low` beat is not immediately followed by a `next` beat. */
export function lowsFollowedByNext(list) {
  return list
    .filter((c) => c.beats.some((b, i) => b.kind === 'low' && c.beats[i + 1]?.kind !== 'next'))
    .map((c) => c.id);
}
