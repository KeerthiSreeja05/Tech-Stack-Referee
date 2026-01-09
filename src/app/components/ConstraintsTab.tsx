import { useState } from 'react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { HelpCircle, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Zap, Brain, Rocket } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ConstraintsTabProps {
  onCompare: (constraints: any) => void;
}

export function ConstraintsTab({ onCompare }: ConstraintsTabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectType, setProjectType] = useState<string>('');
  const [teamExpertise, setTeamExpertise] = useState<string[]>([]);
  const [expectedScale, setExpectedScale] = useState<number[]>([50]);
  const [budgetSensitivity, setBudgetSensitivity] = useState<string>('');

  const steps = [
    { id: 'project-type', title: 'Project Type', description: 'What are you building?', icon: Rocket },
    { id: 'team-expertise', title: 'Team Expertise', description: 'What does your team know?', icon: Brain },
    { id: 'expected-scale', title: 'Expected Scale', description: 'How big will it get?', icon: Zap },
    { id: 'budget', title: 'Budget Sensitivity', description: 'How important is cost?', icon: Sparkles },
  ];

  const projectTypes = [
    { 
      id: 'web-app', 
      label: 'Web App', 
      icon: '🌐', 
      description: 'Browser-based application',
      details: 'Perfect for SaaS, dashboards, and web platforms',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'mobile', 
      label: 'Mobile App', 
      icon: '📱', 
      description: 'iOS/Android application',
      details: 'Native or cross-platform mobile experience',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'api', 
      label: 'API Service', 
      icon: '🔌', 
      description: 'Backend API only',
      details: 'RESTful or GraphQL API for other apps',
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      id: 'full-stack', 
      label: 'Full Stack', 
      icon: '⚡', 
      description: 'Complete platform',
      details: 'End-to-end web application with all features',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const expertiseOptions = [
    { id: 'javascript', label: 'JavaScript', icon: '💛', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
    { id: 'python', label: 'Python', icon: '🐍', color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { id: 'typescript', label: 'TypeScript', icon: '💙', color: 'bg-indigo-100 border-indigo-300 text-indigo-700' },
    { id: 'react', label: 'React', icon: '⚛️', color: 'bg-cyan-100 border-cyan-300 text-cyan-700' },
    { id: 'backend', label: 'Backend', icon: '⚙️', color: 'bg-gray-100 border-gray-300 text-gray-700' },
    { id: 'none', label: 'Learning from scratch', icon: '🌱', color: 'bg-green-100 border-green-300 text-green-700' },
  ];

  const budgetOptions = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      description: 'Focus on features and speed',
      details: 'Budget is not a constraint', 
      icon: '🚀',
      gradient: 'from-purple-500 to-indigo-500'
    },
    { 
      value: 'moderate', 
      label: 'Balanced', 
      description: 'Balance cost and features',
      details: 'Want good value for money', 
      icon: '⚖️',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      description: 'Cost optimization critical',
      details: 'Every dollar counts', 
      icon: '💰',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  const toggleExpertise = (id: string) => {
    if (teamExpertise.includes(id)) {
      setTeamExpertise(teamExpertise.filter(e => e !== id));
    } else {
      setTeamExpertise([...teamExpertise, id]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return projectType !== '';
      case 1:
        return teamExpertise.length > 0;
      case 2:
        return true;
      case 3:
        return budgetSensitivity !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompare();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompare = () => {
    const constraintsData = {
      projectType,
      teamSize: teamExpertise.includes('none') ? 'small' : teamExpertise.length > 3 ? 'large' : 'medium',
      timeline: teamExpertise.includes('none') ? 'long' : 'medium',
      scalability: expectedScale[0] < 30 ? 'low' : expectedScale[0] < 70 ? 'medium' : 'high',
      budget: budgetSensitivity,
      experience: teamExpertise.includes('none') ? 'beginner' : teamExpertise.length > 2 ? 'expert' : 'intermediate',
      technologies: teamExpertise,
      scalePercentage: expectedScale[0]
    };
    
    onCompare(constraintsData);
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Progress Indicator */}
      <div className="mb-12 relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] text-white shadow-lg scale-95'
                        : index === currentStep
                        ? 'bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] text-white ring-4 ring-[#E8F0FE] shadow-2xl scale-110'
                        : 'bg-white border-2 border-[#E8EFFD] text-[#94A3B8] shadow-sm'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs mt-3 hidden sm:block text-center transition-all ${
                    index <= currentStep ? 'text-[#1F4FD8]' : 'text-[#94A3B8]'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="relative h-1 flex-1 mx-3">
                    <div className="absolute inset-0 bg-[#E8EFFD] rounded-full" />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r from-[#1F4FD8] to-[#60A5FA] rounded-full transition-all duration-500 ${
                        index < currentStep ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-6 sm:p-12 shadow-[0_20px_60px_rgba(31,79,216,0.15)] border-2 border-white min-h-[500px] flex flex-col relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E8F0FE] to-transparent rounded-bl-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#E8F0FE] to-transparent rounded-tr-[100px] opacity-50" />
        
        <div className="flex-1 relative z-10">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-3xl mb-4 shadow-xl">
              <StepIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl mb-3 text-[#1A2332] bg-gradient-to-r from-[#1A2332] to-[#1F4FD8] bg-clip-text text-transparent">
              {steps[currentStep].title}
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">{steps[currentStep].description}</p>
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            {/* Step 0: Project Type */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 text-left overflow-hidden ${
                      projectType === type.id
                        ? 'border-[#1F4FD8] shadow-[0_8px_32px_rgba(31,79,216,0.25)] scale-105'
                        : 'border-[#E8EFFD] hover:border-[#1F4FD8] hover:shadow-xl hover:scale-102'
                    }`}
                  >
                    {/* Gradient background on hover/select */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 transition-opacity ${
                      projectType === type.id ? 'opacity-5' : 'group-hover:opacity-5'
                    }`} />
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{type.icon}</div>
                      <h3 className="text-lg mb-2 text-[#1A2332]">
                        {type.label}
                      </h3>
                      <p className="text-sm text-[#64748B] mb-1">{type.description}</p>
                      <p className="text-xs text-[#94A3B8]">{type.details}</p>
                    </div>
                    
                    {projectType === type.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-[#1F4FD8] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Team Expertise */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-8 bg-gradient-to-r from-[#E8F0FE] to-[#F8FAFC] rounded-2xl p-6">
                  <p className="text-sm text-[#1F4FD8]">
                    💡 Select all technologies your team is comfortable with (multiple selections allowed)
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {expertiseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleExpertise(option.id)}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        teamExpertise.includes(option.id)
                          ? 'border-[#1F4FD8] shadow-[0_8px_24px_rgba(31,79,216,0.2)] scale-105'
                          : 'border-[#E8EFFD] hover:border-[#1F4FD8] hover:shadow-lg bg-white'
                      }`}
                    >
                      <div className={`absolute inset-0 rounded-2xl transition-opacity ${
                        teamExpertise.includes(option.id) ? option.color.replace('bg-', 'bg-') + ' opacity-10' : 'opacity-0'
                      }`} />
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="text-3xl mb-2 transform transition-transform hover:scale-110">{option.icon}</div>
                        <p className="text-sm text-[#1A2332] text-center">{option.label}</p>
                      </div>
                      
                      {teamExpertise.includes(option.id) && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#1F4FD8] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Expected Scale */}
            {currentStep === 2 && (
              <div className="py-6">
                <div className="bg-gradient-to-br from-white via-[#F8FAFC] to-[#E8F0FE] rounded-3xl p-8 shadow-inner border-2 border-[#E8EFFD]">
                  <div className="mb-8">
                    <Slider
                      value={expectedScale}
                      onValueChange={setExpectedScale}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[#94A3B8] mt-4">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#60A5FA] rounded-full" />
                        Small
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#1F4FD8] rounded-full" />
                        Medium
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#1840B0] rounded-full" />
                        Enterprise
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl border-2 border-[#E8EFFD]">
                      <div className="text-5xl">
                        {expectedScale[0] < 30 && '📱'}
                        {expectedScale[0] >= 30 && expectedScale[0] < 70 && '🚀'}
                        {expectedScale[0] >= 70 && '🏢'}
                      </div>
                      <div className="text-left">
                        <div className="text-4xl text-[#1F4FD8] mb-1">
                          {expectedScale[0]}<span className="text-xl">%</span>
                        </div>
                        <div className="text-sm text-[#64748B]">
                          {expectedScale[0] < 30 && 'Small project · Hundreds of users'}
                          {expectedScale[0] >= 30 && expectedScale[0] < 70 && 'Medium scale · Thousands of users'}
                          {expectedScale[0] >= 70 && 'Enterprise scale · 100k+ users'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-[#FFF9E6] to-[#FFF3E0] border-2 border-[#FFE082] rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FFB74D] rounded-xl flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm text-[#7C6B00] mb-1">Why does this matter?</h4>
                      <p className="text-xs text-[#7C6B00]">
                        Different stacks handle scale differently. We'll recommend options that match your expected growth without unnecessary complexity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget Sensitivity */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 gap-4">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBudgetSensitivity(option.value)}
                    className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 text-left overflow-hidden ${
                      budgetSensitivity === option.value
                        ? 'border-[#1F4FD8] shadow-[0_12px_40px_rgba(31,79,216,0.25)] scale-102'
                        : 'border-[#E8EFFD] hover:border-[#1F4FD8] hover:shadow-xl hover:scale-102 bg-white'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 transition-opacity ${
                      budgetSensitivity === option.value ? 'opacity-5' : 'group-hover:opacity-5'
                    }`} />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="text-4xl transform transition-transform group-hover:scale-110">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg mb-1 text-[#1A2332]">
                          {option.label}
                        </h3>
                        <p className="text-sm text-[#64748B] mb-1">{option.description}</p>
                        <p className="text-xs text-[#94A3B8]">{option.details}</p>
                      </div>
                    </div>
                    
                    {budgetSensitivity === option.value && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-[#1F4FD8] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t-2 border-[#E8EFFD] relative z-10">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="border-2 border-[#E8EFFD] hover:bg-[#F8FAFC] hover:border-[#1F4FD8] rounded-2xl px-8 py-6 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="text-sm px-6 py-3 bg-[#F8FAFC] rounded-full border-2 border-[#E8EFFD]">
            <span className="text-[#1F4FD8]">Step {currentStep + 1}</span>
            <span className="text-[#94A3B8]"> of {steps.length}</span>
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`rounded-2xl px-10 py-6 text-lg ${
              currentStep === steps.length - 1
                ? 'bg-gradient-to-r from-[#1F4FD8] via-[#1840B0] to-[#1F4FD8] bg-size-200 hover:bg-pos-100 shadow-[0_12px_40px_rgba(31,79,216,0.4)]'
                : 'bg-[#1F4FD8] hover:bg-[#1840B0] shadow-[0_8px_24px_rgba(31,79,216,0.3)]'
            } text-[#1F4FD8] bg-white border-2 border-[#1F4FD8] hover:bg-[#1F4FD8] hover:text-white transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_16px_48px_rgba(31,79,216,0.5)]`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Compare Stacks
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
