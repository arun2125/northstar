'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  location: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBirthForm, setShowBirthForm] = useState(true);
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    name: '',
    date: '',
    time: '',
    location: '',
  });
  const [email, setEmail] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-submit if data passed from free birth chart page
  useEffect(() => {
    if (hasAutoSubmitted) return;

    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const urlMessage = urlParams.get('message');
    
    // Check sessionStorage for birth data
    const birthDataStr = sessionStorage.getItem('birthData');
    
    if (urlMessage) {
      // Direct message from URL
      setHasAutoSubmitted(true);
      setShowBirthForm(false);
      sendMessage(urlMessage);
      // Clear URL params
      window.history.replaceState({}, '', '/chat');
    } else if (birthDataStr) {
      // Birth data from form
      try {
        const birthData = JSON.parse(birthDataStr);
        if (birthData.name && birthData.date && birthData.location) {
          setHasAutoSubmitted(true);
          setShowBirthForm(false);
          setBirthDetails(birthData);
          
          const birthMessage = `Hi! I'm ${birthData.name}. Here are my birth details:
Date: ${birthData.date}
Time: ${birthData.time || 'unknown'}
Location: ${birthData.location}

Please calculate my birth chart using astro-calc and give me a full chart reading!`;
          
          sendMessage(birthMessage);
          // Clear sessionStorage
          sessionStorage.removeItem('birthData');
        }
      } catch (e) {
        console.error('Failed to parse birth data:', e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAutoSubmitted]);

  const handleBirthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDetails.name || !birthDetails.date || !birthDetails.time || !birthDetails.location || !email) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Submit to waitlist API first
      const waitlistResponse = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: birthDetails.name,
          birthDate: birthDetails.date,
          birthTime: birthDetails.time || null,
          birthLocation: birthDetails.location,
          source: 'direct-chat',
        }),
      });

      if (!waitlistResponse.ok) {
        throw new Error('Failed to save details');
      }

      setShowBirthForm(false);
      
      const birthMessage = `Hi! I'm ${birthDetails.name}. Here are my birth details:
Date: ${birthDetails.date}
Time: ${birthDetails.time}
Location: ${birthDetails.location}

Please calculate my birth chart using astro-calc and give me a full chart reading!`;

      await sendMessage(birthMessage);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  if (showBirthForm) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">
          ✨ Let&apos;s Read Your Stars
        </h2>
        <p className="text-gray-600 mb-6">
          Share your birth details to get personalized astrology insights combining Vedic astrology and numerology.
        </p>
        
        <form onSubmit={handleBirthSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={birthDetails.name}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Arun"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              required
              value={birthDetails.date}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Time
            </label>
            <input
              type="time"
              required
              value={birthDetails.time}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Location
            </label>
            <input
              type="text"
              required
              value={birthDetails.location}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="New Delhi, India"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="you@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send your reading here (never spam)
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Start Reading ✨
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Your data is private and used only for generating your reading.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-purple-600 text-white p-4">
        <h3 className="font-semibold">Chat with Tara</h3>
        <p className="text-sm opacity-90">Your personal astrology guide</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about your chart..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
