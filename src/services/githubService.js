import axios from 'axios';

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.username = 'krishh-kumarr'; // Replace with actual username
  }

  setUsername(username) {
    this.username = username;
  }

  async getUserInfo() {
    try {
      const response = await axios.get(`${this.baseURL}/users/${this.username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  async getRepositories(sort = 'updated', per_page = 20) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${this.username}/repos`, {
        params: {
          sort,
          per_page,
          type: 'owner'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      return [];
    }
  }

  async getRepository(repoName) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository:', error);
      return null;
    }
  }

  async getRepositoryLanguages(repoName) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}/languages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      return {};
    }
  }

  async getRepositoryContributors(repoName) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}/contributors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository contributors:', error);
      return [];
    }
  }

  async getRepositoryCommits(repoName, per_page = 10) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}/commits`, {
        params: { per_page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repository commits:', error);
      return [];
    }
  }

  async getFeaturedRepositories() {
    try {
      const repos = await this.getRepositories('updated', 50);
      
      // Filter and sort repositories based on criteria
      const featuredRepos = repos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => {
          // Prioritize repos with more stars, forks, and recent activity
          const scoreA = (a.stargazers_count * 3) + (a.forks_count * 2) + (a.watchers_count * 1);
          const scoreB = (b.stargazers_count * 3) + (b.forks_count * 2) + (b.watchers_count * 1);
          return scoreB - scoreA;
        })
        .slice(0, 12); // Get top 12 repositories

      // Enhance each repository with additional data
      const enhancedRepos = await Promise.all(
        featuredRepos.map(async (repo) => {
          const [languages, commits] = await Promise.all([
            this.getRepositoryLanguages(repo.name),
            this.getRepositoryCommits(repo.name, 5)
          ]);

          const primaryLanguage = Object.keys(languages)[0] || 'Unknown';
          const lastCommitDate = commits[0]?.commit?.author?.date || repo.updated_at;

          return {
            ...repo,
            languages,
            primaryLanguage,
            lastCommitDate,
            recentCommits: commits.length,
            techStack: Object.keys(languages).slice(0, 3),
            isActive: this.isRecentlyActive(lastCommitDate),
            complexity: this.calculateComplexity(languages, commits.length),
            category: this.categorizeRepository(repo, languages)
          };
        })
      );

      return enhancedRepos;
    } catch (error) {
      console.error('Error fetching featured repositories:', error);
      return [];
    }
  }

  isRecentlyActive(lastCommitDate) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(lastCommitDate) > oneMonthAgo;
  }

  calculateComplexity(languages, commitsCount) {
    const languageCount = Object.keys(languages).length;
    if (languageCount >= 4 || commitsCount > 50) return 'Complex';
    if (languageCount >= 2 || commitsCount > 20) return 'Medium';
    return 'Simple';
  }

  categorizeRepository(repo, languages) {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const primaryLang = Object.keys(languages)[0]?.toLowerCase() || '';

    // Web Development
    if (primaryLang.includes('javascript') || primaryLang.includes('typescript') || 
        primaryLang.includes('html') || primaryLang.includes('css') || 
        name.includes('web') || name.includes('react') || name.includes('vue') || 
        name.includes('angular') || description.includes('website') || 
        description.includes('webapp')) {
      return 'Web Development';
    }

    // Mobile Development
    if (primaryLang.includes('swift') || primaryLang.includes('kotlin') || 
        primaryLang.includes('dart') || name.includes('ios') || 
        name.includes('android') || name.includes('flutter') || 
        description.includes('mobile') || description.includes('app')) {
      return 'Mobile Development';
    }

    // Data Science & AI
    if (primaryLang.includes('python') || primaryLang.includes('r') || 
        primaryLang.includes('jupyter') || name.includes('ml') || 
        name.includes('ai') || name.includes('data') || 
        description.includes('machine learning') || description.includes('data science') ||
        description.includes('neural network') || description.includes('tensorflow') ||
        description.includes('pytorch')) {
      return 'Data Science & AI';
    }

    // Game Development
    if (primaryLang.includes('c#') || primaryLang.includes('c++') || 
        name.includes('game') || name.includes('unity') || 
        description.includes('game') || description.includes('unity')) {
      return 'Game Development';
    }

    // DevOps & Tools
    if (name.includes('docker') || name.includes('k8s') || 
        name.includes('deploy') || name.includes('ci') || 
        name.includes('tool') || description.includes('automation') || 
        description.includes('deployment') || description.includes('devops')) {
      return 'DevOps & Tools';
    }

    // Backend/API
    if (name.includes('api') || name.includes('server') || 
        name.includes('backend') || description.includes('api') || 
        description.includes('server') || description.includes('backend')) {
      return 'Backend Development';
    }

    return 'Other';
  }

  // Mock data for demonstration (remove when implementing with real GitHub username)
  getMockRepositories() {
    return [
      {
        id: 1,
        name: 'vibe-out',
        full_name: 'krishh-kumarr/vibe-out',
        description: 'Emotion-based fitness app that provides workout routines based on your emotional state',
        html_url: 'https://github.com/krishh-kumarr/vibe-out',
        stargazers_count: 28,
        forks_count: 7,
        watchers_count: 15,
        language: 'JavaScript',
        languages: { JavaScript: 65, CSS: 25, HTML: 10 },
        primaryLanguage: 'JavaScript',
        techStack: ['React', 'TensorFlow.js', 'Emotion Recognition', 'Tailwind CSS'],
        category: 'Web Development',
        complexity: 'Complex',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['emotion-recognition', 'fitness', 'machine-learning', 'react'],
        recentCommits: 32
      },
      {
        id: 2,
        name: 'one-pass',
        full_name: 'krishh-kumarr/one-pass',
        description: 'Database management system for government schools in Rajasthan with TC and document management',
        html_url: 'https://github.com/krishh-kumarr/one-pass',
        stargazers_count: 32,
        forks_count: 12,
        watchers_count: 18,
        language: 'PHP',
        languages: { PHP: 60, JavaScript: 25, CSS: 15 },
        primaryLanguage: 'PHP',
        techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
        category: 'Backend Development',
        complexity: 'Complex',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['database', 'school-management', 'document-management', 'government']
      },
      {
        id: 3,
        name: 'task-prioritizer',
        full_name: 'krishh-kumarr/task-prioritizer',
        description: 'React-based application for task prioritization and management',
        html_url: 'https://github.com/krishh-kumarr/task-prioritizer',
        stargazers_count: 18,
        forks_count: 5,
        watchers_count: 9,
        language: 'JavaScript',
        languages: { JavaScript: 75, CSS: 15, HTML: 10 },
        primaryLanguage: 'JavaScript',
        techStack: ['React', 'Redux', 'JavaScript'],
        category: 'Web Development',
        complexity: 'Medium',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['react', 'task-management', 'productivity']
      },
      {
        id: 4,
        name: 'swingler',
        full_name: 'krishh-kumarr/swingler',
        description: 'Java Swing-based application for job listing and searching',
        html_url: 'https://github.com/krishh-kumarr/swingler',
        stargazers_count: 22,
        forks_count: 8,
        watchers_count: 14,
        language: 'Java',
        languages: { Java: 90, XML: 10 },
        primaryLanguage: 'Java',
        techStack: ['Java', 'Swing', 'SQL'],
        category: 'Desktop Applications',
        complexity: 'Medium',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['java', 'swing', 'job-search']
      },
      {
        id: 5,
        name: 'security-pulse',
        full_name: 'krishh-kumarr/security-pulse',
        description: 'App that shares IP/location of students whenever required for enhanced security monitoring',
        html_url: 'https://github.com/krishh-kumarr/security-pulse',
        stargazers_count: 22,
        forks_count: 8,
        watchers_count: 14,
        language: 'JavaScript',
        languages: { JavaScript: 75, HTML: 15, CSS: 10 },
        primaryLanguage: 'JavaScript',
        techStack: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
        category: 'Backend Development',
        complexity: 'Medium',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['security', 'location-tracking', 'student-management', 'monitoring']
      },
      {
        id: 6,
        name: 'movify',
        full_name: 'krishh-kumarr/movify',
        description: 'React movie searching app with advanced filtering and recommendation features',
        html_url: 'https://github.com/krishh-kumarr/movify',
        stargazers_count: 25,
        forks_count: 9,
        watchers_count: 12,
        language: 'JavaScript',
        languages: { JavaScript: 80, CSS: 15, HTML: 5 },
        primaryLanguage: 'JavaScript',
        techStack: ['React', 'Movie API', 'CSS'],
        category: 'Web Development',
        complexity: 'Medium',
        isActive: true,
        updated_at: new Date().toISOString(),
        topics: ['movies', 'react', 'search-engine', 'api']
      }
    ];
  }
}

const githubService = new GitHubService();
export default githubService;
