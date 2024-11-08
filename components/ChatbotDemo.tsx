"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Bot, User, HelpCircle } from 'lucide-react';

const topQuestions = [
  "What are the key features of SaaSify?",
  "How does SaaSify integrate with WhatsApp?",
  "Can SaaSify qualify leads automatically?",
  "What CRM systems does SaaSify integrate with?",
  "How does SaaSify handle multiple languages?",
];

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm the SaaSify AI assistant. I'm here to help you learn about our AI-powered customer service and lead qualification platform. What would you like to know about our key features or how we can help your business?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTopQuestions, setShowTopQuestions] = useState(true);
  const [lastUserMessageTime, setLastUserMessageTime] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const followUpTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    return () => {
      if (followUpTimeoutRef.current) {
        clearTimeout(followUpTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (followUpTimeoutRef.current) {
      clearTimeout(followUpTimeoutRef.current);
    }

    followUpTimeoutRef.current = setTimeout(() => {
      const timeSinceLastMessage = Date.now() - lastUserMessageTime;
      const hasContactRequest = messages.some(m => 
        m.content.toLowerCase().includes('email') || 
        m.content.toLowerCase().includes('phone number')
      );

      if (timeSinceLastMessage >= 120000 && !hasContactRequest) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "By the way, if you'd like to receive more information or a personalized demo, I'd be happy to help. Would you like to provide your email or phone number?"
        }]);
      }
    }, 120000);

    return () => {
      if (followUpTimeoutRef.current) {
        clearTimeout(followUpTimeoutRef.current);
      }
    };
  }, [messages, lastUserMessageTime]);

  const handleSend = async (message = input) => {
    if (message.trim() === '') return;

    setIsLoading(true);
    setError('');
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowTopQuestions(false);
    setLastUserMessageTime(Date.now());

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      let assistantMessage = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        assistantMessage.content += text;
        setMessages(prev => [...prev.slice(0, -1), { ...assistantMessage }]);
      }
    } catch (error) {
      console.error('Error in handleSend:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-2">
        {paragraph}
      </p>
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Experience Our AI-Powered Platform</h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">SaaSify AI Assistant Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 h-96 overflow-y-auto p-4 bg-background rounded-md">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-4 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {message.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                    </div>
                    <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {formatMessage(message.content)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {showTopQuestions && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Top Questions:</h3>
                <div className="flex flex-wrap gap-2">
                  {topQuestions.map((question, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handleSend(question)}>
                      <HelpCircle className="w-4 h-4 mr-2" />
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our features or benefits..."
                className="flex-grow"
                disabled={isLoading}
                aria-label="Chat input"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}