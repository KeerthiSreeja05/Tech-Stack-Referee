import { useState, useEffect } from 'react';
import { Key, Check, X, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { googleRAGService } from '../services/googleRAGService';

interface APIKeyConfigProps {
  onConfigured?: (configured: boolean) => void;
}

export function APIKeyConfig({ onConfigured }: APIKeyConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // Check if API key is already configured
    const configured = googleRAGService.isGoogleAIAvailable();
    setIsConfigured(configured);
    onConfigured?.(configured);
    
    // Show config if not configured
    if (!configured) {
      setShowConfig(true);
    }
  }, [onConfigured]);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await googleRAGService.setApiKey(apiKey.trim());
      if (success) {
        setIsConfigured(true);
        setShowConfig(false);
        setApiKey('');
        onConfigured?.(true);
      } else {
        setError('Failed to initialize Google AI. Please check your API key and ensure it has access to Gemini models.');
      }
    } catch (err) {
      setError('Failed to configure API key. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveApiKey = () => {
    googleRAGService.reset();
    setIsConfigured(false);
    setShowConfig(true);
    onConfigured?.(false);
  };

  if (isConfigured && !showConfig) {
    return (
      <div className="flex items-center gap-3 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl">
        <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-[#2E7D32] font-medium">Google AI Configured</p>
          <p className="text-xs text-[#2E7D32]/70">Enhanced AI responses enabled</p>
        </div>
        <Badge variant="outline" className="bg-white text-[#2E7D32] border-[#A5D6A7]">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Enhanced
        </Badge>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowConfig(true)}
          className="text-[#2E7D32] border-[#A5D6A7] hover:bg-white"
        >
          <Key className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-2 border-[#E8EFFD] shadow-[0_4px_24px_rgba(31,79,216,0.08)]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-[#1A2332]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#1F4FD8] to-[#60A5FA] rounded-lg flex items-center justify-center">
            <Key className="w-4 h-4 text-white" />
          </div>
          Google AI Configuration
        </CardTitle>
        <p className="text-sm text-[#64748B]">
          Configure Google Gemini API for enhanced AI-powered responses and insights
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isConfigured && (
          <div className="p-4 bg-[#FFF3E0] border border-[#FFE082] rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#E65100] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#E65100] mb-1">
                  Enhanced AI Features Available
                </h4>
                <p className="text-xs text-[#E65100]/80 mb-2">
                  Configure Google AI to unlock advanced features like intelligent comparisons, 
                  contextual recommendations, and natural language responses.
                </p>
                <p className="text-xs text-[#E65100]/80">
                  <strong>Get your free API key:</strong> Visit{' '}
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex gap-3">
            <Input
              type="password"
              placeholder="Enter your Google AI API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 border-[#E8EFFD] focus:border-[#1F4FD8] rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={handleSaveApiKey}
              disabled={isLoading || !apiKey.trim()}
              className="bg-[#1F4FD8] hover:bg-[#1840B0] text-white rounded-xl px-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-[#FFEBEE] border border-[#E57373] rounded-xl">
              <X className="w-4 h-4 text-[#C62828]" />
              <p className="text-sm text-[#C62828]">{error}</p>
            </div>
          )}
        </div>

        {isConfigured && (
          <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E8EFFD]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#2E7D32]" />
              <span className="text-sm text-[#2E7D32]">API key configured successfully</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRemoveApiKey}
              className="text-[#64748B] border-[#E8EFFD] hover:bg-white"
            >
              Remove
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-[#F8FAFC] rounded-xl">
            <h4 className="text-sm font-medium text-[#1A2332] mb-1">✨ With Google AI</h4>
            <ul className="text-xs text-[#64748B] space-y-1">
              <li>• Intelligent tech comparisons</li>
              <li>• Contextual recommendations</li>
              <li>• Natural language responses</li>
              <li>• Strategic insights</li>
            </ul>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl">
            <h4 className="text-sm font-medium text-[#1A2332] mb-1">🔧 Without API Key</h4>
            <ul className="text-xs text-[#64748B] space-y-1">
              <li>• Basic comparisons</li>
              <li>• Rule-based responses</li>
              <li>• Static recommendations</li>
              <li>• Limited insights</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}