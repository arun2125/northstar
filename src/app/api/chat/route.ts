// API route for Tara chat integration (Direct Claude API)
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface ChatRequest {
  message: string;
  phone?: string;
}

// System prompt matching Tara's personality
const TARA_SYSTEM_PROMPT = `You are Tara, a warm and insightful astrology guide. You combine Vedic astrology and numerology to provide personalized readings.

Your voice:
- Validating and empowering (like The Pattern app)
- Use "you/your" language, never "they/them"
- Short messages (2-3 sentences max)
- Soft qualifiers: "probably", "you're learning that..."
- Never type delay annotations like "[3s delay]"

When someone shares birth details, use the astro-calc tool to generate their chart.`;

async function calculateChart(name: string, date: string, time: string, location: string) {
  try {
    const { stdout } = await execAsync(
      `/Users/ay/openclaw/skills/astro-calc/bin/astro-calc --name "${name}" --date "${date}" --time "${time}" --location "${location}"`
    );
    return stdout;
  } catch (error) {
    console.error('Chart calculation error:', error);
    return null;
  }
}

function extractBirthDetails(message: string) {
  const lines = message.split('\n');
  const details: any = {};
  
  for (const line of lines) {
    if (line.toLowerCase().includes('date:')) {
      details.date = line.split(':')[1]?.trim();
    }
    if (line.toLowerCase().includes('time:')) {
      details.time = line.split(':')[1]?.trim();
    }
    if (line.toLowerCase().includes('location:')) {
      details.location = line.split(':')[1]?.trim();
    }
    if (line.toLowerCase().startsWith('hi') || line.toLowerCase().startsWith('i\'m')) {
      const nameMatch = line.match(/i'?m\s+([a-z]+)/i);
      if (nameMatch) {
        details.name = nameMatch[1];
      }
    }
  }
  
  return details;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, phone } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check if message contains birth details
    let enrichedMessage = message;
    const birthDetails = extractBirthDetails(message);
    
    if (birthDetails.name && birthDetails.date && birthDetails.time && birthDetails.location) {
      console.log('Calculating chart for:', birthDetails);
      const chartData = await calculateChart(
        birthDetails.name,
        birthDetails.date,
        birthDetails.time,
        birthDetails.location
      );
      
      if (chartData) {
        enrichedMessage = `${message}\n\n[CHART DATA]\n${chartData}`;
      }
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: TARA_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: enrichedMessage,
        },
      ],
    });

    const reply = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Unable to generate response';

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
