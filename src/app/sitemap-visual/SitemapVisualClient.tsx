'use client';

import { useState } from 'react';

export default function SitemapVisualClient() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a0b2e 0%, #0f051d 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '400px',
          width: '90%',
        }}>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>🔒 Protected Area</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>
            Enter password to view site map
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                marginBottom: '15px',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, #1a0b2e 0%, #0f051d 100%);
          color: #fff;
          padding: 20px;
        }
        .container { max-width: 1600px; margin: 0 auto; }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subtitle {
          color: #a78bfa;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(167, 139, 250, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: #a78bfa;
        }
        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-top: 5px;
        }
        .section {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(167, 139, 250, 0.2);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #ec4899;
        }
        .page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        .page-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(167, 139, 250, 0.15);
          border-radius: 8px;
          padding: 15px;
          transition: all 0.3s;
          cursor: pointer;
        }
        .page-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(167, 139, 250, 0.4);
          transform: translateY(-2px);
        }
        .page-card h3 {
          color: #fff;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }
        .page-card .url {
          color: #a78bfa;
          font-size: 0.85rem;
          margin-bottom: 10px;
          font-family: monospace;
        }
        .page-card .description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          margin-right: 5px;
          margin-top: 8px;
        }
        .badge-live { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
        .badge-hub { background: rgba(167, 139, 250, 0.2); color: #a78bfa; }
        .badge-blog { background: rgba(236, 72, 153, 0.2); color: #ec4899; }
        .badge-api { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
        .badge-seo { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        
        .tree {
          margin: 20px 0;
          font-family: monospace;
          font-size: 0.9rem;
        }
        .tree-item {
          padding: 5px 0;
          color: rgba(255, 255, 255, 0.7);
        }
        .tree-item.level-1 { padding-left: 20px; }
        .tree-item.level-2 { padding-left: 40px; }
        .tree-item.level-3 { padding-left: 60px; }
        .tree-icon { color: #a78bfa; margin-right: 8px; }
        .tree-count { color: #ec4899; margin-left: 10px; font-size: 0.85rem; }
        
        .preview-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          padding: 20px;
        }
        .preview-modal.active { display: flex; align-items: center; justify-content: center; }
        .preview-content {
          background: #1a0b2e;
          border: 1px solid rgba(167, 139, 250, 0.3);
          border-radius: 12px;
          width: 90%;
          max-width: 1400px;
          height: 90vh;
          display: flex;
          flex-direction: column;
        }
        .preview-header {
          padding: 20px;
          border-bottom: 1px solid rgba(167, 139, 250, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .preview-title { font-size: 1.2rem; color: #fff; }
        .preview-close {
          background: rgba(167, 139, 250, 0.2);
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        }
        .preview-close:hover { background: rgba(167, 139, 250, 0.3); }
        .preview-iframe {
          flex: 1;
          border: none;
          border-radius: 0 0 12px 12px;
        }
      `}</style>

      <div className="container">
        <h1>🌟 North Star Astro - Site Map</h1>
        <p className="subtitle">Complete visual representation • Live as of Feb 17, 2026</p>
        
        {/* Stats Overview */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">13</div>
            <div className="stat-label">Main Pages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">90</div>
            <div className="stat-label">Blog Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">2026 Predictions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">44,809</div>
            <div className="stat-label">Words (Predictions)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Hub Pages</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">APIs</div>
          </div>
        </div>

        {/* Site Hierarchy Tree */}
        <div className="section">
          <h2 className="section-title">📂 Site Structure</h2>
          <div className="tree">
            <div className="tree-item level-0"><span className="tree-icon">🏠</span> northstarastro.com</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> Homepage (waitlist form)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> /about (E-E-A-T page)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> /chat (Tara AI interface)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> /2026-astrology-predictions (hub)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> Hub Pages <span className="tree-count">(3 systems)</span></div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> /western-astrology</div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> /vedic-astrology</div>
            <div className="tree-item level-2"><span className="tree-icon">└─</span> /numerology</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> /life-path-calculator (interactive tool)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> /blog <span className="tree-count">(90 posts)</span></div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> Western astrology (52 posts)</div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> Vedic astrology (13 posts)</div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> Numerology (8 posts)</div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> Integration (5 posts)</div>
            <div className="tree-item level-2"><span className="tree-icon">└─</span> 2026 Predictions (12 posts, 44,809 words)</div>
            <div className="tree-item level-1"><span className="tree-icon">├─</span> API Routes</div>
            <div className="tree-item level-2"><span className="tree-icon">├─</span> /api/chat (Tara backend)</div>
            <div className="tree-item level-2"><span className="tree-icon">└─</span> /api/waitlist (form handler)</div>
            <div className="tree-item level-1"><span className="tree-icon">└─</span> /feed.xml (RSS)</div>
          </div>
        </div>

        {/* Main Pages */}
        <div className="section">
          <h2 className="section-title">🏠 Main Pages</h2>
          <div className="page-grid">
            <div className="page-card" onClick={() => window.open('https://northstarastro.com', '_blank')}>
              <h3>Homepage</h3>
              <div className="url">northstarastro.com</div>
              <div className="description">Hero, triple-system value prop, waitlist form (email → birth details), recent blog posts</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-seo">Waitlist Form</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/about', '_blank')}>
              <h3>About</h3>
              <div className="url">/about</div>
              <div className="description">E-E-A-T content, triple-system philosophy (Western + Vedic + Numerology), expertise claims</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-seo">E-E-A-T</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/chat', '_blank')}>
              <h3>Tara AI Chat</h3>
              <div className="url">/chat</div>
              <div className="description">Birth form (name, date, time, location) → live AI chat with Tara (astrology agent)</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-api">Needs API Key</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/2026-astrology-predictions', '_blank')}>
              <h3>2026 Astrology Predictions Hub</h3>
              <div className="url">/2026-astrology-predictions</div>
              <div className="description">Overview of 2026 transits (Neptune in Aries, eclipses, Mercury Rx) + links to all 12 sign pages</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-hub">Hub Page</span>
              <span className="badge badge-seo">3,500 words</span>
            </div>
          </div>
        </div>

        {/* Hub Pages */}
        <div className="section">
          <h2 className="section-title">🌟 System Hub Pages</h2>
          <div className="page-grid">
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/western-astrology', '_blank')}>
              <h3>Western Astrology Hub</h3>
              <div className="url">/western-astrology</div>
              <div className="description">Tropical zodiac explainer, 12 signs grid, core concepts, featured articles, Western vs Vedic comparison</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-hub">Hub</span>
              <span className="badge badge-seo">Internal Links</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/vedic-astrology', '_blank')}>
              <h3>Vedic Astrology Hub</h3>
              <div className="url">/vedic-astrology</div>
              <div className="description">Sidereal zodiac explainer, nakshatras, dashas, featured Vedic articles</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-hub">Hub</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/numerology', '_blank')}>
              <h3>Numerology Hub</h3>
              <div className="url">/numerology</div>
              <div className="description">Life path numbers, master numbers, expression/soul urge, featured numerology articles</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-hub">Hub</span>
            </div>
            
            <div className="page-card" onClick={() => window.open('https://northstarastro.com/life-path-calculator', '_blank')}>
              <h3>Life Path Calculator</h3>
              <div className="url">/life-path-calculator</div>
              <div className="description">Interactive calculator for numerology life path number (birth date → calculation + interpretation)</div>
              <span className="badge badge-live">LIVE</span>
              <span className="badge badge-seo">Tool Page</span>
            </div>
          </div>
        </div>

        {/* 2026 Predictions */}
        <div className="section">
          <h2 className="section-title">🔮 2026 Zodiac Predictions (12 Pages)</h2>
          <div className="page-grid">
            {[
              { name: 'Aries', words: '4,600', desc: 'Neptune opposition (challenging), Mars year-long stay' },
              { name: 'Taurus', words: '3,282', desc: 'Uranus exits after 7 years, Saturn trine (stability)' },
              { name: 'Gemini', words: '3,829', desc: 'Uranus enters in July (revolution begins)' },
              { name: 'Cancer', words: '3,374', desc: 'Neptune square (fog + growth), Jupiter amplifies' },
              { name: 'Leo', words: '3,803', desc: 'Jupiter in Leo (second half), eclipses on Leo-Aquarius axis' },
              { name: 'Virgo', words: '3,365', desc: 'Eclipses on Virgo-Pisces axis (identity renewal)' },
              { name: 'Libra', words: '4,049', desc: 'Neptune opposition, relationship revelations' },
              { name: 'Scorpio', words: '3,875', desc: 'Uranus trine (transformation + stability)' },
              { name: 'Sagittarius', words: '3,714', desc: 'Neptune trine (creative awakening, harmonious)' },
              { name: 'Capricorn', words: '3,960', desc: 'Neptune square (dissolving control), Saturn lessons' },
              { name: 'Aquarius', words: '3,633', desc: 'Eclipses on Aquarius-Leo axis (MAJOR), Neptune sextile' },
              { name: 'Pisces', words: '3,307', desc: 'Neptune LEAVES Pisces after 14 years (biggest story)' },
            ].map((sign) => (
              <div 
                key={sign.name}
                className="page-card" 
                onClick={() => window.open(`https://northstarastro.com/blog/${sign.name.toLowerCase()}-2026-predictions`, '_blank')}
              >
                <h3>{sign.name} 2026</h3>
                <div className="url">/blog/{sign.name.toLowerCase()}-2026-predictions</div>
                <div className="description">{sign.desc}</div>
                <span className="badge badge-live">LIVE</span>
                <span className="badge badge-seo">{sign.words} words</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Summary */}
        <div className="section">
          <h2 className="section-title">📝 Blog Content Breakdown</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>Western Astrology Posts</h3>
              <div className="url">52 articles</div>
              <div className="description">Birth charts, moon signs, rising signs, Saturn return, Mercury Rx, houses, aspects, planets, compatibility</div>
              <span className="badge badge-blog">Core Content</span>
            </div>
            
            <div className="page-card">
              <h3>Vedic Astrology Posts</h3>
              <div className="url">13 articles</div>
              <div className="description">Nakshatras, dashas, Sade Sati, kundali, Rahu-Ketu, Manglik dosha, sidereal vs tropical</div>
              <span className="badge badge-blog">Vedic Focus</span>
            </div>
            
            <div className="page-card">
              <h3>Numerology Posts</h3>
              <div className="url">8 articles</div>
              <div className="description">Life path, master numbers (11, 22, 33), expression, soul urge, personal year, karmic debt</div>
              <span className="badge badge-blog">Numbers</span>
            </div>
            
            <div className="page-card">
              <h3>Integration Posts</h3>
              <div className="url">5 articles</div>
              <div className="description">Combined Western + Vedic + Numerology readings, cross-system compatibility, timing events</div>
              <span className="badge badge-blog">Unique</span>
            </div>
            
            <div className="page-card">
              <h3>2026 Predictions</h3>
              <div className="url">12 articles</div>
              <div className="description">All 12 zodiac signs, 44,809 total words, month-by-month forecasts, Neptune in Aries focus</div>
              <span className="badge badge-blog">SEO Goldmine</span>
              <span className="badge badge-seo">High Volume</span>
            </div>
          </div>
        </div>

        {/* APIs */}
        <div className="section">
          <h2 className="section-title">⚡ API Routes</h2>
          <div className="page-grid">
            <div className="page-card">
              <h3>Chat API</h3>
              <div className="url">POST /api/chat</div>
              <div className="description">Direct Claude API integration for Tara chat interface. Requires Anthropic API key.</div>
              <span className="badge badge-api">Backend</span>
              <span className="badge badge-seo">Needs Key</span>
            </div>
            
            <div className="page-card">
              <h3>Waitlist API</h3>
              <div className="url">POST /api/waitlist</div>
              <div className="description">Supabase integration for email + birth details storage. Two-step form (email → details).</div>
              <span className="badge badge-api">Backend</span>
              <span className="badge badge-live">WORKING</span>
            </div>
            
            <div className="page-card">
              <h3>RSS Feed</h3>
              <div className="url">GET /feed.xml</div>
              <div className="description">Auto-generated RSS feed for all blog posts. Dynamic XML generation.</div>
              <span className="badge badge-api">Feed</span>
              <span className="badge badge-live">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
