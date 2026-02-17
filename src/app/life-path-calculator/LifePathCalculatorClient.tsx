'use client';

import { useState } from 'react';
import Link from 'next/link';

const LIFE_PATH_MEANINGS: Record<number, { title: string; description: string; traits: string[] }> = {
  1: {
    title: "The Leader",
    description: "You're here to pioneer, innovate, and lead. Independence is your birthright. Your challenge is learning that strength doesn't mean going it alone.",
    traits: ["Independent", "Ambitious", "Innovative", "Self-reliant", "Determined"]
  },
  2: {
    title: "The Mediator", 
    description: "You're here to cooperate, balance, and bring harmony. Your sensitivity is a gift, not a weakness. Partnership and diplomacy are your paths to fulfillment.",
    traits: ["Diplomatic", "Intuitive", "Cooperative", "Patient", "Supportive"]
  },
  3: {
    title: "The Communicator",
    description: "You're here to express, create, and inspire. Joy and creativity flow through you. Your challenge is focusing your talents rather than scattering them.",
    traits: ["Creative", "Expressive", "Optimistic", "Social", "Artistic"]
  },
  4: {
    title: "The Builder",
    description: "You're here to create structure, stability, and lasting foundations. Hard work is your nature. Your challenge is not letting discipline become rigidity.",
    traits: ["Practical", "Organized", "Reliable", "Hardworking", "Loyal"]
  },
  5: {
    title: "The Freedom Seeker",
    description: "You're here to experience life fully — travel, change, adventure. Freedom is non-negotiable. Your challenge is finding depth within constant change.",
    traits: ["Adventurous", "Versatile", "Dynamic", "Curious", "Freedom-loving"]
  },
  6: {
    title: "The Nurturer",
    description: "You're here to love, heal, and create harmony in home and family. Responsibility calls you. Your challenge is nurturing yourself as well as others.",
    traits: ["Caring", "Responsible", "Protective", "Harmonious", "Domestic"]
  },
  7: {
    title: "The Seeker",
    description: "You're here to seek truth, wisdom, and spiritual understanding. Solitude feeds your soul. Your challenge is balancing inner exploration with human connection.",
    traits: ["Analytical", "Introspective", "Spiritual", "Wise", "Reserved"]
  },
  8: {
    title: "The Powerhouse",
    description: "You're here to master the material world — money, power, achievement. Abundance is your birthright. Your challenge is using power with integrity.",
    traits: ["Ambitious", "Authoritative", "Successful", "Business-minded", "Strong"]
  },
  9: {
    title: "The Humanitarian",
    description: "You're here to serve humanity and embody universal love. Compassion drives you. Your challenge is releasing attachments and learning to let go.",
    traits: ["Compassionate", "Generous", "Idealistic", "Creative", "Wise"]
  },
  11: {
    title: "Master Intuitive",
    description: "You carry the energy of 2 amplified with spiritual insight. You're here to inspire and illuminate. Your challenge is grounding your visions in reality.",
    traits: ["Visionary", "Intuitive", "Inspiring", "Sensitive", "Spiritual leader"]
  },
  22: {
    title: "Master Builder",
    description: "You carry the energy of 4 amplified with manifestation power. You're here to build something that serves humanity. Your challenge is not shrinking from your potential.",
    traits: ["Visionary builder", "Practical idealist", "Powerful", "Disciplined", "Legacy-minded"]
  },
  33: {
    title: "Master Teacher",
    description: "You carry the energy of 6 amplified with spiritual teaching ability. You're here to uplift and heal humanity. Your challenge is not martyring yourself.",
    traits: ["Compassionate healer", "Spiritual teacher", "Selfless", "Nurturing", "Inspiring"]
  }
};

function calculateLifePath(birthDate: string): number | null {
  if (!birthDate) return null;
  
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Reduce each component
  const reduceToDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = String(num).split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  };
  
  const dayReduced = reduceToDigit(day);
  const monthReduced = reduceToDigit(month);
  const yearReduced = reduceToDigit(year);
  
  let total = dayReduced + monthReduced + yearReduced;
  
  // Final reduction, preserving master numbers
  while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
    total = String(total).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  
  return total;
}

export default function LifePathCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [lifePath, setLifePath] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateLifePath(birthDate);
    setLifePath(result);
  };

  const meaning = lifePath ? LIFE_PATH_MEANINGS[lifePath] : null;

  return (
    <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            North Star Astro
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-purple-300/70 hover:text-white transition">Home</Link>
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">Blog</Link>
            <Link href="/numerology" className="text-purple-300/70 hover:text-white transition">Numerology</Link>
          </nav>
        </div>
      </header>

      {/* Calculator Section */}
      <section className="px-6 py-16 md:py-24 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Life Path Calculator</span>
          </h1>
          <p className="text-xl text-purple-200/70">
            Discover your Life Path number — the most important number in numerology.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-8 mb-8">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label className="block text-purple-200/80 mb-2">Your Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition text-lg"
            >
              Calculate My Life Path ✨
            </button>
          </form>
        </div>

        {/* Result */}
        {lifePath && meaning && (
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20 p-8 text-center animate-fadeIn">
            <div className="text-6xl font-bold gradient-text mb-2">
              {lifePath}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {meaning.title}
            </h2>
            <p className="text-purple-200/80 mb-6 leading-relaxed">
              {meaning.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {meaning.traits.map((trait) => (
                <span 
                  key={trait}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
            <Link
              href="/numerology"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Learn more about numerology →
            </Link>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">How Life Path Numbers Work</h2>
          <div className="prose prose-invert prose-purple max-w-none text-purple-200/80">
            <p>
              Your Life Path number is calculated by adding all the digits of your birth date 
              until you reach a single digit (or a Master Number: 11, 22, or 33).
            </p>
            <p>
              This number reveals your life's purpose, natural talents, and the lessons you're 
              here to learn. It's the most important number in your numerology chart — think of 
              it like your Sun sign in astrology.
            </p>
            <p>
              Unlike astrology, which requires exact birth time, numerology only needs your 
              birth date. This makes it accessible to everyone and provides another layer of 
              insight into your personality and destiny.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-white/5 rounded-2xl border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-3">
            Want the complete picture?
          </h3>
          <p className="text-purple-200/70 mb-6">
            Combine your Life Path with your astrological birth chart for deeper insights.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
          >
            Get Your Free Reading
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/40 text-sm">© 2026 North Star Astro. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
