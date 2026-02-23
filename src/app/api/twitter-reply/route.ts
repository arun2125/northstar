// Twitter Reply Helper API - connects to OpenClaw gateway via Cloudflare Tunnel
import { NextRequest, NextResponse } from 'next/server';

// Same endpoint as Tara chat
const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'https://api.northstarastro.com';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || 'afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055';

interface TwitterReplyRequest {
  tweetText: string;
  username?: string;
  account?: string; // @northstar_astro or @angry_hanuman
}

export async function POST(request: NextRequest) {
  try {
    const body: TwitterReplyRequest = await request.json();
    const { tweetText, username, account } = body;

    if (!tweetText || tweetText.trim().length === 0) {
      return NextResponse.json(
        { success: false, reply: null, error: 'tweetText is required' },
        { status: 400 }
      );
    }

    // Build prompt for OpenClaw
    const personality = account === '@angry_hanuman' ? 'spicy' : 'helpful';
    const prompt = `Generate a Twitter reply to this tweet:

Tweet by ${username || 'someone'}:
"${tweetText}"

Personality: ${personality} (${account || '@northstar_astro'})
Style: Match ${account || '@northstar_astro'} brand voice

Rules:
- Max 280 characters
- On-brand and contextual
- Add value or humor
- No links
- Include emoji if appropriate

Reply:`;

    // Call OpenClaw Gateway
    const response = await fetch(`${OPENCLAW_ENDPOINT}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENCLAW_TOKEN}`
      },
      body: JSON.stringify({
        message: prompt,
        agentId: 'main', // Jarvis (main agent)
        sessionKey: `twitter-reply-${Date.now()}`, // One-shot session
        model: 'sonnet', // Fast model
        timeout: 30000 // 30 second timeout
      })
    });

    if (!response.ok) {
      console.error('OpenClaw API error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, reply: null, error: `Failed to generate reply: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.reply || data.message || '';

    if (!reply) {
      return NextResponse.json(
        { success: false, reply: null, error: 'No reply generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reply: reply.trim(),
      model: 'sonnet',
      tokens: reply.length * 0.25 // rough estimate
    });

  } catch (error) {
    console.error('Twitter reply API error:', error);
    return NextResponse.json(
      { success: false, reply: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Allow OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
