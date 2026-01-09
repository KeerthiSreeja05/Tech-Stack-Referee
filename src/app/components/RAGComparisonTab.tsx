import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, TrendingUp, Users, DollarSign, Zap, Search, Brain, Lightbulb, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ragService, TechStackKnowledge } from '../services/ragService';
import { googleRAGService } from '../services/googleRAGService';

interface RAGComparisonTabProps {
  constraints?: {
    projectType?: string;
    teamSize?: string;
    timeline?: string;
    scalability?: string;
    budget?: string;
    experience?: string;
    technologies?: string[];
  };
}

export function RAGComparisonTab({ constraints }: RAGComparisonTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<TechStackKnowledge[]>([]);
  const [comparison, setComparison] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('comparison');
  const [isAIConfigured, setIsAIConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate recommended stacks based on constraints
  const generateRecommendedStacks = (constraints: any): string[] => {
    const recommendedStacks: string[] = [];
    
    if (!constraints) {
      // Default fallback stacks
      return ['react', 'nodejs', 'mongodb'];
    }

    console.log('Generating recommendations for constraints:', constraints);

    // Frontend recommendations based on project type and experience
    if (constraints.projectType === 'web-app' || constraints.projectType === 'full-stack') {
      if (constraints.experience === 'beginner') {
        recommendedStacks.push('react'); // Easier to learn
      } else {
        recommendedStacks.push('react'); // Still popular choice
      }
    }
    
    if (constraints.projectType === 'mobile') {
      recommendedStacks.push('react'); // React Native for mobile
    }

    // Backend recommendations based on team expertise and project type
    if (constraints.projectType === 'api' || constraints.projectType === 'full-stack' || constraints.projectType === 'mobile') {
      if (constraints.technologies?.includes('javascript') || constraints.technologies?.includes('typescript') || constraints.technologies?.includes('react')) {
        recommendedStacks.push('nodejs');
        if (constraints.scalability !== 'high') {
          recommendedStacks.push('express'); // Add Express for simpler projects
        }
      } else if (constraints.technologies?.includes('python')) {
        recommendedStacks.push('django');
      } else if (constraints.experience === 'beginner') {
        recommendedStacks.push('nodejs', 'express'); // Easier for beginners
      } else {
        recommendedStacks.push('nodejs'); // Default to Node.js
      }
    }

    // Database recommendations based on scale, budget, and experience
    if (constraints.scalability === 'high' && constraints.budget !== 'high') {
      recommendedStacks.push('postgresql'); // Best for high scale + cost efficiency
    } else if (constraints.experience === 'beginner' || constraints.timeline === 'short') {
      recommendedStacks.push('firebase'); // Fastest to get started
    } else if (constraints.projectType === 'mobile' || constraints.scalability === 'medium') {
      recommendedStacks.push('mongodb'); // Good for flexible schemas
    } else {
      recommendedStacks.push('postgresql'); // Default reliable choice
    }

    // Add complementary technologies based on selections
    if (recommendedStacks.includes('nodejs') && !recommendedStacks.includes('express') && recommendedStacks.length < 4) {
      recommendedStacks.push('express');
    }

    // Ensure we have at least 3 stacks for meaningful comparison
    if (recommendedStacks.length < 3) {
      const fallbackStacks = ['react', 'nodejs', 'mongodb', 'express', 'postgresql', 'django', 'firebase'];
      for (const stack of fallbackStacks) {
        if (!recommendedStacks.includes(stack) && recommendedStacks.length < 4) {
          recommendedStacks.push(stack);
        }
      }
    }

    console.log('Recommended stacks:', recommendedStacks);
    return recommendedStacks.slice(0, 4); // Limit to 4 stacks for better comparison
  };

  // Initialize with default comparison and recommendations
  useEffect(() => {
    // Generate recommended stacks based on constraints
    const recommendedStackIds = generateRecommendedStacks(constraints);
    setSelectedStacks(recommendedStackIds);
    
    setIsAIConfigured(googleRAGService.isGoogleAIAvailable());
  }, [constraints]);

  // Update comparison when selected stacks change
  useEffect(() => {
    if (selectedStacks.length > 0) {
      updateComparison();
    }
    if (constraints) {
      loadRecommendations();
    }
  }, [selectedStacks]);

  const updateComparison = async () => {
    setIsLoading(true);
    try {
      // Use Google AI service if available, fallback to basic service
      if (googleRAGService.isGoogleAIAvailable()) {
        const comparisonData = await googleRAGService.compareTechStacksWithAI(selectedStacks);
        setComparison(comparisonData);
      } else {
        const comparisonData = ragService.compareTechStacks(selectedStacks);
        setComparison(comparisonData);
      }
    } catch (error) {
      console.error('Error updating comparison:', error);
      // Fallback to basic comparison
      const comparisonData = ragService.compareTechStacks(selectedStacks);
      setComparison(comparisonData);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecommendations = async () => {
    if (!constraints) return;
    
    try {
      if (googleRAGService.isGoogleAIAvailable()) {
        const recs = await googleRAGService.getRecommendationsForConstraints(constraints);
        setRecommendations(recs);
      } else {
        const recs = ragService.getRecommendationsForConstraints(constraints);
        setRecommendations(recs);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Fallback to basic recommendations
      const recs = ragService.getRecommendationsForConstraints(constraints);
      setRecommendations(recs);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = googleRAGService.searchTechStacks(query, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleStackSelection = (stackId: string) => {
    setSelectedStacks(prev => {
      if (prev.includes(stackId)) {
        return prev.filter(id => id !== stackId);
      } else if (prev.length < 4) { // Limit to 4 stacks for better comparison
        return [...prev, stackId];
      }
      return prev;
    });
  };

  const getStackById = (id: string) => {
    return googleRAGService.getTechStackById(id);
  };

  const getMetricValue = (stack: TechStackKnowledge, metric: string): number => {
    const mappings = {
      learningCurve: { easy: 90, medium: 70, hard: 40 },
      scalability: { low: 40, medium: 70, high: 90 },
      community: { small: 40, medium: 70, large: 90 },
      performance: { low: 40, medium: 70, high: 90 }
    };
    
    return mappings[metric as keyof typeof mappings]?.[stack[metric as keyof TechStackKnowledge] as keyof any] || 50;
  };

  const getRiskLevel = (stack: TechStackKnowledge): 'low' | 'medium' | 'high' => {
    if (stack.maturity === 'mature' && stack.community === 'large') return 'low';
    if (stack.maturity === 'new' || stack.community === 'small') return 'high';
    return 'medium';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]';
      case 'medium':
        return 'bg-[#FFF3E0] text-[#E65100] border-[#FFB74D]';
      case 'high':
        return 'bg-[#FFEBEE] text-[#C62828] border-[#E57373]';
      default:
        return 'bg-[#E8F0FE] text-[#1F4FD8] border-[#90CAF9]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-[#1F4FD8]" />
          <div>
            <h2 className="text-xl sm:text-2xl text-[#1A2332]">AI-Powered Stack Analysis</h2>
            <p className="text-[#64748B]">
              {constraints 
                ? 'Personalized recommendations based on your project constraints'
                : 'Intelligent comparison using our comprehensive tech stack knowledge base'
              }
            </p>
          </div>
        </div>

        {/* Constraints Summary */}
        {constraints && (
          <div className="bg-gradient-to-r from-[#E8F0FE] to-[#F8FAFC] rounded-xl p-4 mb-6 border border-[#E8EFFD]">
            <h3 className="text-sm font-medium text-[#1F4FD8] mb-2">Your Project Requirements:</h3>
            <div className="flex flex-wrap gap-2 text-sm text-[#64748B]">
              {constraints.projectType && (
                <span className="bg-white px-3 py-1 rounded-full border border-[#E8EFFD]">
                  📋 {constraints.projectType.replace('-', ' ')}
                </span>
              )}
              {constraints.experience && (
                <span className="bg-white px-3 py-1 rounded-full border border-[#E8EFFD]">
                  👤 {constraints.experience} level
                </span>
              )}
              {constraints.scalability && (
                <span className="bg-white px-3 py-1 rounded-full border border-[#E8EFFD]">
                  📈 {constraints.scalability} scale
                </span>
              )}
              {constraints.budget && (
                <span className="bg-white px-3 py-1 rounded-full border border-[#E8EFFD]">
                  💰 {constraints.budget} budget priority
                </span>
              )}
              {constraints.technologies && constraints.technologies.length > 0 && (
                <span className="bg-white px-3 py-1 rounded-full border border-[#E8EFFD]">
                  🛠️ {constraints.technologies.join(', ')} experience
                </span>
              )}
            </div>
          </div>
        )}

        {/* Search Interface */}
        <div className="bg-white rounded-[18px] p-6 shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD] mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-5 h-5 text-[#64748B]" />
            <Input
              placeholder="Search for additional technologies to compare (e.g., 'Vue', 'Angular', 'FastAPI')"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 border-[#E8EFFD] focus:border-[#1F4FD8] rounded-xl"
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <p className="text-sm text-[#64748B] mb-3">Add to comparison:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {searchResults.map((stack) => (
                  <button
                    key={stack.id}
                    onClick={() => toggleStackSelection(stack.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      selectedStacks.includes(stack.id)
                        ? 'border-[#1F4FD8] bg-[#E8F0FE] text-[#1F4FD8]'
                        : 'border-[#E8EFFD] hover:border-[#1F4FD8] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="text-sm font-medium">{stack.name}</div>
                    <div className="text-xs text-[#64748B] mt-1">{stack.category}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Stacks */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-[#64748B]">
              {constraints ? 'Recommended for your project:' : 'Selected:'}
            </span>
            {selectedStacks.map((stackId) => {
              const stack = getStackById(stackId);
              return stack ? (
                <Badge
                  key={stackId}
                  variant="outline"
                  className="bg-[#1F4FD8] text-white border-[#1F4FD8] cursor-pointer"
                  onClick={() => toggleStackSelection(stackId)}
                >
                  {stack.name} ×
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-[#F8FAFC] p-1 rounded-xl">
          <TabsTrigger value="comparison" className="rounded-lg">Stack Comparison</TabsTrigger>
          <TabsTrigger value="recommendations" className="rounded-lg">AI Recommendations</TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg">Deep Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#1F4FD8] border-t-transparent rounded-full animate-spin" />
                <span className="text-[#64748B]">
                  {isAIConfigured ? 'Generating AI-powered insights...' : 'Loading comparison...'}
                </span>
              </div>
            </div>
          )}
          
          {comparison && !isLoading && (
            <>
              {/* AI Insights Banner */}
              {comparison.comparison.aiInsights && (
                <Card className="border-2 border-[#E8F5E9] bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] shadow-[0_4px_24px_rgba(46,125,50,0.08)]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#2E7D32] mb-2">AI Strategic Insights</h3>
                        <div className="text-sm text-[#2E7D32]/80 whitespace-pre-wrap leading-relaxed">
                          {comparison.comparison.aiInsights}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {comparison.stacks.map((stack: TechStackKnowledge, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-[18px] p-6 shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD] hover:shadow-[0_12px_40px_rgba(31,79,216,0.16)] hover:border-[#1F4FD8] transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {stack.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl text-[#1A2332]">{stack.name}</h3>
                        <p className="text-sm text-[#64748B]">{stack.category}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(getRiskLevel(stack))} border rounded-full px-3 py-1`}
                    >
                      {getRiskLevel(stack) === 'low' ? '✓ Low Risk' : 
                       getRiskLevel(stack) === 'medium' ? '⚠ Medium Risk' : '⚠ High Risk'}
                    </Badge>
                  </div>

                  {/* Description */}
                  <div className="mb-6 bg-[#F8FAFC] rounded-xl p-4">
                    <p className="text-sm text-[#475569]">{stack.description}</p>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-6">
                    <h4 className="text-sm text-[#1A2332] mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#1F4FD8]" />
                      Best For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.useCases.slice(0, 3).map((useCase, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-[#E8F0FE] text-[#1F4FD8] border-[#90CAF9]">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pros */}
                  <div className="mb-6 flex-grow">
                    <h4 className="text-sm text-[#1A2332] mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1F4FD8]" />
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {stack.pros.slice(0, 4).map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                          <span className="text-[#1F4FD8] mt-0.5">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="mb-6">
                    <h4 className="text-sm text-[#1A2332] mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#64748B]" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {stack.cons.slice(0, 3).map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#64748B]">
                          <span className="mt-0.5">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="pt-6 border-t border-[#E8EFFD] space-y-3">
                    <MetricBar 
                      label="Learning Curve" 
                      value={getMetricValue(stack, 'learningCurve')} 
                      icon={<TrendingUp className="w-4 h-4" />} 
                    />
                    <MetricBar 
                      label="Scalability" 
                      value={getMetricValue(stack, 'scalability')} 
                      icon={<Zap className="w-4 h-4" />} 
                    />
                    <MetricBar 
                      label="Community" 
                      value={getMetricValue(stack, 'community')} 
                      icon={<Users className="w-4 h-4" />} 
                    />
                    <MetricBar 
                      label="Performance" 
                      value={getMetricValue(stack, 'performance')} 
                      icon={<DollarSign className="w-4 h-4" />} 
                    />
                  </div>

                  {/* Real-world Examples */}
                  <div className="mt-4 pt-4 border-t border-[#E8EFFD]">
                    <p className="text-xs text-[#64748B] mb-2">Used by:</p>
                    <div className="flex flex-wrap gap-1">
                      {stack.realWorldExamples.slice(0, 3).map((example, i) => (
                        <span key={i} className="text-xs bg-[#F1F5F9] text-[#475569] px-2 py-1 rounded">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {recommendations && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Recommendations */}
              <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                    <Brain className="w-5 h-5 text-[#1F4FD8]" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.reasoning.map((reason: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl">
                      <Lightbulb className="w-5 h-5 text-[#1F4FD8] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#475569]">{reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Enhanced Recommendations */}
              {recommendations?.aiRecommendations && (
                <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                      <Sparkles className="w-5 h-5 text-[#1F4FD8]" />
                      AI Strategic Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-[#475569] whitespace-pre-wrap leading-relaxed">
                      {recommendations.aiRecommendations}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommended Stacks */}
              <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                    <CheckCircle2 className="w-5 h-5 text-[#1F4FD8]" />
                    Top Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.recommended.map((stack: TechStackKnowledge, index: number) => (
                    <div key={index} className="p-4 border border-[#E8EFFD] rounded-xl hover:border-[#1F4FD8] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-[#1A2332]">{stack.name}</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStackSelection(stack.id)}
                          className={selectedStacks.includes(stack.id) ? 'bg-[#1F4FD8] text-white' : ''}
                        >
                          {selectedStacks.includes(stack.id) ? 'Added' : 'Add to Compare'}
                        </Button>
                      </div>
                      <p className="text-sm text-[#64748B] mb-3">{stack.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {stack.tags.slice(0, 4).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {comparison && (
            <div className="space-y-6">
              {/* AI-Generated Deep Insights */}
              {comparison.comparison.aiInsights && (
                <Card className="border-2 border-[#E8F5E9] bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] shadow-[0_4px_24px_rgba(46,125,50,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#2E7D32]">
                      <Brain className="w-5 h-5" />
                      AI Strategic Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-[#2E7D32]/90 whitespace-pre-wrap leading-relaxed">
                      {comparison.comparison.aiInsights}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Constraint-Specific AI Insights */}
              {constraints && recommendations?.aiRecommendations && (
                <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                      <TrendingUp className="w-5 h-5 text-[#1F4FD8]" />
                      Project-Specific Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-[#475569] whitespace-pre-wrap leading-relaxed">
                      {recommendations.aiRecommendations}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Fallback to Basic Analysis if AI not available */}
              {!comparison.comparison.aiInsights && !recommendations?.aiRecommendations && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Comparative Analysis */}
                  <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                        <TrendingUp className="w-5 h-5 text-[#1F4FD8]" />
                        Comparative Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {comparison.comparison.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="p-4 bg-[#F8FAFC] rounded-xl">
                          <p className="text-sm text-[#475569]">{rec}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Best Practices */}
                  <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#1A2332]">
                        <Lightbulb className="w-5 h-5 text-[#1F4FD8]" />
                        Best Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {comparison.stacks.map((stack: TechStackKnowledge, index: number) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-medium text-[#1A2332]">{stack.name}</h4>
                          <ul className="space-y-1">
                            {stack.bestPractices.slice(0, 2).map((practice, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                                <span className="text-[#1F4FD8] mt-0.5">•</span>
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* AI Status Message */}
              {!isAIConfigured && (
                <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8E1] border-2 border-[#FFE082] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FFB74D] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#E65100] mb-2">Enhanced AI Insights Available</h4>
                      <p className="text-xs text-[#E65100]/80 mb-3">
                        Configure Google AI to unlock deeper strategic analysis, architecture recommendations, 
                        and personalized insights based on your specific project constraints.
                      </p>
                      <p className="text-xs text-[#E65100]/80">
                        The current analysis uses our knowledge base. With AI, you'll get contextual insights 
                        tailored to your exact requirements.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-[#64748B] flex items-center gap-1.5">
          {icon}
          {label}
        </span>
        <span className="text-xs text-[#1F4FD8]">{value}%</span>
      </div>
      <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1F4FD8] to-[#60A5FA] rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}