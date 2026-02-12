import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'North Star Astro';
  const description = searchParams.get('description') || 'AI-Powered Astrology';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a0a2e 0%, #16082a 50%, #0d0515 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Stars background effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 0, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 150, 0.15) 0%, transparent 50%)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            maxWidth: '1000px',
            textAlign: 'center',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              fontSize: '24px',
              color: 'rgba(192, 132, 252, 0.8)',
              letterSpacing: '0.2em',
            }}
          >
            ✦ NORTH STAR ASTRO ✦
          </div>
          
          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 50 ? '48px' : '56px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #c084fc 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.2,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          
          {/* Description */}
          {description && description !== 'AI-Powered Astrology' && (
            <div
              style={{
                display: 'flex',
                fontSize: '24px',
                color: 'rgba(216, 180, 254, 0.7)',
                maxWidth: '800px',
                lineHeight: 1.4,
              }}
            >
              {description.length > 120 ? description.substring(0, 117) + '...' : description}
            </div>
          )}
        </div>
        
        {/* Bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '18px',
            color: 'rgba(192, 132, 252, 0.5)',
          }}
        >
          northstarastro.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
