import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Simple password check - set DASHBOARD_PASSWORD in Vercel env vars
  const correctPassword = process.env.DASHBOARD_PASSWORD || 'northstar2026';
  
  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
