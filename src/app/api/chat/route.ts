// Tara chat API - connects to OpenClaw gateway via Cloudflare Tunnel
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Cloudflare Tunnel URL (permanent, auto-starts on boot)
const OPENCLAW_ENDPOINT = process.env.OPENCLAW_ENDPOINT || 'https://api.northstarastro.com';
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || 'afa81a6209f36d3a6e352bd88cca60c8f9756ed68edbf055';
const TARA_AGENT_ID = 'astro';
const SESSION_COOKIE_NAME = 'astro_session_id';
const SESSION_TTL_HOURS = 2; // Session expires after 2 hours idle

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

    // Get or create session ID for session pooling
    const cookieStore = await cookies();
    let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    
    if (!sessionId) {
      // Create new session ID: use phone if available, otherwise generate unique ID
      sessionId = phone 
        ? `phone-${phone}` 
        : `web-${Date.now()}-${Math.random().toString(36).substring(7)}`;
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
        // Pass session ID for session pooling
        'x-openclaw-session-key': sessionId,
      },
      body: JSON.stringify({
        model: `openclaw:${TARA_AGENT_ID}`,
        messages: messages,
        max_tokens: 1024,
        // Use session ID as user identifier for session persistence
        user: sessionId,
      }),
    });

    if (!openclawResponse.ok) {
      const errorText = await openclawResponse.text();
      console.error('OpenClaw API error:', errorText);
      throw new Error(`OpenClaw API returned ${openclawResponse.status}: ${errorText}`);
    }

    const data = await openclawResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Unable to generate response';

    // Set session cookie for session pooling (2 hour expiry)
    const response = NextResponse.json({ reply });
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      maxAge: SESSION_TTL_HOURS * 60 * 60, // 2 hours in seconds
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
