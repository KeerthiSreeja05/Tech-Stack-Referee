import { GoogleGenerativeAI } from '@google/generative-ai';
import Fuse from 'fuse.js';

// Tech Stack Knowledge Base (same as before)
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

// Google RAG Service Class
export class GoogleRAGService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private fuse: Fuse<TechStackKnowledge>;
  private knowledgeBase: TechStackKnowledge[];
  private apiKey: string | null = null;

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
    
    // Try to initialize Google AI (will work if API key is provided)
    this.initializeGoogleAI().catch(console.warn);
  }

  private async initializeGoogleAI() {
    // In a real app, you'd get this from environment variables or user input
    // For demo purposes, we'll make it optional
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY || 
                   localStorage.getItem('google_ai_api_key');
    
    if (apiKey) {
      console.log('Attempting to initialize Google AI with API key...');
      const success = await this.tryInitializeWithApiKey(apiKey);
      if (!success) {
        console.warn('Failed to initialize Google AI - falling back to basic mode');
      }
    } else {
      console.log('No Google AI API key found - using basic mode');
    }
  }

  private async tryInitializeWithApiKey(apiKey: string) {
    console.log('Starting Google AI initialization...');
    
    // Prioritize fastest models first - flash models are optimized for speed
    const modelNames = [
      "gemini-2.0-flash-exp",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.5-pro"
    ];

    for (const modelName of modelNames) {
      try {
        console.log(`Trying to initialize with model: ${modelName}`);
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: modelName });
        
        // Test the model with a simple call to verify it works
        try {
          const testResult = await this.model.generateContent('Hello');
          const response = await testResult.response;
          const text = response.text();
          console.log('Model test response:', text.substring(0, 50));
          
          this.apiKey = apiKey;
          localStorage.setItem('google_ai_api_key', apiKey);
          console.log(`✅ Google AI initialized successfully with model: ${modelName}`);
          return true;
        } catch (testError: any) {
          console.warn(`Model ${modelName} failed test:`, testError?.message || testError);
          continue;
        }
      } catch (error: any) {
        console.warn(`❌ Failed to initialize with model ${modelName}:`, error?.message || error);
        continue;
      }
    }
    
    console.error('❌ Failed to initialize Google AI with any available model');
    console.error('Please check:');
    console.error('1. Your API key is valid');
    console.error('2. You have enabled the Generative Language API in Google Cloud Console');
    console.error('3. Your API key has the correct permissions');
    this.genAI = null;
    this.model = null;
    return false;
  }

  // Test method to check available models
  async testModelConnection(): Promise<boolean> {
    if (!this.model) {
      throw new Error('Google AI not initialized');
    }
    
    try {
      // Test with a simple prompt
      const result = await this.model.generateContent('Hello');
      const response = await result.response;
      console.log('Model test successful:', response.text());
      return true;
    } catch (error) {
      console.error('Model test failed:', error);
      return false;
    }
  }

  // Reset and clear configuration
  reset() {
    this.genAI = null;
    this.model = null;
    this.apiKey = null;
    localStorage.removeItem('google_ai_api_key');
    console.log('Google AI service reset');
  }

  // Set API key dynamically
  async setApiKey(apiKey: string): Promise<boolean> {
    // First reset any existing configuration
    this.reset();
    return await this.tryInitializeWithApiKey(apiKey);
  }

  // Check if Google AI is available
  isGoogleAIAvailable(): boolean {
    return this.model !== null;
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

  // Enhanced AI-powered comparison using Google Gemini
  async compareTechStacksWithAI(stackIds: string[]): Promise<{
    stacks: TechStackKnowledge[];
    comparison: {
      strengths: { [key: string]: string[] };
      weaknesses: { [key: string]: string[] };
      bestFor: { [key: string]: string[] };
      recommendations: string[];
      aiInsights?: string;
    };
  }> {
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

    // Generate basic recommendations
    comparison.recommendations = this.generateRecommendations(stacks);

    // If Google AI is available, get enhanced insights
    if (this.isGoogleAIAvailable()) {
      try {
        const aiInsights = await this.generateAIInsights(stacks);
        return {
          stacks,
          comparison: {
            ...comparison,
            aiInsights
          }
        };
      } catch (error) {
        console.warn('Failed to get AI insights:', error);
      }
    }

    return { stacks, comparison };
  }

  // Generate comprehensive risk analysis
  async generateRiskAnalysis(stacks: TechStackKnowledge[], constraints?: any): Promise<string> {
    if (!this.model) throw new Error('Google AI not initialized');

    const names = stacks.map(s => s.name).join(', ');
    const prompt = `Analyze ${names} technical risks in 120 words:
1. Critical Issues: Major blockers or failures
2. Moderate Concerns: Common challenges
3. Mitigation Strategies: How to address risks
4. Project-Specific Risks: Context-based considerations`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // Generate neutral referee insight
  async generateRefereeInsight(stacks: TechStackKnowledge[], constraints?: any): Promise<string> {
    if (!this.model) throw new Error('Google AI not initialized');

    const names = stacks.map(s => s.name).join(' vs ');
    const prompt = `Compare ${names} in 140 words:
1. Reality Check: Current market position and adoption
2. When Each Wins: Specific scenarios favoring each
3. Key Trade-offs: What you gain vs lose
4. Decision Advice: Neutral guidance for choosing`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // Generate AI insights using Google Gemini
  private async generateAIInsights(stacks: TechStackKnowledge[]): Promise<string> {
    if (!this.model) throw new Error('Google AI not initialized');

    const names = stacks.map(s => s.name).join(', ');
    const prompt = `Provide detailed analysis of ${names} in 120 words:
1. Integration Approach: How they work together
2. Key Differences: What sets each apart
3. Best Use Cases: Ideal scenarios for each
4. Implementation Tips: Practical advice for developers`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // AI-powered chat response
  async generateChatResponse(userMessage: string, conversationHistory: any[] = []): Promise<{
    content: string;
    relatedStacks?: TechStackKnowledge[];
    suggestions?: string[];
  }> {
    // Search for relevant stacks first
    const relatedStacks = this.searchTechStacks(userMessage, 3);

    // If Google AI is available, use it for enhanced responses
    if (this.isGoogleAIAvailable()) {
      try {
        const aiResponse = await this.generateAIChatResponse(userMessage, relatedStacks, conversationHistory);
        return {
          content: aiResponse,
          relatedStacks,
          suggestions: this.generateFollowUpSuggestions(userMessage, relatedStacks)
        };
      } catch (error) {
        console.warn('Failed to get AI chat response:', error);
        // Fall back to rule-based response
      }
    }

    // Fallback to rule-based responses
    return this.generateRuleBasedResponse(userMessage, relatedStacks);
  }

  // Generate AI chat response using Google Gemini
  private async generateAIChatResponse(
    userMessage: string, 
    relatedStacks: TechStackKnowledge[], 
    conversationHistory: any[]
  ): Promise<string> {
    if (!this.model) throw new Error('Google AI not initialized');

    const context = relatedStacks.slice(0, 2).map(stack => 
      `${stack.name}: ${stack.description.substring(0, 80)}. Pros: ${stack.pros.slice(0, 3).join(', ')}`
    ).join('\n');

    const prompt = `Context:
${context ? context : 'General tech stack knowledge'}

Question: ${userMessage}

Provide a helpful answer in 80-100 words with specific details and actionable insights:`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // Generate follow-up suggestions
  private generateFollowUpSuggestions(userMessage: string, relatedStacks: TechStackKnowledge[]): string[] {
    const suggestions: string[] = [];
    
    if (relatedStacks.length > 1) {
      suggestions.push(`Compare ${relatedStacks[0].name} vs ${relatedStacks[1].name}`);
    }
    
    if (relatedStacks.length > 0) {
      suggestions.push(`What are the best practices for ${relatedStacks[0].name}?`);
      suggestions.push(`Show me real-world examples using ${relatedStacks[0].name}`);
    }
    
    if (userMessage.toLowerCase().includes('beginner')) {
      suggestions.push('What should I learn first as a beginner?');
    }
    
    if (userMessage.toLowerCase().includes('scale')) {
      suggestions.push('How do these technologies handle high traffic?');
    }
    
    suggestions.push('What are the current trends in web development?');
    
    return suggestions.slice(0, 4);
  }

  // Fallback rule-based response generation
  private generateRuleBasedResponse(userMessage: string, relatedStacks: TechStackKnowledge[]): {
    content: string;
    relatedStacks?: TechStackKnowledge[];
    suggestions?: string[];
  } {
    const lowerMessage = userMessage.toLowerCase();
    
    // Generate contextual responses based on keywords (same as before)
    if (lowerMessage.includes('compare') || lowerMessage.includes('vs')) {
      return {
        content: `I can help you compare these technologies. ${relatedStacks.map(s => s.name).join(', ')} each have different strengths. Would you like me to dive deeper into specific aspects like performance, learning curve, or use cases?`,
        relatedStacks,
        suggestions: [
          'Compare learning curves',
          'Which has better performance?',
          'Show me use case differences'
        ]
      };
    }
    
    if (relatedStacks.length > 0) {
      return {
        content: `I found some relevant technologies for your question: ${relatedStacks.map(s => `**${s.name}** - ${s.description}`).join('\n\n')}`,
        relatedStacks,
        suggestions: this.generateFollowUpSuggestions(userMessage, relatedStacks)
      };
    }
    
    return {
      content: "I'd be happy to help you with tech stack decisions! You can ask me about specific technologies, comparisons, or get recommendations based on your project needs.",
      suggestions: [
        "What's the best stack for my project?",
        "Compare React vs Vue",
        "Help me choose a database"
      ]
    };
  }

  // Generate contextual recommendations (same as before)
  private generateRecommendations(stacks: TechStackKnowledge[]): string[] {
    const recommendations: string[] = [];

    const easiestStack = stacks.find(s => s.learningCurve === 'easy');
    if (easiestStack) {
      recommendations.push(`For beginners, ${easiestStack.name} offers the gentlest learning curve.`);
    }

    const highScalabilityStacks = stacks.filter(s => s.scalability === 'high');
    if (highScalabilityStacks.length > 0) {
      recommendations.push(`For high-scale applications, consider ${highScalabilityStacks.map(s => s.name).join(' or ')}.`);
    }

    const largeCommunityStacks = stacks.filter(s => s.community === 'large');
    if (largeCommunityStacks.length > 0) {
      recommendations.push(`${largeCommunityStacks.map(s => s.name).join(' and ')} have the strongest community support.`);
    }

    return recommendations;
  }

  // Get recommendations based on project constraints with AI enhancement
  async getRecommendationsForConstraints(constraints: {
    projectType?: string;
    teamSize?: string;
    timeline?: string;
    scalability?: string;
    budget?: string;
    experience?: string;
    technologies?: string[];
  }): Promise<{
    recommended: TechStackKnowledge[];
    reasoning: string[];
    aiRecommendations?: string;
  }> {
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

    const recommended = this.searchTechStacks(query, 3);

    if (constraints.budget === 'low') {
      reasoning.push('Considering cost-effective open-source solutions');
    }

    // Get AI-enhanced recommendations if available
    if (this.isGoogleAIAvailable()) {
      try {
        const aiRecommendations = await this.generateAIRecommendations(constraints, recommended);
        return { recommended, reasoning, aiRecommendations };
      } catch (error) {
        console.warn('Failed to get AI recommendations:', error);
      }
    }

    return { recommended, reasoning };
  }

  // Generate AI recommendations based on constraints
  private async generateAIRecommendations(
    constraints: any, 
    recommended: TechStackKnowledge[]
  ): Promise<string> {
    if (!this.model) throw new Error('Google AI not initialized');

    const names = recommended.map(t => t.name).join(', ');
    const type = constraints.projectType || 'project';
    const team = constraints.teamSize ? `, team size: ${constraints.teamSize}` : '';
    const timeline = constraints.timeline ? `, timeline: ${constraints.timeline}` : '';
    
    const prompt = `Recommend ${names} for ${type}${team}${timeline} in 140 words covering:
1. Why Suitable: Specific reasons for this project
2. Architecture Fit: How it matches requirements
3. Scaling Approach: Growth strategy
4. Cost Factors: Budget considerations
5. Risk Mitigation: How to minimize issues`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
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
export const googleRAGService = new GoogleRAGService();