// Tara chat API - temporarily disabled during Cloudflare migration
// Will be re-enabled via Cloudflare Tunnel to OpenClaw gateway

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Chat is temporarily unavailable during migration. Check back soon!' },
    { status: 503 }
  );
}

export const runtime = 'edge';
