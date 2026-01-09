import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Sparkles, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { googleRAGService } from '../services/googleRAGService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatTabProps {
  constraints?: any;
}

const suggestedPrompts = [
  "Why not Firebase at scale?",
  "Which stack is safer long-term?",
  "Explain this like I'm a beginner",
  "What about TypeScript?",
  "How do costs compare over time?",
  "Should I worry about vendor lock-in?",
];

const refereeResponses: { [key: string]: string } = {
  "why not firebase at scale": "Great question. Firebase works wonderfully at small-to-medium scale, but here's what happens as you grow: 1) Costs scale exponentially with reads/writes rather than linearly. 2) Complex queries become impossible - you can't do joins or advanced filtering. 3) You're limited by Firebase's data model. Many companies hit a wall around 100k+ active users and either optimize heavily or migrate. That said, if you architect carefully (denormalize data, cache aggressively), Firebase can handle significant scale - Instagram started on similar tech.",
  
  "which stack is safer long-term": "There's no universally 'safe' choice, but here's how to think about it: Django has been around since 2005 and will likely be maintained for decades - it's the 'boring technology' choice. MERN components (MongoDB, Express, React, Node) are all independently maintained with massive communities, so even if one fades, you can swap it. Firebase is backed by Google, which is both good (resources) and bad (Google kills products). The safest bet? Choose what has the largest talent pool in your region - technology risk is often outweighed by hiring risk.",
  
  "explain this like i'm a beginner": "Think of it like building a restaurant: \n\nMERN (MongoDB, Express, React, Node) is like building everything from scratch - you choose every ingredient and cooking method. More work upfront, but total control. \n\nDjango + React is like using a professional kitchen that comes with appliances and recipes - faster to start, more structure, but you follow their patterns. \n\nFirebase is like a food truck with a built-in kitchen - grab it and start serving immediately, but you can't change much about how the truck works. \n\nEach is perfect for different goals!",
  
  "what about typescript": "Excellent thinking! TypeScript adds type safety to JavaScript, catching bugs before runtime. Here's the impact on each stack:\n\nMERN: Fits perfectly - you can TypeScript the entire stack (Node + React). Major companies using MERN almost always use TypeScript now.\n\nDjango + React: TypeScript on the React side, Python on backend. Python has type hints too (mypy), so you get similar benefits throughout.\n\nFirebase + React: TypeScript works great with Firebase - their SDK has excellent type definitions.\n\nBottom line: TypeScript is a great addition to any stack. It adds learning curve but pays dividends in fewer bugs and better autocomplete.",
  
  "how do costs compare over time": "This is where the math gets interesting:\n\nFirebase: Free tier is generous (50k reads/day). But beyond that, costs grow with usage. At 1M users doing 10 reads/day = ~$250-500/month. Totally fine for many businesses!\n\nMERN/Django: You pay for servers, not usage. A $50/month server can handle 100k users with proper caching. But you need DevOps knowledge to set it up efficiently.\n\nThe crossover point? Around 100k-500k active users, self-hosted becomes cheaper - IF you have the expertise. Before that, Firebase's simplicity often beats the cost savings of DIY hosting.",
  
  "should i worry about vendor lock-in": "Vendor lock-in is real, but context matters:\n\nFirebase lock-in is significant - their real-time database, auth, and cloud functions are tightly coupled. Migrating takes weeks-to-months of work.\n\nBUT: Is that actually a problem? Most startups never outgrow Firebase. And when they do, they have revenue to fund migration.\n\nMy take: Don't let theoretical future problems prevent you from shipping today. If Firebase gets you to market 3 months faster, that's worth the theoretical migration risk. The companies that succeed can afford to migrate. The ones that fail saved time by not over-engineering.\n\nPragmatic approach: Keep business logic separate from Firebase-specific code where possible, but don't obsess over it.",
};

export function ChatTab({ constraints }: ChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: constraints 
        ? "Hey! I'm your Tech Stack Referee. I've reviewed your project constraints. I can help you understand the trade-offs, answer questions about recommended technologies, and guide your decision-making process. What would you like to know?"
        : "Hey! I'm your Tech Stack Referee. I won't pick a winner for you, but I'll help you understand the trade-offs so you can make a confident decision. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAIConfigured(googleRAGService.isGoogleAIAvailable());
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate AI response immediately
    try {
      let responseContent = "";
      
      if (isAIConfigured) {
        // Build rich context with constraints - provide detailed info
        let contextualMessage = textToSend;
        if (constraints) {
          const constraintSummary = [
            constraints.projectType && `Type: ${constraints.projectType}`,
            constraints.teamSize && `Team: ${constraints.teamSize}`,
            constraints.timeline && `Timeline: ${constraints.timeline}`,
            constraints.scalability && `Scale: ${constraints.scalability}`,
            constraints.experience && `Experience: ${constraints.experience}`
          ].filter(Boolean).join(', ');
          
          contextualMessage = constraintSummary 
            ? `Project: ${constraintSummary}. Question: ${textToSend}`
            : textToSend;
        }
        
        const response = await googleRAGService.generateChatResponse(contextualMessage, messages);
        responseContent = response.content;
      } else {
        // Fallback responses
        const normalizedInput = textToSend.toLowerCase().trim();
        responseContent = "That's a great question! While I don't have a specific answer prepared for that exact query, here's what I'd consider: Think about your team's current expertise, your timeline constraints, and whether you're optimizing for speed-to-market or long-term flexibility. Each stack has its place - the key is aligning the choice with your specific context. Want to dive deeper into any particular aspect?";

        // Check for matching responses
        for (const [key, value] of Object.entries(refereeResponses)) {
          if (normalizedInput.includes(key)) {
            responseContent = value;
            break;
          }
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try rephrasing your question or check your AI configuration.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-[18px] shadow-[0_4px_24px_rgba(31,79,216,0.08)] border-2 border-[#E8EFFD] overflow-hidden flex flex-col h-[600px] sm:h-[700px]">
        {/* Header */}
        <div className="p-6 border-b border-[#E8EFFD] bg-gradient-to-r from-[#F8FAFC] to-[#E8F0FE]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-[#1A2332] flex items-center gap-2">
                Ask the Referee
                {isAIConfigured ? <Bot className="w-4 h-4 text-[#1F4FD8]" /> : <Sparkles className="w-4 h-4 text-[#1F4FD8]" />}
              </h2>
              <p className="text-sm text-[#64748B]">
                {isAIConfigured ? 'AI-powered guidance for your decisions' : 'Intelligent, neutral guidance for your decisions'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#1F4FD8] text-white ml-auto'
                        : 'bg-white border-2 border-[#E8EFFD] text-[#1A2332]'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-[#94A3B8]'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-[#E8EFFD] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#1F4FD8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#1F4FD8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#1F4FD8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-[#64748B] mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs px-3 py-2 bg-[#F8FAFC] hover:bg-[#E8F0FE] text-[#1F4FD8] rounded-full border border-[#E8EFFD] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-[#E8EFFD] bg-[#F8FAFC]">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about tech stacks..."
              className="flex-1 border-[#E8EFFD] rounded-xl focus:border-[#1F4FD8] bg-white"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-[#1F4FD8] hover:bg-[#1840B0] text-white px-6 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}