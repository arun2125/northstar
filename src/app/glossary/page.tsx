import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Astrology Glossary: Western, Vedic & Numerology Terms | North Star Astro',
  description: 'Comprehensive glossary of astrology terms including Western zodiac, Vedic Jyotish, and Numerology. Learn Sanskrit terms like Nakshatra, Dasha, Rahu, and more.',
  keywords: 'astrology glossary, vedic astrology terms, jyotish dictionary, nakshatra meaning, dasha system, rahu ketu, astrology definitions',
  alternates: {
    canonical: 'https://northstarastro.com/glossary',
  },
  openGraph: {
    title: 'Complete Astrology Glossary - Western, Vedic & Numerology',
    description: 'Comprehensive glossary of astrology terms including Western zodiac, Vedic Jyotish, and Numerology definitions.',
    url: 'https://northstarastro.com/glossary',
    type: 'website',
  },
}

const glossaryTerms = {
  A: [
    { term: 'Ascendant (Rising Sign)', definition: 'The zodiac sign rising on the eastern horizon at your birth moment; represents how you present yourself to the world and your physical appearance.', link: '/blog/how-to-read-your-birth-chart' },
    { term: 'Aspect', definition: 'Angular relationship between planets in a birth chart (conjunction, square, trine, opposition, sextile); indicates how planetary energies interact.' },
    { term: 'Atmakaraka', definition: '(Vedic) The planet at the highest degree in your chart; represents your soul\'s desire and primary karmic lessons.', vedic: true },
    { term: 'Ayanamsa', definition: '(Vedic) The difference between tropical and sidereal zodiacs; currently about 24 degrees, used to calculate Vedic charts from Western positions.', vedic: true, link: '/blog/vedic-vs-western-astrology' },
  ],
  B: [
    { term: 'Birth Chart (Natal Chart)', definition: 'Map of planetary positions at the exact moment and location of your birth; foundation of personalized astrology readings.', link: '/free-birth-chart' },
    { term: 'Bhava', definition: '(Vedic) House in Vedic astrology; 12 divisions representing life areas like career, relationships, health.', vedic: true },
    { term: 'Bhukti', definition: '(Vedic) Sub-period within a larger dasha period; refines timing predictions.', vedic: true },
  ],
  C: [
    { term: 'Cardinal Signs', definition: 'Aries, Cancer, Libra, Capricorn; initiators who start new cycles and lead change.', link: '/blog/astrology-modalities-explained' },
    { term: 'Conjunction', definition: 'When two or more planets occupy the same degree in a chart; blends their energies intensely.' },
    { term: 'Cusp', definition: 'The dividing line between two zodiac signs or houses; sensitive points in a chart.' },
  ],
  D: [
    { term: 'Dasha', definition: '(Vedic) Planetary period system unique to Vedic astrology; predicts timing of major life events based on planetary rulership periods.', vedic: true, link: '/blog/dasha-system-explained' },
    { term: 'Descendant', definition: 'Point opposite your Ascendant; represents partnership, marriage, and how you relate to others.' },
    { term: 'Decan', definition: '10-degree subdivision of each zodiac sign; adds flavor to sun sign interpretations.' },
    { term: 'Debilitation', definition: 'When a planet occupies its weakest zodiac sign; challenges that planet\'s expression (e.g., Moon in Scorpio).' },
  ],
  E: [
    { term: 'Eclipse', definition: 'When Sun and Moon align with lunar nodes; accelerates fate and brings sudden changes.', link: '/blog/eclipse-season-meaning' },
    { term: 'Elements', definition: 'Fire, Earth, Air, Water; fundamental energies that group zodiac signs by temperament.', link: '/blog/astrology-elements-explained' },
    { term: 'Exaltation', definition: 'When a planet occupies its strongest zodiac sign; enhances that planet\'s expression (e.g., Sun in Aries).' },
    { term: 'Expression Number', definition: '(Numerology) Calculated from your full birth name; reveals natural talents and how you express yourself.', numerology: true, link: '/blog/expression-number-meaning' },
  ],
  F: [
    { term: 'Fixed Signs', definition: 'Taurus, Leo, Scorpio, Aquarius; stabilizers who sustain what cardinals start.', link: '/blog/astrology-modalities-explained' },
  ],
  G: [
    { term: 'Gochara', definition: '(Vedic) Planetary transits; current sky positions affecting your natal chart.', vedic: true },
    { term: 'Graha', definition: '(Vedic) Planet; literally "that which grasps" in Sanskrit, referring to celestial bodies.', vedic: true },
  ],
  H: [
    { term: 'Houses', definition: '12 divisions of the birth chart representing life areas: self, money, communication, home, creativity, health, partnership, transformation, philosophy, career, community, spirituality.', link: '/blog/12-houses-explained' },
  ],
  I: [
    { term: 'IC (Imum Coeli)', definition: 'Bottom of the chart; represents home, family roots, and emotional foundation.' },
  ],
  J: [
    { term: 'Jyotish', definition: 'Vedic astrology; Sanskrit term meaning "science of light."', vedic: true, link: '/blog/what-is-vedic-astrology' },
    { term: 'Jupiter Return', definition: 'When transiting Jupiter returns to its natal position (every ~12 years); brings expansion and new opportunities.', link: '/blog/jupiter-transit-meaning' },
  ],
  K: [
    { term: 'Kala Sarpa Yoga', definition: '(Vedic) When all planets fall between Rahu and Ketu; creates intense karmic experiences and challenges.', vedic: true },
    { term: 'Karaka', definition: '(Vedic) Significator planet; shows what each planet represents (e.g., Venus = relationships, Jupiter = wisdom).', vedic: true },
    { term: 'Ketu', definition: '(Vedic) South Node of the Moon; represents past life karma, spiritual detachment, and what you\'re releasing.', vedic: true },
    { term: 'Kundali', definition: '(Vedic) Birth chart; also called horoscope or Janma Kundali.', vedic: true, link: '/blog/kundali-matching-explained' },
  ],
  L: [
    { term: 'Lagnam', definition: '(Vedic) Ascendant; rising sign at birth.', vedic: true },
    { term: 'Life Path Number', definition: '(Numerology) Calculated from birth date; reveals your life\'s purpose and major lessons.', numerology: true, link: '/blog/life-path-number-meaning' },
    { term: 'Lunar Nodes', definition: 'Rahu (North Node) and Ketu (South Node); karmic points where eclipses occur.', vedic: true },
  ],
  M: [
    { term: 'Mahadasha', definition: '(Vedic) Major planetary period in dasha system; lasts from 6 to 20 years depending on the planet.', vedic: true, link: '/blog/dasha-system-explained' },
    { term: 'Malefic', definition: 'Traditionally challenging planets (Mars, Saturn, Rahu, Ketu); bring difficulties that catalyze growth.' },
    { term: 'Master Numbers', definition: '(Numerology) 11, 22, 33; carry heightened spiritual significance and power.', numerology: true, link: '/blog/master-numbers-explained' },
    { term: 'MC (Midheaven)', definition: 'Top of the chart; represents career, public image, and life direction.' },
    { term: 'Modalities', definition: 'Cardinal, Fixed, Mutable; show how zodiac signs express energy and handle change.', link: '/blog/astrology-modalities-explained' },
    { term: 'Moon Sign', definition: 'Zodiac sign where the Moon was located at your birth; represents emotions, instincts, and inner self.', link: '/blog/vedic-moon-sign' },
    { term: 'Mutable Signs', definition: 'Gemini, Virgo, Sagittarius, Pisces; adapters who facilitate transitions and bring flexibility.', link: '/blog/astrology-modalities-explained' },
  ],
  N: [
    { term: 'Nakshatra', definition: '(Vedic) Lunar mansion; 27 divisions of the zodiac based on Moon\'s position, each with unique qualities and ruling deities.', vedic: true, link: '/blog/nakshatras-explained' },
    { term: 'Natal Chart', definition: 'See Birth Chart.', link: '/free-birth-chart' },
    { term: 'Nodes', definition: 'See Lunar Nodes.' },
  ],
  O: [
    { term: 'Opposition', definition: '180-degree aspect between planets; creates tension requiring balance between opposite energies.' },
    { term: 'Orb', definition: 'Allowable degree range for an aspect to be considered active (typically 6-10 degrees).' },
  ],
  P: [
    { term: 'Panchanga', definition: '(Vedic) Five-limb almanac showing daily tithi, nakshatra, yoga, karana, and vara for timing activities.', vedic: true },
    { term: 'Planetary Dignity', definition: 'Strength of a planet based on zodiac sign placement (exaltation, domicile, detriment, fall).' },
    { term: 'Pluto Return', definition: 'When transiting Pluto returns to natal position (~248 years); transformation for nations and collective.' },
    { term: 'Progressed Chart', definition: 'Advanced technique showing your evolving chart as you age; one day of life equals one year.' },
  ],
  Q: [
    { term: 'Quadrants', definition: 'Four main angles of the chart (Ascendant, IC, Descendant, MC); foundational points.' },
  ],
  R: [
    { term: 'Rahu', definition: '(Vedic) North Node of the Moon; represents worldly desires, future karma, and what you\'re moving toward.', vedic: true },
    { term: 'Rashi', definition: '(Vedic) Zodiac sign; 12 divisions of the zodiac in Vedic astrology.', vedic: true },
    { term: 'Retrograde', definition: 'When a planet appears to move backward in the sky; internal processing of that planet\'s themes.', link: '/blog/venus-retrograde-meaning' },
    { term: 'Rising Sign', definition: 'See Ascendant.' },
  ],
  S: [
    { term: 'Sade Sati', definition: '(Vedic) Seven-and-a-half year period when Saturn transits your Moon sign and adjacent signs; challenging but transformative.', vedic: true, link: '/blog/sade-sati-explained' },
    { term: 'Saturn Return', definition: 'When transiting Saturn returns to natal position (~29.5 years); major life restructuring and maturation.', link: '/blog/saturn-return-vedic-western' },
    { term: 'Sextile', definition: '60-degree aspect between planets; creates opportunities and ease.' },
    { term: 'Sidereal Zodiac', definition: '(Vedic) Star-based zodiac aligned with actual constellations; used in Vedic astrology.', vedic: true, link: '/blog/vedic-vs-western-astrology' },
    { term: 'Square', definition: '90-degree aspect between planets; creates tension and challenges that drive growth.' },
    { term: 'Sun Sign', definition: 'Zodiac sign where the Sun was located at your birth; represents core identity and life purpose.' },
  ],
  T: [
    { term: 'Tithi', definition: '(Vedic) Lunar day in Hindu calendar; important for timing rituals and events.', vedic: true },
    { term: 'Transit', definition: 'Current position of planets in the sky affecting your natal chart; triggers events and experiences.', link: '/blog/jupiter-transit-meaning' },
    { term: 'Trine', definition: '120-degree aspect between planets; creates harmony, talent, and natural flow.' },
    { term: 'Tropical Zodiac', definition: '(Western) Season-based zodiac starting at Spring Equinox (0° Aries); used in Western astrology.', link: '/blog/vedic-vs-western-astrology' },
  ],
  U: [
    { term: 'Upachaya Houses', definition: '(Vedic) Houses 3, 6, 10, 11; improve over time and benefit from malefic planets.', vedic: true },
  ],
  V: [
    { term: 'Varga Charts', definition: '(Vedic) Divisional charts (D-9, D-10, etc.); examine specific life areas in detail.', vedic: true },
    { term: 'Vimshottari Dasha', definition: '(Vedic) 120-year planetary period system; most common dasha system used for predictions.', vedic: true, link: '/blog/dasha-system-explained' },
  ],
  Y: [
    { term: 'Yoga', definition: '(Vedic) Planetary combination creating specific results (e.g., Raja Yoga = success, Dhana Yoga = wealth).', vedic: true },
  ],
  Z: [
    { term: 'Zenith', definition: 'Highest point in the sky; related to MC (Midheaven) in chart.' },
    { term: 'Zodiac', definition: 'Belt of sky divided into 12 signs; foundation of Western and Vedic astrology.' },
  ],
}

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Astrology Glossary
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your complete guide to Western, Vedic & Numerology terms
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              Western Astrology
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
              Vedic Jyotish
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Numerology
            </span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Jump to letter:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(glossaryTerms).map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="px-3 py-1 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* Glossary Terms */}
        <div className="space-y-8">
          {Object.entries(glossaryTerms).map(([letter, terms]) => (
            <div key={letter} id={letter} className="scroll-mt-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">
                {letter}
              </h2>
              <dl className="space-y-4">
                {terms.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-colors">
                    <dt className="font-semibold text-lg text-gray-900 mb-2 flex items-center gap-2">
                      {item.term}
                      {item.vedic && (
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                          Vedic
                        </span>
                      )}
                      {item.numerology && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          Numerology
                        </span>
                      )}
                    </dt>
                    <dd className="text-gray-700 leading-relaxed">
                      {item.definition}
                      {item.link && (
                        <>
                          {' '}
                          <a 
                            href={item.link}
                            className="text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Learn more →
                          </a>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Want to see these terms in YOUR chart?
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Get a free AI-powered reading combining Western astrology, Vedic wisdom, and Numerology. 
            Discover how these concepts apply to your unique birth chart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/chat"
              className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Chat with Tara →
            </a>
            <a
              href="/free-birth-chart"
              className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              Calculate Free Birth Chart
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-gray-500 italic">
          This glossary is regularly updated with new terms. Bookmark this page for quick reference!
        </p>
      </div>
    </div>
  )
}
