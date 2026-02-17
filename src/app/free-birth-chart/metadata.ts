import { Metadata } from 'next';

const title = "Free Birth Chart Calculator (Western + Vedic + Numerology) | North Star Astro";
const description = "Get your complete birth chart free. Combines Western, Vedic, and Numerology for the most comprehensive reading available. Instant AI-powered results. No credit card required.";
const url = "https://northstarastro.com/free-birth-chart";
const ogImage = `https://northstarastro.com/api/og?title=${encodeURIComponent('Free Birth Chart Calculator')}&description=${encodeURIComponent('Western + Vedic + Numerology Combined')}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: "free birth chart, birth chart calculator, natal chart, astrology chart, free astrology reading, birth chart interpretation, vedic birth chart, numerology calculator, free horoscope",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "North Star Astro",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Free Birth Chart Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

// Structured data for HowTo schema
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Your Free Birth Chart",
  "description": "Calculate your complete birth chart combining Western astrology, Vedic astrology, and Numerology in seconds.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Name",
      "text": "Provide your full name for personalized interpretation."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Birth Date",
      "text": "Input your date of birth to calculate planetary positions."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Birth Time (Optional)",
      "text": "Add your birth time if known to unlock Rising sign and house placements."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Birth Location",
      "text": "Specify your birth city and country for accurate chart calculation."
    },
    {
      "@type": "HowToStep",
      "name": "Get Instant Results",
      "text": "Receive your complete birth chart interpretation combining three ancient wisdom systems."
    }
  ],
  "totalTime": "PT30S",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Birth Certificate"
    }
  ]
};

// FAQ Schema for rich snippets
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a birth chart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A birth chart (also called a natal chart) is a snapshot of the sky at the exact moment and location you were born. It shows where the Sun, Moon, planets, and zodiac signs were positioned, creating a unique cosmic blueprint that reveals your personality, strengths, challenges, and life path."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need my exact birth time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Birth time is helpful but not required. Without it, you'll still get your Sun sign, Moon sign, and all planetary placements. However, birth time unlocks your Rising sign (Ascendant) and house positions, which reveal WHERE in your life these energies play out."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from my daily horoscope?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily horoscopes are based only on your Sun sign — just 1/12 of your chart. Your birth chart is personalized to YOU specifically, based on your exact birth date, time, and location. It never changes and reveals patterns that generic horoscopes can't see."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between Western and Vedic astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Western astrology uses the tropical zodiac (based on seasons) and focuses on psychological insight. Vedic astrology uses the sidereal zodiac (based on actual star positions) and emphasizes karma, destiny, and timing. We show you both because they reveal different layers of truth."
      }
    },
    {
      "@type": "Question",
      "name": "Is this really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely free. No credit card, no hidden fees, no forced upsells. You'll get your full birth chart interpretation powered by AI. Our mission is making cosmic wisdom accessible to everyone."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is AI astrology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI is trained on classical astrological texts and thousands of chart interpretations. It combines Western, Vedic, and Numerological principles to synthesize insights. Many users find AI readings surprisingly accurate because they draw from a vast knowledge base."
      }
    }
  ]
};
