import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FadeInUp, 
  StaggeredFadeIn
} from '../ui/Animations';
import { F1Card, TechCard, NeonText } from '../ui/Effects';
import githubService from '../services/githubService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubStats, setGithubStats] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // For now, using mock data. Replace with real GitHub API call
        const repos = githubService.getMockRepositories();
        setProjects(repos);
        
        // Mock GitHub stats
        setGithubStats({
          totalRepos: 18,
          totalStars: 125,
          totalForks: 41,
          totalCommits: 837,
          languages: ['JavaScript', 'Java', 'PHP', 'CSS', 'HTML'],
          streak: 45
        });
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const categories = [
    { id: 'all', label: 'ALL PROJECTS', icon: '🚀' },
    { id: 'Web Development', label: 'WEB DEV', icon: '💻' },
    { id: 'Data Science & AI', label: 'AI/ML', icon: '🤖' },
    { id: 'Backend Development', label: 'BACKEND', icon: '⚙️' },
    { id: 'DevOps & Tools', label: 'DEVOPS', icon: '🛠️' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'Python': 'from-blue-400 to-blue-600',
      'Java': 'from-red-400 to-red-600',
      'PHP': 'from-indigo-400 to-indigo-600',
      'CSS': 'from-purple-400 to-purple-600',
      'HTML': 'from-orange-400 to-orange-600',
      'Shell': 'from-green-400 to-green-600',
      'Jupyter Notebook': 'from-orange-500 to-orange-700'
    };
    return colors[language] || 'from-gray-400 to-gray-600';
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'Simple': 'text-neon-green',
      'Medium': 'text-f1-orange',
      'Complex': 'text-f1-red'
    };
    return colors[complexity] || 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            className="w-16 h-16 border-4 border-f1-red border-t-transparent rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-neon-cyan font-racing">Loading projects from GitHub...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeInUp className="text-center space-y-6">
          <motion.div
            className="text-sm font-racing text-neon-cyan tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {'>'} LOADING PROJECT REPOSITORY...
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-racing font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-f1-orange to-neon-cyan">
              PROJECT
            </span>
            <br />
            <span className="text-white">SHOWCASE</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects built with 
            <NeonText color="f1-red"> F1-level precision </NeonText> 
            and 
            <NeonText color="neon-cyan"> technical innovation</NeonText>. 
            Each repository tells a story of pushing boundaries.
          </p>
        </FadeInUp>

        {/* GitHub Stats Dashboard */}
        {githubStats && (
          <FadeInUp delay={0.3}>
            <TechCard className="p-8" glow>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 text-center">
                <div>
                  <div className="text-3xl font-racing text-f1-red">{githubStats.totalRepos}</div>
                  <div className="text-sm text-gray-400">Repositories</div>
                </div>
                <div>
                  <div className="text-3xl font-racing text-f1-orange">{githubStats.totalStars}</div>
                  <div className="text-sm text-gray-400">Stars</div>
                </div>
                <div>
                  <div className="text-3xl font-racing text-neon-cyan">{githubStats.totalForks}</div>
                  <div className="text-sm text-gray-400">Forks</div>
                </div>
                <div>
                  <div className="text-3xl font-racing text-neon-green">{githubStats.totalCommits}</div>
                  <div className="text-sm text-gray-400">Commits</div>
                </div>
                <div>
                  <div className="text-3xl font-racing text-f1-purple">{githubStats.languages.length}</div>
                  <div className="text-sm text-gray-400">Languages</div>
                </div>
                <div>
                  <div className="text-3xl font-racing text-f1-blue">{githubStats.streak}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>
            </TechCard>
          </FadeInUp>
        )}

        {/* Category Filter */}
        <FadeInUp delay={0.4}>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-6 py-3 rounded-lg font-racing text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-f1-red to-f1-orange text-white shadow-lg'
                    : 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bat-black'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.label}
                </span>
              </motion.button>
            ))}
          </div>
        </FadeInUp>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <StaggeredFadeIn>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -10 }}
                    layoutId={`project-${project.id}`}
                  >
                    <F1Card className="h-full space-y-4 team-redbull relative overflow-hidden">
                      {/* Status Indicators */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                          {project.isActive && (
                            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                          )}
                          <span className={`text-xs font-racing ${getComplexityColor(project.complexity)}`}>
                            {project.complexity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {project.category}
                        </div>
                      </div>

                      {/* Project Header */}
                      <div>
                        <h3 className="text-xl font-racing text-white mb-2">{project.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 text-xs bg-gradient-to-r ${getLanguageColor(tech)} text-white rounded`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1 text-f1-orange">
                            ⭐ {project.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 text-neon-cyan">
                            🔗 {project.forks_count}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {new Date(project.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-f1-red/10 to-f1-orange/10 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </F1Card>
                  </motion.div>
                ))}
              </div>
            </StaggeredFadeIn>
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-bat-gray rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                layoutId={`project-${selectedProject.id}`}
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-racing text-white mb-2">{selectedProject.name}</h2>
                      <p className="text-gray-400">{selectedProject.description}</p>
                    </div>
                    <button
                      className="text-neon-cyan hover:text-white text-2xl"
                      onClick={() => setSelectedProject(null)}
                    >
                      ×
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-racing text-f1-orange">Project Details</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Language:</span>
                          <span className="text-white">{selectedProject.primaryLanguage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Complexity:</span>
                          <span className={getComplexityColor(selectedProject.complexity)}>
                            {selectedProject.complexity}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={selectedProject.isActive ? 'text-neon-green' : 'text-gray-400'}>
                            {selectedProject.isActive ? 'Active' : 'Archived'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-lg font-racing text-neon-cyan">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 text-sm bg-gradient-to-r ${getLanguageColor(tech)} text-white rounded-lg`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-racing text-f1-orange">Repository Stats</h3>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-bat-black p-4 rounded-lg">
                          <div className="text-2xl font-racing text-bat-blue">{selectedProject.stargazers_count}</div>
                          <div className="text-sm text-gray-400">Stars</div>
                        </div>
                        <div className="bg-bat-black p-4 rounded-lg">
                          <div className="text-2xl font-racing text-neon-cyan">{selectedProject.forks_count}</div>
                          <div className="text-sm text-gray-400">Forks</div>
                        </div>
                        <div className="bg-bat-black p-4 rounded-lg">
                          <div className="text-2xl font-racing text-f1-blue">{selectedProject.watchers_count}</div>
                          <div className="text-sm text-gray-400">Watchers</div>
                        </div>
                        <div className="bg-bat-black p-4 rounded-lg">
                          <div className="text-2xl font-racing text-neon-cyan">
                            {selectedProject.recentCommits}
                          </div>
                          <div className="text-sm text-gray-400">Recent Commits</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-700">
                    <motion.a
                      href={selectedProject.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="f1-button rounded-lg px-6 py-3 flex-1 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      VIEW ON GITHUB
                    </motion.a>
                    <motion.button
                      className="px-6 py-3 border-2 border-neon-cyan text-neon-cyan rounded-lg font-racing hover:bg-neon-cyan hover:text-bat-black transition-all duration-300 flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LIVE DEMO
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Technologies */}
        <FadeInUp>
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-racing text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
              FEATURED TECHNOLOGIES
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {githubStats?.languages.map((language, index) => (
                <motion.div
                  key={language}
                  className={`px-6 py-3 bg-gradient-to-r ${getLanguageColor(language)} text-white rounded-lg font-racing`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {language}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Projects;
