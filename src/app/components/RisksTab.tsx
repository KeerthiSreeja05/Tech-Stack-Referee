import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Wrench, Database, Shield, Brain, Sparkles } from 'lucide-react';
import { googleRAGService, TechStackKnowledge } from '../services/googleRAGService';

interface RisksTabProps {
  constraints?: any;
  selectedStacks?: string[];
}

export function RisksTab({ constraints, selectedStacks }: RisksTabProps) {
  const [aiRiskAnalysis, setAiRiskAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);

  useEffect(() => {
    console.log('RisksTab - useEffect triggered:', { constraints, selectedStacks });
    setIsAIConfigured(googleRAGService.isGoogleAIAvailable());
    console.log('AI Available:', googleRAGService.isGoogleAIAvailable());
    if (googleRAGService.isGoogleAIAvailable() && selectedStacks && selectedStacks.length > 0) {
      console.log('Generating risk analysis...');
      generateRiskAnalysis();
    } else {
      console.log('Not generating AI analysis - AI available:', googleRAGService.isGoogleAIAvailable(), 'selectedStacks:', selectedStacks);
    }
  }, [constraints, selectedStacks]);

  const generateRiskAnalysis = async () => {
    if (!selectedStacks || selectedStacks.length === 0) return;
    
    setIsLoading(true);
    try {
      const stacks = selectedStacks.map(id => googleRAGService.getTechStackById(id)).filter((stack): stack is TechStackKnowledge => stack !== undefined);
      if (stacks.length === 0) return;

      const riskAnalysis = await googleRAGService.generateRiskAnalysis(stacks, constraints);
      setAiRiskAnalysis(riskAnalysis);
    } catch (error) {
      console.error('Failed to generate risk analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'border-[#A5D6A7] bg-[#E8F5E9]';
      case 'medium':
        return 'border-[#FFE082] bg-[#FFF9E6]';
      case 'high':
        return 'border-[#FFAB91] bg-[#FFF3E0]';
      default:
        return 'border-[#90CAF9] bg-[#E8F0FE]';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-[#2E7D32]';
      case 'medium':
        return 'text-[#F57C00]';
      case 'high':
        return 'text-[#D84315]';
      default:
        return 'text-[#1F4FD8]';
    }
  };

  const staticRisks = [
    {
      title: 'Scaling Pain Points',
      description: 'As user load increases, certain architectural decisions made early can become expensive to change. MongoDB requires careful indexing and sharding strategy. Firebase query limitations become apparent beyond simple use cases.',
      stacks: ['MERN Stack', 'Firebase + React'],
      icon: <TrendingUp className="w-5 h-5" />,
      severity: 'medium',
    },
    {
      title: 'Cost Surprises',
      description: 'Firebase pricing can spike unexpectedly with traffic growth - a single viral feature can multiply costs overnight. Self-hosted solutions (MERN, Django) require DevOps expertise but offer more predictable costs at scale.',
      stacks: ['Firebase + React'],
      icon: <DollarSign className="w-5 h-5" />,
      severity: 'high',
    },
    {
      title: 'Maintenance Complexity',
      description: 'MERN requires keeping Node.js, MongoDB, Express, and React versions compatible. Django\'s monolithic nature means large refactors when splitting services. More moving parts = more things to maintain.',
      stacks: ['MERN Stack', 'Django + React'],
      icon: <Wrench className="w-5 h-5" />,
      severity: 'medium',
    },
    {
      title: 'Vendor Lock-in',
      description: 'Firebase ties you deeply to Google Cloud Platform. Migrating away requires rewriting most backend logic. This isn\'t necessarily bad, but it\'s a one-way door decision that should be made consciously.',
      stacks: ['Firebase + React'],
      icon: <Database className="w-5 h-5" />,
      severity: 'high',
    },
    {
      title: 'Security Considerations',
      description: 'Django has built-in protections against common vulnerabilities (CSRF, XSS, SQL injection). MERN and Firebase require more manual security configuration - easy to get wrong without experience.',
      stacks: ['MERN Stack', 'Firebase + React'],
      icon: <Shield className="w-5 h-5" />,
      severity: 'medium',
    },
    {
      title: 'Team Knowledge Gap',
      description: 'Choosing a stack your team doesn\'t know well means 3-6 months of reduced productivity. The "best" stack that nobody understands is worse than a "good enough" stack with existing expertise.',
      stacks: ['All Stacks'],
      icon: <AlertTriangle className="w-5 h-5" />,
      severity: 'high',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFE082] to-[#FFB74D] rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#7C6B00]" />
          </div>
          <div>
            <h2 className="text-2xl text-[#1A2332]">Long-Term Risks & Considerations</h2>
            <p className="text-[#64748B]">
              Potential challenges to be aware of — not dealbreakers, just things to plan for
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#FFB74D] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#64748B]">Analyzing potential risks and mitigation strategies...</span>
            </div>
          </div>
        )}

        {/* AI-Generated Risk Analysis */}
        {aiRiskAnalysis && !isLoading && (
          <div className="bg-white rounded-[18px] p-8 shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD]">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-[#FFB74D]" />
              <div>
                <h3 className="text-lg text-[#1A2332] flex items-center gap-2">
                  AI Risk Analysis
                  <Sparkles className="w-4 h-4 text-[#FFB74D]" />
                </h3>
                <p className="text-sm text-[#64748B]">Personalized risk assessment based on your project constraints</p>
              </div>
            </div>
            <div className="text-[#475569] whitespace-pre-wrap leading-relaxed">
              {aiRiskAnalysis}
            </div>
          </div>
        )}

        {/* Show fallback static content when AI is not available or no AI analysis */}
        {!aiRiskAnalysis && !isLoading && (
          <>
            <div className="space-y-4">
              {staticRisks.map((risk, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-[16px] p-6 shadow-[0_2px_12px_rgba(31,79,216,0.06)] border-2 ${getSeverityColor(risk.severity)} transition-all hover:shadow-[0_4px_20px_rgba(31,79,216,0.12)]`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getSeverityColor(risk.severity)} border ${getSeverityTextColor(risk.severity)}`}>
                      {risk.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-[#1A2332]">{risk.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full border ${getSeverityColor(risk.severity)} ${getSeverityTextColor(risk.severity)}`}>
                          {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Priority
                        </span>
                      </div>
                      <p className="text-[#475569] mb-3 leading-relaxed">{risk.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {risk.stacks.map((stack, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 bg-[#F1F5F9] text-[#64748B] rounded-full border border-[#E2E8F0]"
                          >
                            Affects: {stack}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Advice */}
            <div className="bg-gradient-to-br from-[#E8F0FE] to-white rounded-[18px] p-6 border-2 border-[#1F4FD8]">
              <h3 className="text-lg text-[#1A2332] mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1F4FD8]" />
                Mitigating These Risks
              </h3>
              <ul className="space-y-2 text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#1F4FD8] mt-1">•</span>
                  <span><strong className="text-[#1A2332]">Start simple:</strong> Don't over-engineer for scale you don't have yet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1F4FD8] mt-1">•</span>
                  <span><strong className="text-[#1A2332]">Monitor early:</strong> Set up cost alerts and performance tracking from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1F4FD8] mt-1">•</span>
                  <span><strong className="text-[#1A2332]">Plan migrations:</strong> Keep data models portable and avoid deep vendor-specific features until necessary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1F4FD8] mt-1">•</span>
                  <span><strong className="text-[#1A2332]">Invest in knowledge:</strong> Budget time for learning and proper implementation patterns</span>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Show AI Enhancement Notice only when AI is not configured */}
        {!isAIConfigured && (
          <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8E1] border-2 border-[#FFE082] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFB74D] rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#E65100] mb-2">Enhanced Risk Analysis Available</h4>
                <p className="text-xs text-[#E65100]/80">
                  Configure Google AI to get personalized risk assessment based on your specific project constraints, 
                  team expertise, and selected technologies. Get tailored mitigation strategies and early warning indicators.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}