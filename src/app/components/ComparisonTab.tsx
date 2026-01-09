import { CheckCircle2, AlertCircle, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { Badge } from './ui/badge';

interface TechStack {
  name: string;
  icon: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  riskLevel: 'low' | 'medium' | 'high';
  metrics: {
    learningCurve: number;
    scalability: number;
    community: number;
    costEfficiency: number;
  };
}

const techStacks: TechStack[] = [
  {
    name: 'MERN Stack',
    icon: '⚛️',
    bestFor: 'Full-stack JavaScript development with modern tooling',
    pros: [
      'Single language across stack',
      'Massive community support',
      'Rich ecosystem of packages',
      'Fast development cycles',
      'Great for MVPs and prototypes',
    ],
    cons: [
      'Can be overwhelming for beginners',
      'MongoDB scaling requires expertise',
      'Performance tuning needed at scale',
    ],
    riskLevel: 'low',
    metrics: {
      learningCurve: 70,
      scalability: 75,
      community: 95,
      costEfficiency: 80,
    },
  },
  {
    name: 'Django + React',
    icon: '🐍',
    bestFor: 'Rapid development with batteries-included backend',
    pros: [
      'Built-in admin panel',
      'Excellent security features',
      'Strong ORM and migrations',
      'Great documentation',
      'Python\'s readability',
    ],
    cons: [
      'Slower than Node.js for async',
      'Monolithic by default',
      'Requires two separate codebases',
    ],
    riskLevel: 'low',
    metrics: {
      learningCurve: 65,
      scalability: 80,
      community: 85,
      costEfficiency: 75,
    },
  },
  {
    name: 'Firebase + React',
    icon: '🔥',
    bestFor: 'Serverless apps with real-time features',
    pros: [
      'Zero backend code needed',
      'Real-time database built-in',
      'Authentication out of the box',
      'Generous free tier',
      'Fastest time to market',
    ],
    cons: [
      'Vendor lock-in concerns',
      'Complex queries are difficult',
      'Costs scale exponentially',
      'Limited control over backend',
    ],
    riskLevel: 'medium',
    metrics: {
      learningCurve: 85,
      scalability: 60,
      community: 80,
      costEfficiency: 65,
    },
  },
];

export function ComparisonTab() {
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
        <h2 className="text-xl sm:text-2xl mb-2 text-[#1A2332]">Stack Comparison</h2>
        <p className="text-[#64748B]">
          Based on your constraints, here's how popular stacks compare
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {techStacks.map((stack, index) => (
          <div
            key={index}
            className="bg-white rounded-[18px] p-6 shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD] hover:shadow-[0_12px_40px_rgba(31,79,216,0.16)] hover:border-[#1F4FD8] transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{stack.icon}</span>
                <h3 className="text-xl text-[#1A2332]">{stack.name}</h3>
              </div>
              <Badge
                variant="outline"
                className={`${getRiskColor(stack.riskLevel)} border rounded-full px-3 py-1`}
              >
                {stack.riskLevel === 'low' ? '✓ Low Risk' : stack.riskLevel === 'medium' ? '⚠ Medium Risk' : '⚠ High Risk'}
              </Badge>
            </div>

            {/* Best For */}
            <div className="mb-6 bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-sm text-[#475569]">
                <span className="text-[#1F4FD8]">Best suited for:</span> {stack.bestFor}
              </p>
            </div>

            {/* Pros */}
            <div className="mb-6 flex-grow">
              <h4 className="text-sm text-[#1A2332] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1F4FD8]" />
                Advantages
              </h4>
              <ul className="space-y-2">
                {stack.pros.map((pro, i) => (
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
                {stack.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#64748B]">
                    <span className="mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-[#E8EFFD] space-y-3">
              <MetricBar label="Learning Curve" value={stack.metrics.learningCurve} icon={<TrendingUp className="w-4 h-4" />} />
              <MetricBar label="Scalability" value={stack.metrics.scalability} icon={<Zap className="w-4 h-4" />} />
              <MetricBar label="Community" value={stack.metrics.community} icon={<Users className="w-4 h-4" />} />
              <MetricBar label="Cost Efficiency" value={stack.metrics.costEfficiency} icon={<DollarSign className="w-4 h-4" />} />
            </div>
          </div>
        ))}
      </div>
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