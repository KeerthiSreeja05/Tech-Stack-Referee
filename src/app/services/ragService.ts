import Fuse from 'fuse.js';

// Tech Stack Knowledge Base
export interface TechStackKnowledge {
  id: string;
  name: string;
  category: string;
  description: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  learningCurve: 'easy' | 'medium' | 'hard';
  scalability: 'low' | 'medium' | 'high';
  community: 'small' | 'medium' | 'large';
  maturity: 'new' | 'stable' | 'mature';
  performance: 'low' | 'medium' | 'high';
  ecosystem: string[];
  alternatives: string[];
  bestPractices: string[];
  commonPitfalls: string[];
  realWorldExamples: string[];
  tags: string[];
}

// Comprehensive knowledge base
const techStackKnowledgeBase: TechStackKnowledge[] = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend Framework',
    description: 'A JavaScript library for building user interfaces with component-based architecture and virtual DOM.',
    useCases: ['Single Page Applications', 'Progressive Web Apps', 'Mobile Apps with React Native', 'Server-side rendering with Next.js'],
    pros: [
      'Large ecosystem and community',
      'Component reusability',
      'Virtual DOM for performance',
      'Backed by Meta',
      'Excellent developer tools',
      'Strong TypeScript support'
    ],
    cons: [
      'Steep learning curve for beginners',
      'Rapid ecosystem changes',
      'JSX syntax learning required',
      'Only handles the view layer'
    ],
    learningCurve: 'medium',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'high',
    ecosystem: ['Redux', 'MobX', 'React Router', 'Material-UI', 'Styled Components'],
    alternatives: ['Vue.js', 'Angular', 'Svelte'],
    bestPractices: [
      'Use functional components with hooks',
      'Implement proper state management',
      'Optimize with React.memo and useMemo',
      'Follow component composition patterns'
    ],
    commonPitfalls: [
      'Overusing useEffect',
      'Not memoizing expensive calculations',
      'Prop drilling instead of context',
      'Mutating state directly'
    ],
    realWorldExamples: ['Facebook', 'Netflix', 'Airbnb', 'Instagram', 'WhatsApp'],
    tags: ['javascript', 'frontend', 'spa', 'component-based', 'virtual-dom']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Runtime',
    description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side development.',
    useCases: ['REST APIs', 'Real-time applications', 'Microservices', 'CLI tools', 'IoT applications'],
    pros: [
      'Same language for frontend and backend',
      'Non-blocking I/O operations',
      'Large package ecosystem (npm)',
      'Fast development cycles',
      'Great for real-time applications'
    ],
    cons: [
      'Single-threaded limitations',
      'CPU-intensive tasks performance',
      'Callback hell (though mitigated by async/await)',
      'Rapid version changes'
    ],
    learningCurve: 'medium',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'high',
    ecosystem: ['Express.js', 'Koa.js', 'NestJS', 'Socket.io', 'Mongoose'],
    alternatives: ['Python', 'Java', 'Go', 'C#'],
    bestPractices: [
      'Use async/await for asynchronous operations',
      'Implement proper error handling',
      'Use clustering for CPU-intensive tasks',
      'Monitor memory usage and performance'
    ],
    commonPitfalls: [
      'Blocking the event loop',
      'Not handling errors properly',
      'Memory leaks in long-running processes',
      'Security vulnerabilities in dependencies'
    ],
    realWorldExamples: ['Netflix', 'LinkedIn', 'Uber', 'PayPal', 'NASA'],
    tags: ['javascript', 'backend', 'runtime', 'async', 'npm']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    description: 'Document-oriented NoSQL database with flexible schema and horizontal scaling capabilities.',
    useCases: ['Content management', 'Real-time analytics', 'IoT data storage', 'Product catalogs', 'User profiles'],
    pros: [
      'Flexible schema design',
      'Horizontal scaling capabilities',
      'Rich query language',
      'Built-in replication',
      'JSON-like document storage'
    ],
    cons: [
      'Memory usage can be high',
      'No ACID transactions (in older versions)',
      'Learning curve for complex queries',
      'Potential for data inconsistency'
    ],
    learningCurve: 'medium',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'high',
    ecosystem: ['Mongoose', 'MongoDB Atlas', 'MongoDB Compass', 'Aggregation Framework'],
    alternatives: ['PostgreSQL', 'MySQL', 'CouchDB', 'DynamoDB'],
    bestPractices: [
      'Design schema for your query patterns',
      'Use indexes effectively',
      'Implement proper data validation',
      'Monitor performance metrics'
    ],
    commonPitfalls: [
      'Over-normalization of data',
      'Missing indexes on frequently queried fields',
      'Not considering data growth patterns',
      'Inadequate backup strategies'
    ],
    realWorldExamples: ['Facebook', 'eBay', 'Adobe', 'Google', 'Viacom'],
    tags: ['database', 'nosql', 'document', 'scaling', 'json']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend Framework',
    description: 'Fast, unopinionated, minimalist web framework for Node.js applications.',
    useCases: ['REST APIs', 'Web applications', 'Microservices', 'Middleware development', 'Server-side rendering'],
    pros: [
      'Minimalist and flexible',
      'Large middleware ecosystem',
      'Fast development',
      'Excellent documentation',
      'Wide community adoption'
    ],
    cons: [
      'Requires many decisions from developer',
      'Can become complex with large applications',
      'Security depends on proper configuration',
      'No built-in structure'
    ],
    learningCurve: 'easy',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'high',
    ecosystem: ['Helmet', 'Morgan', 'Cors', 'Body-parser', 'Passport'],
    alternatives: ['Koa.js', 'Fastify', 'NestJS', 'Hapi.js'],
    bestPractices: [
      'Use middleware for cross-cutting concerns',
      'Implement proper error handling',
      'Structure routes logically',
      'Use environment variables for configuration'
    ],
    commonPitfalls: [
      'Not handling async errors properly',
      'Missing security middleware',
      'Poor route organization',
      'Blocking the event loop'
    ],
    realWorldExamples: ['IBM', 'Accenture', 'Fox Sports', 'MuleSoft'],
    tags: ['nodejs', 'backend', 'framework', 'middleware', 'api']
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Backend Framework',
    description: 'High-level Python web framework that encourages rapid development and clean, pragmatic design.',
    useCases: ['Web applications', 'Content management systems', 'E-commerce platforms', 'Social networks', 'Data-driven applications'],
    pros: [
      'Batteries-included philosophy',
      'Built-in admin interface',
      'Excellent ORM',
      'Strong security features',
      'Great documentation'
    ],
    cons: [
      'Can be overkill for simple projects',
      'Monolithic architecture by default',
      'Learning curve for Django way',
      'Less flexible than micro-frameworks'
    ],
    learningCurve: 'medium',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'medium',
    ecosystem: ['Django REST Framework', 'Celery', 'Django Channels', 'Wagtail', 'Django CMS'],
    alternatives: ['Flask', 'FastAPI', 'Ruby on Rails', 'Spring Boot'],
    bestPractices: [
      'Follow Django project structure',
      'Use Django ORM effectively',
      'Implement proper caching strategies',
      'Use Django REST Framework for APIs'
    ],
    commonPitfalls: [
      'Not using migrations properly',
      'N+1 query problems',
      'Ignoring Django security features',
      'Poor model design'
    ],
    realWorldExamples: ['Instagram', 'Pinterest', 'Mozilla', 'The Washington Post', 'Spotify'],
    tags: ['python', 'backend', 'framework', 'orm', 'batteries-included']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Backend-as-a-Service',
    description: 'Google\'s mobile and web application development platform with real-time database and serverless functions.',
    useCases: ['Mobile applications', 'Real-time chat applications', 'Rapid prototyping', 'Serverless applications', 'Authentication systems'],
    pros: [
      'Zero backend code required',
      'Real-time synchronization',
      'Built-in authentication',
      'Generous free tier',
      'Automatic scaling'
    ],
    cons: [
      'Vendor lock-in',
      'Limited query capabilities',
      'Costs can scale exponentially',
      'Less control over backend logic'
    ],
    learningCurve: 'easy',
    scalability: 'medium',
    community: 'large',
    maturity: 'stable',
    performance: 'medium',
    ecosystem: ['Cloud Functions', 'Cloud Firestore', 'Firebase Auth', 'Firebase Hosting', 'Firebase Analytics'],
    alternatives: ['AWS Amplify', 'Supabase', 'Appwrite', 'PocketBase'],
    bestPractices: [
      'Design data structure for real-time updates',
      'Use security rules effectively',
      'Monitor usage and costs',
      'Implement offline capabilities'
    ],
    commonPitfalls: [
      'Poor security rules configuration',
      'Not considering offline scenarios',
      'Overusing real-time features',
      'Ignoring cost implications'
    ],
    realWorldExamples: ['Trivago', 'The New York Times', 'Alibaba', 'Lyft', 'Venmo'],
    tags: ['baas', 'serverless', 'realtime', 'google', 'mobile']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Advanced open-source relational database with strong ACID compliance and extensibility.',
    useCases: ['Enterprise applications', 'Data warehousing', 'Geospatial applications', 'Financial systems', 'Analytics platforms'],
    pros: [
      'ACID compliance',
      'Advanced SQL features',
      'Extensible with custom functions',
      'Strong data integrity',
      'Excellent performance'
    ],
    cons: [
      'More complex than simpler databases',
      'Memory usage can be high',
      'Requires database administration knowledge',
      'Slower for simple read operations'
    ],
    learningCurve: 'medium',
    scalability: 'high',
    community: 'large',
    maturity: 'mature',
    performance: 'high',
    ecosystem: ['PostGIS', 'pgAdmin', 'Sequelize', 'Prisma', 'TypeORM'],
    alternatives: ['MySQL', 'MongoDB', 'SQLite', 'Oracle'],
    bestPractices: [
      'Design normalized database schema',
      'Use indexes strategically',
      'Implement proper backup strategies',
      'Monitor query performance'
    ],
    commonPitfalls: [
      'Over-indexing tables',
      'Not using connection pooling',
      'Poor query optimization',
      'Inadequate security configuration'
    ],
    realWorldExamples: ['Apple', 'Fujitsu', 'Red Hat', 'Sun Microsystem', 'Cisco'],
    tags: ['database', 'sql', 'relational', 'acid', 'enterprise']
  }
];

// RAG Service Class
export class RAGService {
  private fuse: Fuse<TechStackKnowledge>;
  private knowledgeBase: TechStackKnowledge[];

  constructor() {
    this.knowledgeBase = techStackKnowledgeBase;
    
    // Configure Fuse.js for semantic search
    const fuseOptions = {
      keys: [
        { name: 'name', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'useCases', weight: 0.15 },
        { name: 'pros', weight: 0.1 },
        { name: 'cons', weight: 0.1 },
        { name: 'tags', weight: 0.15 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true
    };
    
    this.fuse = new Fuse(this.knowledgeBase, fuseOptions);
  }

  // Search for relevant tech stacks based on query
  searchTechStacks(query: string, limit: number = 5): TechStackKnowledge[] {
    const results = this.fuse.search(query, { limit });
    return results.map(result => result.item);
  }

  // Get tech stack by ID
  getTechStackById(id: string): TechStackKnowledge | undefined {
    return this.knowledgeBase.find(stack => stack.id === id);
  }

  // Compare multiple tech stacks
  compareTechStacks(stackIds: string[]): {
    stacks: TechStackKnowledge[];
    comparison: {
      strengths: { [key: string]: string[] };
      weaknesses: { [key: string]: string[] };
      bestFor: { [key: string]: string[] };
      recommendations: string[];
    };
  } {
    const stacks = stackIds.map(id => this.getTechStackById(id)).filter(Boolean) as TechStackKnowledge[];
    
    const comparison = {
      strengths: {} as { [key: string]: string[] },
      weaknesses: {} as { [key: string]: string[] },
      bestFor: {} as { [key: string]: string[] },
      recommendations: [] as string[]
    };

    // Analyze each stack
    stacks.forEach(stack => {
      comparison.strengths[stack.name] = stack.pros;
      comparison.weaknesses[stack.name] = stack.cons;
      comparison.bestFor[stack.name] = stack.useCases;
    });

    // Generate recommendations based on comparison
    comparison.recommendations = this.generateRecommendations(stacks);

    return { stacks, comparison };
  }

  // Generate contextual recommendations
  private generateRecommendations(stacks: TechStackKnowledge[]): string[] {
    const recommendations: string[] = [];

    // Analyze learning curves
    const easiestStack = stacks.find(s => s.learningCurve === 'easy');
    if (easiestStack) {
      recommendations.push(`For beginners, ${easiestStack.name} offers the gentlest learning curve.`);
    }

    // Analyze scalability
    const highScalabilityStacks = stacks.filter(s => s.scalability === 'high');
    if (highScalabilityStacks.length > 0) {
      recommendations.push(`For high-scale applications, consider ${highScalabilityStacks.map(s => s.name).join(' or ')}.`);
    }

    // Analyze community support
    const largeCommunityStacks = stacks.filter(s => s.community === 'large');
    if (largeCommunityStacks.length > 0) {
      recommendations.push(`${largeCommunityStacks.map(s => s.name).join(' and ')} have the strongest community support.`);
    }

    // Analyze maturity
    const matureStacks = stacks.filter(s => s.maturity === 'mature');
    if (matureStacks.length > 0) {
      recommendations.push(`For production-ready applications, ${matureStacks.map(s => s.name).join(' and ')} are battle-tested choices.`);
    }

    return recommendations;
  }

  // Get recommendations based on project constraints
  getRecommendationsForConstraints(constraints: {
    projectType?: string;
    teamSize?: string;
    timeline?: string;
    scalability?: string;
    budget?: string;
    experience?: string;
  }): {
    recommended: TechStackKnowledge[];
    reasoning: string[];
  } {
    let query = '';
    const reasoning: string[] = [];

    // Build search query based on constraints
    if (constraints.projectType) {
      query += ` ${constraints.projectType}`;
      reasoning.push(`Considering ${constraints.projectType} project requirements`);
    }

    if (constraints.teamSize === 'small' || constraints.timeline === 'short') {
      query += ' rapid development easy learning';
      reasoning.push('Prioritizing rapid development and ease of use');
    }

    if (constraints.scalability === 'high') {
      query += ' scalable performance enterprise';
      reasoning.push('Focusing on high scalability requirements');
    }

    if (constraints.experience === 'beginner') {
      query += ' easy learning simple';
      reasoning.push('Selecting beginner-friendly technologies');
    }

    // Search for relevant stacks
    const recommended = this.searchTechStacks(query, 3);

    // Add budget considerations
    if (constraints.budget === 'low') {
      reasoning.push('Considering cost-effective open-source solutions');
    }

    return { recommended, reasoning };
  }

  // Get all available tech stacks
  getAllTechStacks(): TechStackKnowledge[] {
    return this.knowledgeBase;
  }

  // Get tech stacks by category
  getTechStacksByCategory(category: string): TechStackKnowledge[] {
    return this.knowledgeBase.filter(stack => 
      stack.category.toLowerCase().includes(category.toLowerCase())
    );
  }
}

// Export singleton instance
export const ragService = new RAGService();