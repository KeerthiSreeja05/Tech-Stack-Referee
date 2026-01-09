import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Search, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { googleRAGService, TechStackKnowledge } from '../services/googleRAGService';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  relatedStacks?: TechStackKnowledge[];
  suggestions?: string[];
}

interface RAGChatTabProps {
  constraints?: any;
}

export function RAGChatTab({ constraints }: RAGChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: constraints
        ? "Hi! I'm your AI tech stack advisor powered by Google Gemini. I've reviewed your project constraints and can provide personalized guidance on technology choices, comparisons, and best practices. Try asking me something like 'Why these specific technologies for my project?' or 'What are the risks I should know about?'"
        : "Hi! I'm your AI tech stack advisor powered by Google Gemini. I can help you compare technologies, understand trade-offs, and make informed decisions. Try asking me something like 'What's the best stack for a real-time chat app?' or 'Compare React vs Vue for beginners'.",
      timestamp: new Date(),
      suggestions: constraints
        ? [
            "Why these technologies for my project?",
            "What risks should I be aware of?",
            "How do these scale with my requirements?",
            "What's the learning curve like?"
          ]
        : [
            "What's the best stack for a real-time chat app?",
            "Compare React vs Vue for beginners",
            "Should I use MongoDB or PostgreSQL?",
            "What are the pros and cons of serverless?"
          ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIConfigured, setIsAIConfigured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if Google AI is configured
    setIsAIConfigured(googleRAGService.isGoogleAIAvailable());
  }, []);

  const generateResponse = async (userMessage: string): Promise<{ content: string; relatedStacks?: TechStackKnowledge[]; suggestions?: string[] }> => {
    try {
      // Build contextual message with project constraints if available
      let contextualMessage = userMessage;
      if (constraints) {
        contextualMessage = `Project context: ${JSON.stringify(constraints)}\n\nUser question: ${userMessage}`;
      }
      
      // Use Google AI service for enhanced responses
      const response = await googleRAGService.generateChatResponse(contextualMessage, messages);
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback to basic search if AI fails
      const relatedStacks = googleRAGService.searchTechStacks(userMessage, 3);
      return {
        content: `I found some relevant technologies for your question: ${relatedStacks.map(stack => `**${stack.name}** - ${stack.description}`).join('\n\n')}`,
        relatedStacks,
        suggestions: [
          "Tell me more about these technologies",
          "Compare their pros and cons",
          "Which one should I choose?"
        ]
      };
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time and generate response
    setTimeout(async () => {
      try {
        const response = await generateResponse(userMessage.content);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.content,
          timestamp: new Date(),
          relatedStacks: response.relatedStacks,
          suggestions: response.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I apologize, but I encountered an error processing your request. Please try again or check your API configuration.",
          timestamp: new Date(),
          suggestions: ["Try a different question", "Check API configuration"]
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 h-[calc(100vh-200px)] flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl text-[#1A2332]">AI Tech Advisor</h2>
            <p className="text-[#64748B]">
              {isAIConfigured ? 'Powered by Google Gemini AI' : 'Ask me anything about tech stacks and development'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-white rounded-[18px] border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)] mb-6">
        <div className="p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div className={`p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-[#1F4FD8] text-white ml-auto' 
                    : 'bg-[#F8FAFC] text-[#1A2332]'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
                
                {/* Related Stacks */}
                {message.relatedStacks && message.relatedStacks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      Related Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.relatedStacks.map((stack) => (
                        <Badge
                          key={stack.id}
                          variant="outline"
                          className="text-xs bg-white border-[#E8EFFD] hover:border-[#1F4FD8] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                          onClick={() => handleSuggestionClick(`Tell me more about ${stack.name}`)}
                        >
                          {stack.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Suggested Questions
                    </p>
                    <div className="space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs p-2 bg-white border border-[#E8EFFD] rounded-lg hover:border-[#1F4FD8] hover:bg-[#F8FAFC] transition-colors text-[#64748B] hover:text-[#1F4FD8]"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-[#94A3B8] mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-[#64748B] rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-[#64748B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-[18px] border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)] p-4">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about tech stacks, comparisons, or get recommendations..."
            className="flex-1 border-[#E8EFFD] focus:border-[#1F4FD8] rounded-xl"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#1F4FD8] hover:bg-[#1840B0] text-white rounded-xl px-6 shadow-[0_4px_12px_rgba(31,79,216,0.3)] hover:shadow-[0_6px_16px_rgba(31,79,216,0.4)] transition-all"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}