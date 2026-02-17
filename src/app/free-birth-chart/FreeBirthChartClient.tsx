'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FreeBirthChartClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Store data in sessionStorage for chat page to use
    sessionStorage.setItem('birthData', JSON.stringify(formData));
    
    // Redirect to chat with pre-filled message
    const message = `I'd like my free birth chart. My details: ${formData.name}, born ${formData.date} at ${formData.time} in ${formData.location}`;
    router.push(`/chat?message=${encodeURIComponent(message)}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">
              Blog
            </Link>
            <Link href="/about" className="text-purple-300/70 hover:text-white transition">
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="px-6 py-12 md:py-20 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🌟</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Free Birth Chart Calculator</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/80 max-w-3xl mx-auto mb-4">
            Get your complete birth chart combining <strong>Western, Vedic, and Numerology</strong> — 
            the most comprehensive free reading available online.
          </p>
          <p className="text-purple-300/60">
            ✓ Instant AI-powered results &nbsp;•&nbsp; ✓ No credit card required &nbsp;•&nbsp; ✓ 100% free forever
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-8 sticky top-8">
            <h2 className="text-2xl font-bold text-white mb-2">Calculate Your Birth Chart</h2>
            <p className="text-purple-300/60 mb-6 text-sm">
              Enter your birth details for a personalized cosmic blueprint
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Sarah Johnson"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-purple-200 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-purple-200 mb-2">
                  Birth Time
                  <span className="text-purple-400/60 font-normal ml-2">(If known)</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="14:30"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-purple-400/60 mt-1">
                  Birth time unlocks your Rising sign and house placements
                </p>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-purple-200 mb-2">
                  Birth Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., New York, NY or Mumbai, India"
                  className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Calculating...' : 'Get My Free Birth Chart ✨'}
              </button>

              <p className="text-xs text-purple-300/50 text-center">
                By continuing, you agree to receive your birth chart and optional email updates. 
                No spam, unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Discover</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="text-3xl">☀️</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Your Sun, Moon & Rising Signs</h3>
                    <p className="text-purple-300/70 text-sm">
                      The three pillars of your personality — who you are, how you feel, and how others see you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🪐</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">All 10 Planetary Placements</h3>
                    <p className="text-purple-300/70 text-sm">
                      Mercury (communication), Venus (love), Mars (drive), Jupiter (luck), Saturn (lessons), and more.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🏠</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">12 House Interpretations</h3>
                    <p className="text-purple-300/70 text-sm">
                      Where each planet falls reveals which life areas (career, love, home, etc.) are most activated.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🕉️</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Vedic Astrology Insights</h3>
                    <p className="text-purple-300/70 text-sm">
                      Your Vedic Moon sign (Rashi), Nakshatra (lunar mansion), and current Dasha period for timing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="text-3xl">🔢</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Numerology Blueprint</h3>
                    <p className="text-purple-300/70 text-sm">
                      Life Path, Expression, and Soul Urge numbers reveal your destiny and hidden talents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                <span className="text-sm text-purple-300/60">4.8/5 from 2,000+ readings</span>
              </div>
              <p className="text-purple-200/80 text-sm mb-2">
                "The most comprehensive free birth chart I've found. Finally, a reading that combines Western and Vedic!"
              </p>
              <p className="text-purple-400/60 text-xs">— Maya R., Verified User</p>
            </div>

            {/* Why Different */}
            <div className="bg-white/5 rounded-xl border border-purple-500/20 p-6">
              <h3 className="font-bold text-white mb-4">Why Our Birth Chart is Different</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="text-green-400 mt-0.5">✓</div>
                  <div>
                    <strong className="text-white">Triple-System Analysis</strong>
                    <p className="text-purple-300/70">Most calculators only show Western astrology. We combine three ancient wisdom systems for the complete picture.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 mt-0.5">✓</div>
                  <div>
                    <strong className="text-white">AI-Powered Interpretation</strong>
                    <p className="text-purple-300/70">Our AI astrologer Tara synthesizes your chart into plain-language insights, not just data dumps.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-400 mt-0.5">✓</div>
                  <div>
                    <strong className="text-white">Completely Free</strong>
                    <p className="text-purple-300/70">No hidden fees, no upsells, no credit card required. We believe everyone deserves access to cosmic guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                What is a birth chart?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                A birth chart (also called a natal chart) is a snapshot of the sky at the exact moment and location you were born. 
                It shows where the Sun, Moon, planets, and zodiac signs were positioned, creating a unique cosmic blueprint that 
                reveals your personality, strengths, challenges, and life path.
              </p>
            </details>

            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                Do I need my exact birth time?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                Birth time is helpful but not required. Without it, you'll still get your Sun sign, Moon sign, and all planetary 
                placements. However, birth time unlocks your Rising sign (Ascendant) and house positions, which reveal WHERE in 
                your life these energies play out. Check your birth certificate if you're unsure — it's usually listed there.
              </p>
            </details>

            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                How is this different from my daily horoscope?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                Daily horoscopes are based only on your Sun sign — just 1/12 of your chart. Your birth chart is personalized to YOU 
                specifically, based on your exact birth date, time, and location. It never changes and reveals patterns that generic 
                horoscopes can't see. Think of it as the difference between fortune cookies and a personalized DNA test.
              </p>
            </details>

            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                What's the difference between Western and Vedic astrology?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                Western astrology uses the tropical zodiac (based on seasons) and focuses on psychological insight — understanding 
                your personality and motivations. Vedic astrology uses the sidereal zodiac (based on actual star positions) and 
                emphasizes karma, destiny, and timing through systems like Dashas. We show you both because they reveal different 
                layers of truth.
              </p>
            </details>

            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                Is this really free? What's the catch?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                Yes, completely free. No credit card, no hidden fees, no forced upsells. You'll get your full birth chart 
                interpretation powered by AI. We may offer optional premium features in the future (like live consultations), 
                but the core birth chart calculator will always remain free. Our mission is making cosmic wisdom accessible to everyone.
              </p>
            </details>

            <details className="bg-white/5 rounded-xl border border-purple-500/20 p-6 group">
              <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                How accurate is AI astrology?
                <span className="text-purple-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-purple-200/70 mt-4 text-sm leading-relaxed">
                Our AI (Tara) is trained on classical astrological texts and thousands of chart interpretations. It combines 
                Western, Vedic, and Numerological principles to synthesize insights. While AI can't replace human intuition, 
                it excels at pattern recognition and providing comprehensive analysis instantly. Many users find AI readings 
                surprisingly accurate because they draw from a vast knowledge base no single human could memorize.
              </p>
            </details>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-900/40 to-pink-900/30 rounded-2xl border border-purple-500/30 p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Your Cosmic Blueprint?</h2>
          <p className="text-xl text-purple-200/70 mb-8 max-w-2xl mx-auto">
            Join thousands who've unlocked profound self-understanding through their birth chart.
          </p>
          <button
            onClick={() => document.getElementById('name')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition text-lg"
          >
            Calculate Your Free Birth Chart ✨
          </button>
          <p className="text-sm text-purple-300/50 mt-4">Takes 30 seconds • No signup required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/40 text-sm">
            © 2026 North Star Astro. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
