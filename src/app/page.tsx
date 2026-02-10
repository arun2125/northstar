'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome to the waitlist! Check your inbox soon. ✨');
        setFormData({ email: '', name: '', birthDate: '', birthTime: '', birthPlace: '', consent: false });
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
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

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto glow rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/20 p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-purple-200/70">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition"
                />
              </div>

              <div className="pt-2 border-t border-purple-500/20">
                <p className="text-sm text-purple-300/60 mb-3 text-left">
                  Birth details (for your personalized chart):
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-purple-300/50 block mb-1 text-left">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-purple-300/50 block mb-1 text-left">Time of Birth</label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="text-xs text-purple-300/50 block mb-1 text-left">Place of Birth</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition text-sm"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 accent-purple-500"
                />
                <label htmlFor="consent" className="text-xs text-purple-300/60 text-left">
                  I agree to receive updates about North Star Astro. No spam, unsubscribe anytime.
                </label>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join the Waitlist →'}
              </button>
              
              <p className="text-xs text-purple-300/40 text-center">
                Free beta access + founding member pricing
              </p>
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
