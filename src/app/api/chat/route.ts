// Tara chat API - connects to OpenClaw gateway via Cloudflare Tunnel
import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Tunnel URL (update if tunnel restarts)
const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'https://consortium-permissions-admissions-winston.trycloudflare.com';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || 'afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055';
const TARA_AGENT_ID = 'astro';

interface ChatRequest {
  message: string;
  phone?: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, phone, conversationHistory = [] } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build OpenAI-compatible messages array
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ];

    // Call OpenClaw Gateway using OpenAI-compatible endpoint
    const openclawResponse = await fetch(`${OPENCLAW_ENDPOINT}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENCLAW_TOKEN}`,
        'x-openclaw-agent-id': TARA_AGENT_ID,
      },
      body: JSON.stringify({
        model: `openclaw:${TARA_AGENT_ID}`,
        messages: messages,
        max_tokens: 1024,
        // Use phone number for session persistence if provided
        ...(phone && { user: phone }),
      }),
    });

    if (!openclawResponse.ok) {
      const errorText = await openclawResponse.text();
      console.error('OpenClaw API error:', errorText);
      throw new Error(`OpenClaw API returned ${openclawResponse.status}: ${errorText}`);
    }

    const data = await openclawResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Unable to generate response';

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
