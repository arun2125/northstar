import Link from 'next/link';

export default function AuthorBio() {
  return (
    <div className="mt-12 p-6 bg-white/5 rounded-xl border border-purple-500/20">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
          ✨
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1">North Star Astro</h4>
          <p className="text-purple-300/60 text-sm mb-3">
            Astrology Education & AI-Powered Readings
          </p>
          <p className="text-purple-200/70 text-sm leading-relaxed">
            We combine traditional astrological wisdom with modern AI to make cosmic knowledge 
            accessible. Our content draws from classical Western astrology, psychological astrology, 
            and modern timing techniques — explained in plain language.
          </p>
          <div className="mt-3 flex gap-4">
            <Link 
              href="/about" 
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Learn more about us →
            </Link>
            <a 
              href="https://twitter.com/northstar_astro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Follow on Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
