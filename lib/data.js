export const links = {
  github: 'https://github.com/krishh-kumarr',
  linkedin: 'https://www.linkedin.com/in/krish-kumar-1a119728a/',
  instagram: 'https://www.instagram.com/__krish___2005/',
  email: 'krishneerajkumar@gmail.com',
  resume: '/Krish_Kumar.pdf',
};

export const experience = [
  {
    company: 'Infosys',
    role: 'iOS Developer Intern',
    place: 'Mysuru',
    when: 'Mar – Apr 2026',
    summary: 'Built features for a fleet management system.',
    points: [
      'Turned business requirements into iOS features with structured data handling and API integration.',
      'Improved data retrieval and app responsiveness through data quality checks, structured pipelines and performance testing.',
      'Worked in an Agile team with sprint reviews and code reviews.',
    ],
  },
  {
    company: 'Samsung PRISM',
    role: 'Virtual R&D Intern',
    place: 'Chennai',
    when: 'Apr – Aug 2025',
    summary: 'Found database bottlenecks and built query optimization tooling.',
    points: [
      'Designed and analysed SQL data pipelines, finding bottlenecks through query analysis and indexing strategies.',
      'Used statistical analysis and preprocessing to study query execution patterns and improve efficiency.',
      'Built data quality frameworks and optimization tooling.',
    ],
  },
  {
    company: 'Unicum Finance Consultant',
    role: 'Application Developer Intern',
    place: 'Chennai',
    when: 'Mar – Apr 2025',
    summary: 'Built an inventory and product tracking app for supply chains.',
    points: [
      'Built inventory and product tracking for supply chain distribution channels.',
      'Added data visualization and reporting dashboards for business decisions.',
      'Worked with stakeholders to map supply chain workflows and ship on time.',
    ],
  },
];

export const projects = [
  {
    slug: 'sql-optimizer',
    name: 'LLM-Powered SQL Query Optimization',
    short: 'SQL Query Optimizer',
    year: '2025 – 26',
    stack: ['Python', 'SQL', 'MySQL', 'NLP', 'ML'],
    summary: 'An NLP and LLM pipeline that rewrites SQL queries and recommends indexes.',
    result: '32% faster average execution across 500+ test queries',
    pitch: 'This one rewrites slow SQL with an LLM. Queries ran 32% faster on average.',
    tone: 'sky',
    code: 'https://github.com/krishh-kumarr/LLM_POWERED_SQL_OPTIMIZATION_QUERY_TUNING_WITH_AI',
    points: [
      'Built an end-to-end pipeline that uses NLP and a large language model to suggest SQL query improvements, trained on 10,000 examples.',
      'Applied ML and regression analysis to automate query rewriting and generate indexing recommendations.',
      'Evaluated across 500+ test queries: average execution time dropped by 32%, presented in a visual scorecard.',
    ],
    shots: [],
  },
  {
    slug: 'parentbud',
    name: 'ParentBud',
    short: 'ParentBud',
    year: '2025',
    stack: ['Swift', 'iOS'],
    summary: 'An iOS app that helps parents track routines and child development milestones.',
    result: 'Daily check-ins, care cards and a parent community',
    pitch: 'ParentBud is my iOS app for parents. Because kids don’t come with manuals.',
    tone: 'mustard',
    code: 'https://github.com/krishh-kumarr/Parent_Bud_02',
    points: [
      'Designed data structures for profiles, behaviour tracking and activity logs to forecast child development milestones.',
      'Built daily check-in flows and progress dashboards that surface insights to parents.',
      'Added care cards with routines like bedtime and healthy eating, plus Parent Pods for sharing moments.',
    ],
    shots: [
      { src: '/shots/parentbud-4.webp', alt: 'ParentBud welcome screen with an illustrated family and the line “Because kids don’t come with manuals”', w: 520, h: 995 },
      { src: '/shots/parentbud-1.webp', alt: 'ParentBud home screen showing a child profile, today’s tip and things to try', w: 520, h: 995 },
      { src: '/shots/parentbud-3.webp', alt: 'Care Cards screen with recommended routines and trending articles', w: 520, h: 995 },
      { src: '/shots/parentbud-2.webp', alt: 'Bedtime routine card with guidance for calming pre-sleep habits', w: 520, h: 995 },
      { src: '/shots/parentbud-5.webp', alt: 'Parent Pods community feed with posts from other parents', w: 520, h: 995 },
    ],
  },
  {
    slug: 'vibeout',
    name: 'VibeOut',
    short: 'VibeOut',
    year: '2024',
    stack: ['React', 'Flask', 'OpenCV', 'TensorFlow', 'IoT'],
    summary: 'A fitness platform that reads your expression in real time and suggests workouts to match.',
    result: 'Emotion-aware workouts with live IoT sensor data',
    pitch: 'VibeOut reads your face and your heart rate, then picks a workout for your mood.',
    tone: 'teal',
    code: 'https://github.com/krishh-kumarr/VibeOut',
    extra: { label: 'IoT version', href: 'https://github.com/krishh-kumarr/VibeOut_Iot_Implementation' },
    points: [
      'Built an ML pipeline for real-time facial expression analysis with OpenCV and TensorFlow, feeding a personalised workout recommender.',
      'Connected a React frontend to a Flask API, combining voice and visual input to improve prediction accuracy.',
      'Added an IoT version with ESP32 and MAX30102 sensors streaming to a live dashboard.',
    ],
    shots: [
      { src: '/shots/vibeout-dashboard.webp', alt: 'VibeOut live dashboard with heart rate charts next to the backend code', w: 1400, h: 538 },
      { src: '/shots/vibeout-auth.webp', alt: 'VibeOut screens for login, profile, IoT dashboard, performance metrics and AI emotion recognition', w: 1400, h: 826 },
      { src: '/shots/vibeout-setup.webp', alt: 'Hardware setup with ESP32 and MAX30102 sensor on a breadboard, next to the development environment', w: 1400, h: 991 },
      { src: '/shots/vibeout-architecture.webp', alt: 'VibeOut cloud analytics view and system architecture diagram', w: 1400, h: 991 },
    ],
  },
  {
    slug: 'threatsense',
    name: 'ThreatSense',
    short: 'ThreatSense',
    year: '2024',
    stack: ['Python', 'FastAPI', 'Next.js', 'ML'],
    summary: 'Multi-modal scam detection for messages and phishing URLs.',
    result: 'Risk-scored detections with a review dashboard',
    pitch: 'ThreatSense spots scam messages and phishing links, then scores how risky they are.',
    tone: 'sky',
    points: [
      'Built a pipeline that classifies fraudulent messages and phishing URLs with ML models and NLP feature extraction.',
      'Designed a statistical risk-scoring model for each detection.',
      'Built an interactive dashboard for reviewing results.',
    ],
    shots: [],
  },
];

export const moreProjects = [
  { name: 'MindHeaven', what: 'iOS app for meditation and breathing', year: '2025', href: 'https://github.com/krishh-kumarr/MindHeaven' },
  { name: 'CancerBlog', what: 'Research and clinical trial updates', year: '2024', href: 'https://aditya-singh-bioproject.vercel.app' },
  { name: 'IEEE CS SRMIST site', what: 'Club website with event management', year: '2023', href: 'https://github.com/krishh-kumarr/ieee-cs-srm-v2' },
  { name: 'Smart Task Prioritizer', what: 'Task planning with dynamic programming', year: '2023', href: 'https://smart-prioritizer-4isz.vercel.app/' },
];

export const skills = [
  { group: 'Languages', items: ['Swift', 'Python', 'SQL', 'C', 'C++', 'JavaScript'] },
  { group: 'Mobile and web', items: ['SwiftUI', 'Xcode', 'React', 'Next.js', 'Node.js', 'Flask', 'FastAPI'] },
  { group: 'Data and ML', items: ['TensorFlow', 'OpenCV', 'Hugging Face', 'NLP', 'Regression', 'Forecasting', 'Data pipelines'] },
  { group: 'Databases and tools', items: ['MySQL', 'SQL Server', 'Indexing', 'Git', 'AWS', 'Agile'] },
];

export const awards = [
  { title: 'Samsung PRISM Excellence Award', when: '2026' },
  { title: 'Academic Excellence Award, SRM University', when: '2024 – 25' },
  { title: 'Red Bull Basement Hackathon, winner', when: '2024' },
  { title: 'Performance-based scholarship', when: '3rd year' },
  { title: 'Smart India Hackathon, internal winner', when: '' },
];

export const certifications = ['AWS Certified AI Practitioner', 'GitHub Foundations', 'SAP Data Analytics Cloud', 'HackerRank Python (Basic)', 'Beginning C++'];

export const expressions = ['confident', 'laughing', 'thoughtful', 'surprised', 'excited'];

const g = (name, alt, w, h, frame = 'photo') => ({ src: `/gallery/${name}.webp`, alt, w, h, frame });

/** Photos and certificates shown when a project folder is opened. */
export const galleries = {
  'sql-optimizer': [
    g('prism-workslide', 'Samsung PRISM work-let: LLM Powered SQL Optimization', 1246, 706, 'mac'),
    g('lab-coding', 'Working on the LLM-powered SQL optimizer in the lab', 1050, 1400),
    g('prism-lab-1', 'Krish and a teammate working on the Samsung PRISM project in the lab', 1400, 1050),
    g('prism-lab-3', 'Late-night work session in the lab during Samsung PRISM', 1400, 1050),
    { src: '/photos/prism-certificate.webp', alt: 'Samsung PRISM Certificate of Excellence for LLM Powered SQL Optimization', w: 1400, h: 924 },
  ],
  parentbud: [
    g('parentbud-app-store', 'ParentBud live on the App Store', 1400, 881, 'mac'),
    { src: '/shots/parentbud-1.webp', alt: 'ParentBud home screen', w: 520, h: 995, frame: 'shot' },
    { src: '/shots/parentbud-3.webp', alt: 'ParentBud care cards', w: 520, h: 995, frame: 'shot' },
    g('app-fair-screen', 'App Fair 2026 screen listing apps on the App Store', 1400, 1050, 'ipad'),
    g('app-fair-team', 'The ParentBud team with their mentor at App Fair 2026', 1400, 1050),
    g('parentbud-team', 'The ParentBud team at the iOS Development Centre', 1400, 933),
    g('parentbud-mirror', 'The ParentBud team building the app', 1400, 1050),
  ],
  vibeout: [
    g('redbull-team', 'The team with their prize after winning the Red Bull Basement Hackathon', 1050, 1400),
    g('redbull-selfie', 'Team selfie after the Red Bull Basement Hackathon win', 1050, 1400),
    g('redbull-solo', 'Krish holding the Red Bull Basement Hackathon prize', 1050, 1400),
    { src: '/shots/vibeout-dashboard.webp', alt: 'VibeOut live dashboard with heart rate charts', w: 1400, h: 538, frame: 'mac' },
    { src: '/shots/vibeout-setup.webp', alt: 'VibeOut hardware setup with ESP32 and sensor', w: 1400, h: 991, frame: 'ipad' },
  ],
  threatsense: [
    g('lab-coding', 'Krish building ThreatSense at a laptop in the lab', 1050, 1400),
  ],
};

/** Images that sit on award and certification cards. */
export const awardImages = {
  'Samsung PRISM Excellence Award': { src: '/photos/prism-certificate.webp', w: 1400, h: 924 },
  'Academic Excellence Award, SRM University': { src: '/gallery/top-achievers-medal.webp', w: 1050, h: 1400 },
  'Red Bull Basement Hackathon, winner': { src: '/gallery/redbull-team.webp', w: 1050, h: 1400 },
  'Performance-based scholarship': { src: '/gallery/scholarship.webp', w: 898, h: 588 },
};
export const badges = {
  'AWS Certified AI Practitioner': '/gallery/badge-aws-ai.webp',
  'GitHub Foundations': '/gallery/badge-github.webp',
  'SAP Data Analytics Cloud': '/gallery/badge-sap.webp',
};
/** Full certificate images shown on hover. */
export const certImages = {
  'Beginning C++': { src: '/gallery/cert-cpp.webp', w: 1400, h: 1020 },
  'HackerRank Python (Basic)': { src: '/gallery/cert-python.webp', w: 1191, h: 907 },
  'AWS Certified AI Practitioner': { src: '/gallery/badge-aws-ai.webp', w: 480, h: 480 },
  'GitHub Foundations': { src: '/gallery/badge-github.webp', w: 480, h: 480 },
  'SAP Data Analytics Cloud': { src: '/gallery/badge-sap.webp', w: 480, h: 480 },
};
