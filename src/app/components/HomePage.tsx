import { Button } from './ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Target, Brain, CheckCircle2 } from 'lucide-react';
import logo from '../../assets/0cf99c5569f9132448cd9853ee36a6bcb8766b2f.png';

interface HomePageProps {
  onGetStarted: () => void;
}

export function HomePage({ onGetStarted }: HomePageProps) {
  const features = [
    {
      icon: Target,
      title: 'Compare Options',
      description: 'Side-by-side tech stack comparisons with real trade-offs',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Neutral Insights',
      description: 'Unbiased analysis that guides without forcing decisions',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Long-term considerations and potential pitfalls explained',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sparkles,
      title: 'AI Referee',
      description: 'Chat with our AI to get answers to your specific questions',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    'Make confident technical decisions',
    'Understand trade-offs clearly',
    'Avoid costly mistakes',
    'Learn best practices',
    'Get neutral, expert guidance'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E8F0FE] relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Tech Stack Referee" className="w-14 h-14 object-contain drop-shadow-lg" />
              <div>
                <h1 className="text-2xl text-[#1A2332]">Tech Stack Referee</h1>
                <p className="text-sm text-[#64748B]">Make confident technical decisions</p>
              </div>
            </div>
            <Button
              onClick={onGetStarted}
              variant="outline"
              className="hidden sm:flex border-2 border-[#E8EFFD] hover:border-[#1F4FD8] hover:bg-[#F8FAFC] rounded-xl px-6"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-[#E8EFFD] rounded-full px-6 py-3 mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#1F4FD8]" />
              <span className="text-sm text-[#1F4FD8]">
                Your neutral guide to tech stack decisions
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl sm:text-7xl mb-6 text-[#1A2332] leading-tight">
              Stop Guessing.
              <br />
              <span className="bg-gradient-to-r from-[#1F4FD8] to-[#60A5FA] bg-clip-text text-transparent">
                Choose Wisely.
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-[#64748B] mb-12 max-w-3xl mx-auto leading-relaxed">
              Compare tech stacks side-by-side, understand real trade-offs, and get neutral expert guidance—without the hype or bias.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-10">
              <Button
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-gradient-to-r from-[#1F4FD8] via-[#1840B0] to-[#1F4FD8] text-white font-semibold rounded-2xl px-12 py-7 text-lg shadow-[0_12px_40px_rgba(31,79,216,0.4)] hover:shadow-[0_16px_48px_rgba(31,79,216,0.5)] hover:from-[#1840B0] hover:via-[#1F4FD8] hover:to-[#1840B0] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Comparing Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#E8EFFD] hover:border-[#1F4FD8] hover:bg-[#F8FAFC] rounded-2xl px-12 py-7 text-lg transition-all"
              >
                See How It Works
              </Button>
            </div>

            {/* Social Proof / Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F4FD8]" />
                <span>No vendor bias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F4FD8]" />
                <span>Real trade-offs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1F4FD8]" />
                <span>Expert insights</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl text-[#1A2332] mb-4">
              Everything You Need to Decide
            </h3>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Make informed decisions with comprehensive analysis and neutral guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#E8EFFD] hover:border-[#1F4FD8] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl text-[#1A2332] mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-12 sm:p-16 border-2 border-white shadow-[0_20px_60px_rgba(31,79,216,0.15)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl sm:text-4xl text-[#1A2332] mb-6">
                  How It Works
                </h3>
                <p className="text-lg text-[#64748B] mb-8">
                  Get started in minutes with our guided process that helps you make the right choice for your project.
                </p>
                
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Define Constraints', desc: 'Tell us about your project, team, and requirements' },
                    { step: '02', title: 'Compare Stacks', desc: 'See side-by-side comparisons with detailed breakdowns' },
                    { step: '03', title: 'Get Insights', desc: 'Review neutral analysis and risk assessments' },
                    { step: '04', title: 'Ask Questions', desc: 'Chat with our AI referee for personalized guidance' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="text-lg text-[#1A2332] mb-1">
                          {item.title}
                        </h5>
                        <p className="text-sm text-[#64748B]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onGetStarted}
                  className="mt-10 bg-[#1F4FD8] hover:bg-[#1840B0] text-white rounded-2xl px-10 py-6 text-lg shadow-[0_8px_24px_rgba(31,79,216,0.3)] hover:scale-105 transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="relative">
                {/* Visual illustration area */}
                <div className="bg-gradient-to-br from-[#E8F0FE] to-[#F8FAFC] rounded-3xl p-8 border-2 border-[#E8EFFD] shadow-inner min-h-[500px] flex items-center justify-center">
                  <div className="space-y-6 w-full">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#E8EFFD] transform -rotate-2 hover:rotate-0 transition-transform">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-3 bg-[#E8EFFD] rounded w-3/4 mb-2" />
                          <div className="h-2 bg-[#F1F5F9] rounded w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-[#F1F5F9] rounded" />
                        <div className="h-2 bg-[#F1F5F9] rounded w-5/6" />
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#E8EFFD] transform rotate-2 hover:rotate-0 transition-transform">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-3 bg-[#E8EFFD] rounded w-2/3 mb-2" />
                          <div className="h-2 bg-[#F1F5F9] rounded w-1/3" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-[#F1F5F9] rounded" />
                        <div className="h-2 bg-[#F1F5F9] rounded w-4/5" />
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#E8EFFD] transform -rotate-1 hover:rotate-0 transition-transform">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-3 bg-[#E8EFFD] rounded w-4/5 mb-2" />
                          <div className="h-2 bg-[#F1F5F9] rounded w-2/5" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-[#F1F5F9] rounded" />
                        <div className="h-2 bg-[#F1F5F9] rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="bg-gradient-to-br from-[#1F4FD8] to-[#1840B0] rounded-[32px] p-12 sm:p-16 text-white text-center shadow-[0_20px_60px_rgba(31,79,216,0.3)]">
            <h3 className="text-3xl sm:text-4xl mb-6">
              Why Choose Tech Stack Referee?
            </h3>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              We're not here to sell you a solution. We're here to help you find the right one.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                  <span className="text-left">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={onGetStarted}
              className="bg-white text-[#1F4FD8] hover:bg-[#F8FAFC] rounded-2xl px-12 py-7 text-lg shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:scale-105 transition-all"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Your Comparison
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-8 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logo} alt="Tech Stack Referee" className="w-10 h-10 object-contain" />
            <span className="text-lg text-[#64748B]">Tech Stack Referee</span>
          </div>
          <p className="text-sm text-[#94A3B8]">
            © 2024 Tech Stack Referee. Neutral guidance for confident decisions.
          </p>
        </footer>
      </div>
    </div>
  );
}
