'use client';

import { useState, useEffect, useRef } from 'react';

// Major cities for autocomplete (can expand later or use API)
const CITIES = [
  "Mumbai, India", "Delhi, India", "Bangalore, India", "Chennai, India", "Kolkata, India",
  "Hyderabad, India", "Pune, India", "Ahmedabad, India", "Jaipur, India", "Lucknow, India",
  "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA", "San Francisco, USA",
  "London, UK", "Manchester, UK", "Birmingham, UK", "Dubai, UAE", "Singapore",
  "Sydney, Australia", "Melbourne, Australia", "Toronto, Canada", "Vancouver, Canada",
];

export default function Home() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    email: '',
    birthDate: '',
    birthHour: '',
    birthMinute: '',
    birthAmPm: '',
    birthPlace: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlaceChange = (value: string) => {
    setFormData({ ...formData, birthPlace: value });
    if (value.length > 1) {
      const filtered = CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    setFormData({ ...formData, birthPlace: city });
    setShowSuggestions(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, step: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
        setStatus('idle');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Combine time fields
    const birthTime = formData.birthHour && formData.birthAmPm 
      ? `${formData.birthHour}:${formData.birthMinute || '00'} ${formData.birthAmPm}`
      : '';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          birthDate: formData.birthDate,
          birthTime,
          birthPlace: formData.birthPlace,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('You\'re all set! We\'ll notify you when we launch. ✨');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  const skipDetails = () => {
    setStatus('success');
    setMessage('You\'re on the list! Add birth details anytime for a personalized experience.');
  };

  return (
    <main className="min-h-screen star-bg">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-5xl mx-auto text-center">
        <div className="mb-6 text-purple-400 text-sm tracking-widest uppercase">
          ✦ AI-Powered Astrology ✦
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Your Personal Astrologer</span>
          <br />
          <span className="text-white/90">Available 24/7</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200/80 mb-12 max-w-2xl mx-auto">
          AI-powered readings based on your complete birth chart. 
          Not generic horoscopes. Actual guidance for <em>your</em> stars.
        </p>

        {/* Multi-step Waitlist Form */}
        <div className="max-w-md mx-auto glow rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/20 p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-purple-200/70">{message}</p>
            </div>
          ) : step === 1 ? (
            /* Step 1: Email Only */
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition text-lg"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {status === 'loading' ? 'Joining...' : 'Join the Waitlist →'}
              </button>
              
              <p className="text-xs text-purple-300/40 text-center">
                Free beta access • No spam • Unsubscribe anytime
              </p>
            </form>
          ) : (
            /* Step 2: Birth Details */
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-purple-200/80 text-sm">
                  🎉 You&apos;re in! Add your birth details for a personalized chart.
                </p>
              </div>

              <div>
                <label className="text-sm text-purple-300/60 block mb-2 text-left">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300/60 block mb-2 text-left">
                  Time of Birth <span className="text-purple-400/40">(if known)</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="HH"
                    maxLength={2}
                    value={formData.birthHour}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      const num = parseInt(v);
                      if (v === '' || (num >= 1 && num <= 12)) {
                        setFormData({ ...formData, birthHour: v });
                      }
                    }}
                    className="w-16 px-3 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white text-center focus:outline-none focus:border-purple-400 transition"
                  />
                  <span className="text-purple-300/60 text-xl">:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    maxLength={2}
                    value={formData.birthMinute}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      const num = parseInt(v);
                      if (v === '' || (num >= 0 && num <= 59)) {
                        setFormData({ ...formData, birthMinute: v.padStart(v.length === 1 && num > 5 ? 2 : 1, '') });
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value && e.target.value.length === 1) {
                        setFormData({ ...formData, birthMinute: e.target.value.padStart(2, '0') });
                      }
                    }}
                    className="w-16 px-3 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white text-center focus:outline-none focus:border-purple-400 transition"
                  />
                  <div className="flex rounded-lg overflow-hidden border border-purple-500/30">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, birthAmPm: 'AM' })}
                      className={`px-4 py-3 transition ${formData.birthAmPm === 'AM' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300/60 hover:bg-white/20'}`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, birthAmPm: 'PM' })}
                      className={`px-4 py-3 transition ${formData.birthAmPm === 'PM' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300/60 hover:bg-white/20'}`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative" ref={suggestionsRef}>
                <label className="text-sm text-purple-300/60 block mb-2 text-left">
                  Place of Birth
                </label>
                <input
                  type="text"
                  placeholder="Start typing a city..."
                  value={formData.birthPlace}
                  onChange={(e) => handlePlaceChange(e.target.value)}
                  onFocus={() => formData.birthPlace.length > 1 && suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-900 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden">
                    {suggestions.map((city, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectCity(city)}
                        className="w-full px-4 py-2 text-left text-white hover:bg-purple-500/20 transition"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Saving...' : 'Complete My Profile ✨'}
              </button>

              <button
                type="button"
                onClick={skipDetails}
                className="w-full py-2 text-purple-300/60 hover:text-purple-300 transition text-sm"
              >
                Skip for now →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Tired of generic horoscopes?
          </h2>
          <p className="text-lg text-purple-200/70 mb-8">
            &quot;Today is a good day for Leos&quot; — yeah, you and 600 million other people.
          </p>
          <p className="text-purple-200/60">
            Real astrology is personal. Your birth chart is unique — the exact position of every planet 
            at the moment you were born. That&apos;s what shapes you.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Meet your AI astrologer
          </h2>
          <p className="text-lg text-purple-200/70 mb-12">
            We trained an AI on your complete birth chart — sun, moon, rising, all 12 houses, everything.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-lg font-semibold text-white mb-2">Full Chart Analysis</h3>
              <p className="text-purple-200/60 text-sm">
                Every planet, every house, every aspect. Not just your sun sign.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white mb-2">Conversational</h3>
              <p className="text-purple-200/60 text-sm">
                Ask questions in plain language. Get warm, personalized guidance.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Always Available</h3>
              <p className="text-purple-200/60 text-sm">
                No booking. No waiting. Your astrologer is ready whenever you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-purple-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="gradient-text font-semibold text-lg mb-4">
            Finally, astrology that knows you.
          </p>
          <p className="text-purple-300/40 text-sm">
            © 2026 North Star Astro. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
