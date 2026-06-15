import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, FadeInUp } from '../ui/Animations';

const experiences = [
  {
    role: 'IOS Developer Intern',
    company: 'Infosys',
    date: 'Mar 2026 – Apr 2026',
    points: [
      'Developed and tested iOS features using Swift and Xcode, following SwiftUI best practices; built a Fleet Management System application.',
      'Implemented API integration and data handling to improve responsiveness, stability, and maintainability.',
      'Worked in an Agile workflow with Git, code reviews, and documentation.',
    ]
  },
  {
    role: 'Virtual R&D Intern',
    company: 'Samsung PRISM',
    date: 'Apr 2025 – Aug 2025',
    points: [
      'Built a web app for backend developers to analyse and optimise SQL queries, improving database performance and efficiency.',
      'Collaborated with engineers on query performance improvements, indexing strategies, and database tuning.',
      'Researched backend developer workflows to tailor tooling for real-world use cases.',
    ]
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Unicum Finance Consultant',
    date: 'Mar 2025 – Apr 2025',
    points: [
      'Developed frontend for a distribution application to manage and track product details across inventory workflows.',
      'Built responsive UI components and reusable screens to improve usability and delivery speed.',
      'Collaborated with stakeholders to convert requirements into user flows and consistent UX.',
    ]
  },
  {
    role: 'iOS Student Developer Program',
    company: 'iOS Development Center, SRM IST',
    date: '2025 – Present',
    points: [
      'Selected among top students for advanced training in iOS app development.',
      'Developing production-ready Swift apps with mentorship from industry professionals.',
      'Collaborating on real-world projects aligned with Apple\'s design philosophy.',
    ]
  },
  {
    role: 'Technical Club Member',
    company: 'IEEE CS Computer Society, SRM University',
    date: '2024 – Present',
    points: [
      'Led workshops on web development, cloud computing, and machine learning.',
      'Mentored juniors in project development, Git, and version control best practices.',
    ]
  }
];

const Experience = () => {
  return (
    <div className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto space-y-16">
        <ScrollReveal className="text-center space-y-4">
          <div className="text-accent text-small font-medium tracking-widest uppercase">
            Professional Experience
          </div>
          <h2 className="text-section text-text-primary">
            Where I've Worked
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <motion.div
                className="glass-card p-8 relative overflow-hidden group"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Subtle highlight effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">
                      {exp.role} <span className="text-text-secondary normal-case font-normal">at</span> <span className="text-text-primary italic">{exp.company}</span>
                    </h3>
                  </div>
                  <div className="text-text-primary font-semibold whitespace-nowrap text-sm md:text-base mt-1 md:mt-0">
                    {exp.date}
                  </div>
                </div>

                <ul className="space-y-3 relative z-10">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start text-text-secondary text-body">
                      <span className="text-accent mr-3 mt-1 text-lg leading-none">◇</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
