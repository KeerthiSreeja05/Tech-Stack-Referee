import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { ConstraintsTab } from './components/ConstraintsTab';
import { ComparisonTab } from './components/ComparisonTab';
import { RAGComparisonTab } from './components/RAGComparisonTab';
import { RefereeInsightTab } from './components/RefereeInsightTab';
import { RisksTab } from './components/RisksTab';
import { RAGChatTab } from './components/RAGChatTab';
import { HomePage } from './components/HomePage';
import logo from '../assets/0cf99c5569f9132448cd9853ee36a6bcb8766b2f.png';

/**
 * Tech Stack Referee - A Premium SaaS Application
 * 
 * Purpose: Help users make confident technical decisions by comparing multiple 
 * tech stack options, explaining trade-offs, and guiding reasoning—never forcing 
 * a single answer.
 * 
 * Features:
 * - Constraints input interface for project requirements
 * - Side-by-side tech stack comparison (MERN, Django+React, Firebase+React)
 * - Neutral referee insights analyzing trade-offs
 * - Long-term risk considerations
 * - Interactive AI chat for Q&A
 */

export default function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [activeTab, setActiveTab] = useState('constraints');
  const [hasCompared, setHasCompared] = useState(false);
  const [constraints, setConstraints] = useState<any>(null);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const handleCompare = (constraintsData: any) => {
    console.log('Constraints:', constraintsData);
    setConstraints(constraintsData);
    
    // Generate recommended stacks based on constraints
    const recommendedStackIds = generateRecommendedStacks(constraintsData);
    setSelectedStacks(recommendedStackIds);
    
    setHasCompared(true);
    setActiveTab('comparison');
  };

  // Generate recommended stacks based on constraints
  const generateRecommendedStacks = (constraints: any): string[] => {
    const recommendedStacks: string[] = [];
    
    if (!constraints) {
      return ['react', 'nodejs', 'mongodb'];
    }

    // Frontend recommendations
    if (constraints.projectType === 'web-app' || constraints.projectType === 'full-stack') {
      recommendedStacks.push('react');
    }
    
    if (constraints.projectType === 'mobile') {
      recommendedStacks.push('react');
    }

    // Backend recommendations
    if (constraints.projectType === 'api' || constraints.projectType === 'full-stack' || constraints.projectType === 'mobile') {
      if (constraints.technologies?.includes('javascript') || constraints.technologies?.includes('typescript') || constraints.technologies?.includes('react')) {
        recommendedStacks.push('nodejs');
        if (constraints.scalability !== 'high') {
          recommendedStacks.push('express');
        }
      } else if (constraints.technologies?.includes('python')) {
        recommendedStacks.push('django');
      } else if (constraints.experience === 'beginner') {
        recommendedStacks.push('nodejs', 'express');
      } else {
        recommendedStacks.push('nodejs');
      }
    }

    // Database recommendations
    if (constraints.scalability === 'high' && constraints.budget !== 'high') {
      recommendedStacks.push('postgresql');
    } else if (constraints.experience === 'beginner' || constraints.timeline === 'short') {
      recommendedStacks.push('firebase');
    } else if (constraints.projectType === 'mobile' || constraints.scalability === 'medium') {
      recommendedStacks.push('mongodb');
    } else {
      recommendedStacks.push('postgresql');
    }

    // Ensure at least 3 stacks
    if (recommendedStacks.length < 3) {
      const fallbackStacks = ['react', 'nodejs', 'mongodb', 'express', 'postgresql', 'django', 'firebase'];
      for (const stack of fallbackStacks) {
        if (!recommendedStacks.includes(stack) && recommendedStacks.length < 4) {
          recommendedStacks.push(stack);
        }
      }
    }

    return recommendedStacks.slice(0, 4);
  };

  const handleReset = () => {
    setHasCompared(false);
    setConstraints(null);
    setSelectedStacks([]);
    setActiveTab('constraints');
  };

  const handleGetStarted = () => {
    setShowHomePage(false);
  };

  if (showHomePage) {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FAFC] to-[#E8F0FE]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-[#E8EFFD] shadow-[0_2px_16px_rgba(31,79,216,0.06)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="Tech Stack Referee" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl text-[#1A2332]">Tech Stack Referee</h1>
                <p className="text-xs text-[#64748B]">Make confident technical decisions</p>
              </div>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl">
              <TabButton
                active={activeTab === 'constraints'}
                onClick={() => setActiveTab('constraints')}
              >
                Constraints
              </TabButton>
              <TabButton
                active={activeTab === 'comparison'}
                onClick={() => setActiveTab('comparison')}
                disabled={!hasCompared}
              >
                Comparison
              </TabButton>
              <TabButton
                active={activeTab === 'insight'}
                onClick={() => setActiveTab('insight')}
                disabled={!hasCompared}
              >
                Referee Insight
              </TabButton>
              <TabButton
                active={activeTab === 'risks'}
                onClick={() => setActiveTab('risks')}
                disabled={!hasCompared}
              >
                Risks
              </TabButton>
              <TabButton
                active={activeTab === 'chat'}
                onClick={() => setActiveTab('chat')}
              >
                AI Chat
              </TabButton>
            </div>

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              className="hidden md:flex items-center gap-2 border-[#E8EFFD] hover:bg-[#F8FAFC] rounded-xl"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden lg:inline">New Decision</span>
            </Button>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
            <MobileTabButton
              active={activeTab === 'constraints'}
              onClick={() => setActiveTab('constraints')}
            >
              Constraints
            </MobileTabButton>
            <MobileTabButton
              active={activeTab === 'comparison'}
              onClick={() => setActiveTab('comparison')}
              disabled={!hasCompared}
            >
              Comparison
            </MobileTabButton>
            <MobileTabButton
              active={activeTab === 'insight'}
              onClick={() => setActiveTab('insight')}
              disabled={!hasCompared}
            >
              Insight
            </MobileTabButton>
            <MobileTabButton
              active={activeTab === 'risks'}
              onClick={() => setActiveTab('risks')}
              disabled={!hasCompared}
            >
              Risks
            </MobileTabButton>
            <MobileTabButton
              active={activeTab === 'chat'}
              onClick={() => setActiveTab('chat')}
            >
              AI Chat
            </MobileTabButton>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'constraints' && <ConstraintsTab onCompare={handleCompare} />}
        {activeTab === 'comparison' && <RAGComparisonTab constraints={constraints} />}
        {activeTab === 'insight' && <RefereeInsightTab constraints={constraints} selectedStacks={selectedStacks} />}
        {activeTab === 'risks' && <RisksTab constraints={constraints} selectedStacks={selectedStacks} />}
        {activeTab === 'chat' && <RAGChatTab constraints={constraints} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#E8EFFD] py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#64748B] hover:text-[#1F4FD8] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://github.com/KeerthiSreeja05/Tech-Stack-Referee/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#64748B] hover:text-[#1F4FD8] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.588.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z" />
                </svg>
                Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm transition-all ${
        active
          ? 'bg-[#1F4FD8] text-white shadow-[0_4px_12px_rgba(31,79,216,0.24)]'
          : disabled
          ? 'text-[#CBD5E1] cursor-not-allowed'
          : 'text-[#64748B] hover:bg-white hover:text-[#1F4FD8]'
      }`}
    >
      {children}
    </button>
  );
}

function MobileTabButton({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
        active
          ? 'bg-[#1F4FD8] text-white'
          : disabled
          ? 'text-[#CBD5E1] cursor-not-allowed'
          : 'text-[#64748B] bg-white border border-[#E8EFFD]'
      }`}
    >
      {children}
    </button>
  );
}