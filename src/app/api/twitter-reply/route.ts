// Twitter Reply Helper API - connects to OpenClaw gateway via Cloudflare Tunnel
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'https://api.northstarastro.com';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || 'afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055';

interface TwitterReplyRequest {
  tweetText: string;
  tone?: string;
  model?: string; // 'tara', 'sonnet', 'opus'
  username?: string;
  account?: string;
}

const TONE_DESCRIPTIONS: Record<string, string> = {
  witty: 'Clever and humorous, quick wit, playful banter that makes people smile',
  educational: 'Informative and insightful, teaches something new, adds value',
  balanced: 'Thoughtful and measured, considers multiple perspectives, diplomatic',
  provoking: 'Bold and challenging, makes people think differently, spicy takes',
  supportive: 'Encouraging and positive, uplifts the conversation, warm',
  sarcastic: 'Sharp and ironic, subtle mockery with humor, deadpan delivery',
  savage: 'Brutal roast, no mercy but clever, makes people say DAMN'
};

export async function POST(request: NextRequest) {
  try {
    const body: TwitterReplyRequest = await request.json();
    const { tweetText, tone = 'balanced', model = 'sonnet', username, account } = body;

    if (!tweetText || tweetText.trim().length === 0) {
      return NextResponse.json(
        { success: false, reply: null, error: 'tweetText is required' },
        { status: 400 }
      );
    }

    const toneDescription = TONE_DESCRIPTIONS[tone] || TONE_DESCRIPTIONS.balanced;
    const personality = account === '@angry_hanuman' ? 'spicy Hindu mythology enthusiast' : 'astrology expert';
    
    const prompt = `Generate a Twitter reply to this tweet:

Tweet${username ? ` by ${username}` : ''}:
"${tweetText}"

Tone: ${tone.toUpperCase()} (${toneDescription})
Personality: ${personality} (${account || '@northstar_astro'})

Rules:
- Max 280 characters (STRICT)
- Match the ${tone} personality PERFECTLY
- On-brand and contextual
- Add value, humor, or insight
- NO links ever
- Include emoji if it fits the tone
- Be memorable

Reply (just the tweet text, nothing else):`;

    // Map model name to OpenClaw model
    const modelMap: Record<string, string> = {
      tara: 'sonnet', // Tara uses sonnet under the hood
      sonnet: 'sonnet',
      opus: 'opus'
    };
    const openclawModel = modelMap[model] || 'sonnet';

    // Call OpenClaw Gateway
    const response = await fetch(`${OPENCLAW_ENDPOINT}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENCLAW_TOKEN}`
      },
      body: JSON.stringify({
        message: prompt,
        agentId: 'main',
        sessionKey: `twitter-reply-${Date.now()}`,
        model: openclawModel,
        timeout: model === 'opus' ? 60000 : 30000 // Opus needs more time
      })
    });

    if (!response.ok) {
      console.error('OpenClaw API error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, reply: null, error: `API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let reply = data.reply || data.message || '';

    // Clean up reply - remove quotes if present
    reply = reply.trim().replace(/^["']|["']$/g, '');

    if (!reply) {
      return NextResponse.json(
        { success: false, reply: null, error: 'No reply generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reply: reply,
      model: model,
      tone: tone
    });

  } catch (error) {
    console.error('Twitter reply API error:', error);
    return NextResponse.json(
      { success: false, reply: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

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
