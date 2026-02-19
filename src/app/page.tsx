'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Sun sign data with date ranges and insights
const SUN_SIGNS = [
  { sign: 'Capricorn', symbol: '♑', start: [1, 1], end: [1, 19], 
    insight: "You don't have trust issues — you have 'I've seen how this ends' issues. Your walls aren't weakness; they're wisdom. But somewhere along the way, protection became a prison." },
  { sign: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18],
    insight: "You've always felt like you're watching humanity from the outside. That's not alienation — it's perspective. The loneliness you feel isn't about being too different. It's about waiting for people to catch up." },
  { sign: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20],
    insight: "You absorb everyone's emotions because you never learned where you end and others begin. That's not a flaw — it's a gift you haven't learned to control yet. Your sensitivity is your superpower, not your weakness." },
  { sign: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19],
    insight: "You're not impatient — you just see the finish line before everyone else starts running. The frustration you feel isn't about others being slow. It's about having a fire inside that the world keeps trying to dim." },
  { sign: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20],
    insight: "They call you stubborn, but what they mean is 'unshakeable.' You've built your life on foundations others can't see. The comfort you crave isn't laziness — it's your soul demanding the safety it was once denied." },
  { sign: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20],
    insight: "You're not two-faced — you're multi-dimensional. The version of you that people find 'inconsistent' is actually adapting in real-time. Your mind moves faster than most people can follow. That's not chaos; that's genius." },
  { sign: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22],
    insight: "You remember everything — especially what hurt. That's not holding grudges; that's your heart keeping receipts so it knows who's safe. Your sensitivity isn't weakness. It's the price of feeling everything fully." },
  { sign: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22],
    insight: "The attention you crave isn't vanity — it's a child still waiting to be seen by the people who should have noticed first. Your need to shine isn't ego. It's a survival instinct that became a personality." },
  { sign: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22],
    insight: "You're not critical — you're precise. You see the gap between what is and what could be, and it haunts you. The perfectionism that exhausts you is just love with impossibly high standards." },
  { sign: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22],
    insight: "You keep the peace because conflict feels like dying. That's not weakness — it's the scar tissue from a time when harmony was the only way to survive. But peace at any price eventually costs you yourself." },
  { sign: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21],
    insight: "You don't have trust issues — you have pattern recognition. You've been burned by the same archetype three times. The walls you build aren't paranoia; they're experience crystallized into boundaries." },
  { sign: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21],
    insight: "You're not commitment-phobic — you're freedom-dependent. The restlessness that won't let you settle isn't running away. It's running toward something you haven't found yet. Keep searching." },
  { sign: 'Capricorn', symbol: '♑', start: [12, 22], end: [12, 31],
    insight: "You don't have trust issues — you have 'I've seen how this ends' issues. Your walls aren't weakness; they're wisdom. But somewhere along the way, protection became a prison." },
];

function getSunSign(birthDate: string): typeof SUN_SIGNS[0] | null {
  if (!birthDate) return null;
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const sign of SUN_SIGNS) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) return sign;
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) return sign;
    }
  }
  return null;
}

// Major cities for autocomplete
const CITIES = [
  "Mumbai, India", "Delhi, India", "Bangalore, India", "Chennai, India", "Kolkata, India",
  "Hyderabad, India", "Pune, India", "Ahmedabad, India", "Jaipur, India", "Lucknow, India",
  "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA", "San Francisco, USA",
  "London, UK", "Manchester, UK", "Birmingham, UK", "Dubai, UAE", "Singapore",
  "Sydney, Australia", "Melbourne, Australia", "Toronto, Canada", "Vancouver, Canada",
];

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    email: '',
    birthDate: '',
    birthHour: '',
    birthMinute: '',
    birthAmPm: '',
    birthPlace: '',
  });
  const [sunSign, setSunSign] = useState<typeof SUN_SIGNS[0] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  // Step 1: Email + Birth Date → Show Mini Reading
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const sign = getSunSign(formData.birthDate);
    if (!sign) {
      setStatus('error');
      setMessage('Please enter a valid birth date.');
      return;
    }

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, birthDate: formData.birthDate }),
      });

      const data = await res.json();

      if (res.ok) {
        setSunSign(sign);
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

  // Step 2 → 3: Add more details
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

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

      if (res.ok) {
        setStep(3);
        setStatus('success');
      } else {
        setStatus('error');
        setMessage('Failed to save details. But you\'re still on the list!');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. But you\'re still on the list!');
    }
  };

  const skipToFinish = () => {
    setStep(3);
    setStatus('success');
  };

  return (
    <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-4 md:px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-bold gradient-text whitespace-nowrap">
            North Star Astro
          </Link>
          <nav className="flex gap-3 md:gap-6 text-sm md:text-base">
            <Link href="/western-astrology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Western
            </Link>
            <Link href="/vedic-astrology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Vedic
            </Link>
            <Link href="/numerology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Numerology
            </Link>
            <Link href="/chinese-zodiac" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Chinese
            </Link>
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">
              Blog
            </Link>
            <Link href="/about" className="text-purple-300/70 hover:text-white transition">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="waitlist" className="relative px-6 py-24 md:py-32 max-w-5xl mx-auto text-center">
        <div className="mb-6 text-purple-400 text-sm tracking-widest uppercase">
          ✦ The Only Platform Combining All Three ✦
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Western. Vedic. Chinese.</span>
          <br />
          <span className="text-white/90">One Complete Reading.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200/80 mb-12 max-w-2xl mx-auto">
          {step === 1 
            ? "Other apps give you one system. We integrate three — for insights you can't find anywhere else."
            : "Your birth chart analyzed through Western psychology, Vedic karma, and Chinese zodiac."}
        </p>

        {/* Multi-step Form */}
        <div className="max-w-md mx-auto glow rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/20 p-8">
          
          {/* Step 1: Email + Birth Date */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                🔮 See What Three Systems Reveal
              </h3>
              
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition text-lg"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300/60 block mb-2 text-left">
                  Your Birth Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
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
                {status === 'loading' ? 'Reading your stars...' : 'Reveal My Reading ✨'}
              </button>
              
              <p className="text-xs text-purple-300/40 text-center">
                Free • No spam • Unsubscribe anytime
              </p>
            </form>
          )}

          {/* Step 2: Show Mini-Reading + Ask for More Details */}
          {step === 2 && sunSign && (
            <div className="space-y-6">
              {/* Mini Reading Result */}
              <div className="text-center">
                <div className="text-6xl mb-3">{sunSign.symbol}</div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  You&apos;re a {sunSign.sign}
                </h3>
                <p className="text-purple-300/60 text-sm">Your Sun Sign Reading</p>
              </div>
              
              <div className="bg-purple-900/30 rounded-xl p-5 border border-purple-500/20">
                <p className="text-purple-100 leading-relaxed italic">
                  &ldquo;{sunSign.insight}&rdquo;
                </p>
              </div>

              <div className="border-t border-purple-500/20 pt-6">
                <p className="text-purple-200/80 text-sm mb-4">
                  🌙 Want your <strong>Vedic Moon sign</strong>, <strong>Nakshatra</strong>, and <strong>Life Path Number</strong>?<br/>
                  Add your birth time and place:
                </p>

                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div>
                    <label className="text-sm text-purple-300/60 block mb-2 text-left">
                      Time of Birth
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
                            setFormData({ ...formData, birthMinute: v });
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
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
                  >
                    {status === 'loading' ? 'Saving...' : 'Unlock My Full Triple Reading 🌙'}
                  </button>

                  <button
                    type="button"
                    onClick={skipToFinish}
                    className="w-full py-2 text-purple-300/60 hover:text-purple-300 transition text-sm"
                  >
                    Maybe later →
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 3: Final Thank You */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-purple-200/70 mb-6">
                We&apos;ll notify you when your integrated Western + Vedic + Numerology reading is ready.
              </p>
              {sunSign && (
                <div className="bg-purple-900/20 rounded-lg p-4 text-left">
                  <p className="text-purple-300/60 text-xs uppercase tracking-wider mb-2">Your {sunSign.sign} reminder:</p>
                  <p className="text-purple-100 text-sm italic">&ldquo;{sunSign.insight.split('.')[0]}.&rdquo;</p>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Why settle for one perspective?
          </h2>
          <p className="text-lg text-purple-200/70 mb-8">
            Most astrology apps give you Western OR Vedic. We give you both — plus Numerology.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-left mt-8">
            <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
              <p className="text-purple-300/80 text-sm">
                <strong className="text-white">Western alone?</strong> Great psychology, but misses predictive timing and karmic patterns.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
              <p className="text-purple-300/80 text-sm">
                <strong className="text-white">Vedic alone?</strong> Powerful predictions, but can feel fatalistic without psychological context.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-purple-500/10">
              <p className="text-purple-300/80 text-sm">
                <strong className="text-white">Together?</strong> The complete picture — psychology, prediction, and life path combined.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Three wisdom systems. One complete picture.
          </h2>
          <p className="text-lg text-purple-200/70 mb-12">
            We combine Western astrology, Vedic astrology, and Numerology for insights you can't find anywhere else.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-lg font-semibold text-white mb-2">Western Astrology</h3>
              <p className="text-purple-200/60 text-sm">
                Psychological depth. Your Sun, Moon, Rising — the full birth chart with modern interpretation.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">🕉️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Vedic Astrology</h3>
              <p className="text-purple-200/60 text-sm">
                Ancient predictive power. Nakshatras, Dashas, and karmic insights from Jyotish tradition.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-4">🔢</div>
              <h3 className="text-lg font-semibold text-white mb-2">Numerology</h3>
              <p className="text-purple-200/60 text-sm">
                Life path numbers, personal years, and the hidden meaning in your birth date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Systems Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Explore Each System
            </h2>
            <p className="text-purple-200/70">
              Deep-dive guides and free tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/vedic-astrology" className="group block bg-gradient-to-br from-orange-900/20 to-purple-900/20 rounded-xl border border-orange-500/20 p-6 hover:border-orange-500/40 transition">
              <div className="text-3xl mb-3">🕉️</div>
              <h3 className="font-semibold text-white group-hover:text-orange-300 transition mb-2">
                Vedic Astrology
              </h3>
              <p className="text-purple-200/60 text-sm mb-4">
                Nakshatras, Dashas, Sade Sati, and ancient Jyotish wisdom.
              </p>
              <span className="text-orange-400 text-sm">Explore Vedic →</span>
            </Link>
            
            <Link href="/numerology" className="group block bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20 p-6 hover:border-blue-500/40 transition">
              <div className="text-3xl mb-3">🔢</div>
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition mb-2">
                Numerology
              </h3>
              <p className="text-purple-200/60 text-sm mb-4">
                Life Path, Expression, Soul Urge, and Personal Year numbers.
              </p>
              <span className="text-blue-400 text-sm">Explore Numbers →</span>
            </Link>
            
            <Link href="/life-path-calculator" className="group block bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-xl border border-pink-500/20 p-6 hover:border-pink-500/40 transition">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-white group-hover:text-pink-300 transition mb-2">
                Life Path Calculator
              </h3>
              <p className="text-purple-200/60 text-sm mb-4">
                Discover your numerology Life Path number instantly.
              </p>
              <span className="text-pink-400 text-sm">Calculate Free →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Start Learning
            </h2>
            <p className="text-purple-200/70">
              50+ free guides across all three systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/how-to-read-your-birth-chart" className="group block bg-white/5 rounded-xl border border-purple-500/20 p-6 hover:bg-white/10 hover:border-purple-500/40 transition">
              <div className="text-xs text-purple-400 mb-2">WESTERN</div>
              <h3 className="font-semibold text-white group-hover:text-purple-300 transition mb-2">
                How to Read Your Birth Chart
              </h3>
              <p className="text-purple-200/60 text-sm">
                Complete beginner guide to understanding your cosmic blueprint.
              </p>
            </Link>
            
            <Link href="/vedic-astrology" className="group block bg-white/5 rounded-xl border border-purple-500/20 p-6 hover:bg-white/10 hover:border-purple-500/40 transition">
              <div className="text-xs text-orange-400 mb-2">VEDIC</div>
              <h3 className="font-semibold text-white group-hover:text-purple-300 transition mb-2">
                Introduction to Jyotish
              </h3>
              <p className="text-purple-200/60 text-sm">
                Nakshatras, Dashas, and the sidereal zodiac explained.
              </p>
            </Link>
            
            <Link href="/numerology" className="group block bg-white/5 rounded-xl border border-purple-500/20 p-6 hover:bg-white/10 hover:border-purple-500/40 transition">
              <div className="text-xs text-blue-400 mb-2">NUMEROLOGY</div>
              <h3 className="font-semibold text-white group-hover:text-purple-300 transition mb-2">
                Your Life Path Number
              </h3>
              <p className="text-purple-200/60 text-sm">
                Calculate and understand your most important number.
              </p>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition"
            >
              View all 50+ articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">North Star Astro</h4>
              <p className="text-purple-300/60 text-sm">
                Western + Vedic + Numerology — three systems, one complete picture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/vedic-astrology" className="text-purple-300/60 hover:text-white transition">Vedic Astrology</Link></li>
                <li><Link href="/numerology" className="text-purple-300/60 hover:text-white transition">Numerology</Link></li>
                <li><Link href="/life-path-calculator" className="text-purple-300/60 hover:text-white transition">Life Path Calculator</Link></li>
                <li><Link href="/blog" className="text-purple-300/60 hover:text-white transition">All Articles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog/how-to-read-your-birth-chart" className="text-purple-300/60 hover:text-white transition">Birth Chart Basics</Link></li>
                <li><Link href="/blog/moon-sign-meaning" className="text-purple-300/60 hover:text-white transition">Moon Signs</Link></li>
                <li><Link href="/blog/saturn-return-meaning" className="text-purple-300/60 hover:text-white transition">Saturn Return</Link></li>
                <li><Link href="/about" className="text-purple-300/60 hover:text-white transition">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://twitter.com/northstar_astro" target="_blank" rel="noopener noreferrer" className="text-purple-300/60 hover:text-white transition">Twitter</a></li>
                <li><Link href="/feed.xml" className="text-purple-300/60 hover:text-white transition">RSS Feed</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/10 pt-8 text-center">
            <p className="text-purple-300/40 text-sm">
              © 2026 North Star Astro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
