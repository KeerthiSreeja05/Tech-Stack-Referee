import { useState, useEffect } from 'react';
import { Lightbulb, Scale, Target, Brain, Sparkles } from 'lucide-react';
import { googleRAGService, TechStackKnowledge } from '../services/googleRAGService';

interface RefereeInsightTabProps {
  constraints?: any;
  selectedStacks?: string[];
}

export function RefereeInsightTab({ constraints, selectedStacks }: RefereeInsightTabProps) {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);

  useEffect(() => {
    console.log('RefereeInsightTab - useEffect triggered:', { constraints, selectedStacks });
    setIsAIConfigured(googleRAGService.isGoogleAIAvailable());
    console.log('AI Available:', googleRAGService.isGoogleAIAvailable());
    if (googleRAGService.isGoogleAIAvailable() && selectedStacks && selectedStacks.length > 0) {
      console.log('Generating referee insight...');
      generateRefereeInsight();
    } else {
      console.log('Not generating AI insight - AI available:', googleRAGService.isGoogleAIAvailable(), 'selectedStacks:', selectedStacks);
    }
  }, [constraints, selectedStacks]);

  const generateRefereeInsight = async () => {
    if (!selectedStacks || selectedStacks.length === 0) return;
    
    console.log('Starting generateRefereeInsight with stacks:', selectedStacks);
    setIsLoading(true);
    try {
      const stacks = selectedStacks.map(id => googleRAGService.getTechStackById(id)).filter((stack): stack is TechStackKnowledge => stack !== undefined);
      console.log('Found stacks:', stacks);
      if (stacks.length === 0) return;

      console.log('Calling googleRAGService.generateRefereeInsight...');
      const insight = await googleRAGService.generateRefereeInsight(stacks, constraints);
      console.log('Generated insight:', insight);
      setAiInsight(insight);
    } catch (error) {
      console.error('Failed to generate referee insight:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-[18px] p-8 shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-2xl mb-4">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl mb-2 text-[#1A2332]">Referee Insight</h2>
          <p className="text-[#64748B]">
            An objective analysis of trade-offs — no single "winner" declared
          </p>
        </div>

        {/* Debug Information */}
        <div className="bg-yellow-100 border border-yellow-400 rounded p-4 mb-4">
          <h4 className="font-bold">Debug Info:</h4>
          <p>AI Configured: {isAIConfigured ? 'Yes' : 'No'}</p>
          <p>Selected Stacks: {selectedStacks ? selectedStacks.join(', ') : 'None'}</p>
          <p>Selected Stacks Length: {selectedStacks ? selectedStacks.length : 0}</p>
          <p>Constraints: {constraints ? JSON.stringify(constraints).substring(0, 100) + '...' : 'None'}</p>
          <p>AI Insight Length: {aiInsight ? aiInsight.length : 0}</p>
          <p>Is Loading: {isLoading ? 'Yes' : 'No'}</p>
        </div>

        {/* Main Insight */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#1F4FD8] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#64748B]">Generating neutral referee analysis...</span>
            </div>
          </div>
        )}

        {aiInsight && !isLoading && (
          <div className="prose prose-lg max-w-none mb-8">
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#E8F0FE] rounded-xl p-6 mb-6">
              <h3 className="text-lg text-[#1A2332] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#1F4FD8]" />
                AI Referee Analysis
                <Sparkles className="w-4 h-4 text-[#1F4FD8]" />
              </h3>
              <div className="space-y-4 text-[#475569] whitespace-pre-wrap leading-relaxed">
                {aiInsight}
              </div>
            </div>
          </div>
        )}

        {/* Show fallback content when AI is not available or no AI insight */}
        {!aiInsight && !isLoading && (
          <div className="prose prose-lg max-w-none mb-8">
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#E8F0FE] rounded-xl p-6 mb-6">
              <h3 className="text-lg text-[#1A2332] mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#1F4FD8]" />
                The Verdict: It Depends on Your Priorities
              </h3>
              <div className="space-y-4 text-[#475569]">
                <p>
                  After analyzing your constraints, here's the nuanced reality: <strong className="text-[#1A2332]">each stack excels in different scenarios</strong>, and the "best" choice depends entirely on what you value most.
                </p>
                <p>
                  <strong className="text-[#1F4FD8]">If speed-to-market is your priority:</strong> Firebase + React lets you build and ship fastest. You'll have authentication, real-time data, and hosting configured in hours, not days. Perfect for MVPs and prototypes where validation matters more than perfect architecture.
                </p>
                <p>
                  <strong className="text-[#1F4FD8]">If you need predictable scaling:</strong> MERN Stack gives you the most flexibility. MongoDB scales horizontally well when configured properly, and Node.js handles concurrent connections efficiently. The JavaScript monoculture means your team can move fast without context switching.
                </p>
                <p>
                  <strong className="text-[#1F4FD8]">If stability and structure matter most:</strong> Django + React provides the most "batteries-included" experience. Django's opinionated design prevents common security mistakes, and the admin panel saves weeks of development time. Python's readability makes onboarding new developers smoother.
                </p>
              </div>
            </div>

            {/* Trade-offs Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <TradeoffCard
                title="Flexibility vs. Structure"
                description="MERN offers maximum flexibility. Django enforces best practices. Firebase restricts backend control entirely."
                icon={<Scale className="w-5 h-5" />}
              />
              <TradeoffCard
                title="Learning Curve vs. Power"
                description="Firebase is easiest to start. MERN balances approachability with control. Django requires more upfront learning."
                icon={<Target className="w-5 h-5" />}
              />
              <TradeoffCard
                title="Speed vs. Cost at Scale"
                description="Firebase ships fastest but costs scale exponentially. MERN and Django require more setup but offer better long-term economics."
                icon={<Lightbulb className="w-5 h-5" />}
              />
            </div>
          </div>
        )}

        {/* Show AI Enhancement Notice only when AI is not configured */}
        {!isAIConfigured && (
          <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8E1] border-2 border-[#FFE082] rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FFB74D] rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#E65100] mb-2">Enhanced Referee Analysis Available</h4>
                <p className="text-xs text-[#E65100]/80">
                  Configure Google AI to get personalized, neutral analysis based on your specific project constraints and selected technologies. 
                  The AI referee provides unbiased insights tailored to your exact requirements.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Note */}
        <div className="bg-[#FFF9E6] border-2 border-[#FFE082] rounded-xl p-6">
          <p className="text-sm text-[#7C6B00]">
            <strong className="text-[#5D4E00]">Remember:</strong> The "wrong" stack chosen quickly beats the "perfect" stack chosen slowly. Start with what your team knows best, ship something real, and iterate based on actual usage patterns — not theoretical scaling concerns.
          </p>
        </div>
      </div>
    </div>
  );
}

function TradeoffCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border-2 border-[#E8EFFD] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2 text-[#1F4FD8]">
        {icon}
        <h4 className="text-sm text-[#1A2332]">{title}</h4>
      </div>
      <p className="text-xs text-[#64748B]">{description}</p>
    </div>
  );
}