import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, birthDate } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json({ error: 'You\'re already on the waitlist!' }, { status: 400 });
    }

    // Insert new signup - only email and birth_date
    const { error } = await supabase.from('waitlist').insert({
      email: email.toLowerCase(),
      birth_date: birthDate || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Welcome to the waitlist!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
