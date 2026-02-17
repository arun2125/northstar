import ChatInterface from '@/components/ChatInterface';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with Tara - North Star Astro',
  description: 'Get personalized astrology insights combining Vedic wisdom and numerology. Chat with Tara, your AI astrology guide.',
  alternates: {
    canonical: 'https://northstarastro.com/chat',
  },
  openGraph: {
    title: 'Chat with Tara - North Star Astro',
    description: 'Get personalized astrology insights combining Vedic wisdom and numerology.',
    url: 'https://northstarastro.com/chat',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Chat%20with%20Tara',
      width: 1200,
      height: 630,
      alt: 'Chat with Tara - AI Astrology Guide',
    }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Chat with Tara',
  description: 'AI-powered astrology assistant combining Vedic astrology and numerology insights.',
  url: 'https://northstarastro.com/chat',
  applicationCategory: 'LifestyleApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Talk to Tara
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your personal astrology guide combining ancient Vedic wisdom and numerology insights
            </p>
          </div>
          
          <ChatInterface />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Powered by AI • Vedic Astrology • Numerology
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
