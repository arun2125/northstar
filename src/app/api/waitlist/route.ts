import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Step 1: Capture email
export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, name, birthDate, birthTime, birthLocation, source } = body;

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
      // Update existing entry with new data if provided
      const updates: any = {};
      if (name) updates.name = name;
      if (birthDate) updates.birth_date = birthDate;
      if (birthTime) updates.birth_time = birthTime;
      if (birthLocation) updates.birth_place = birthLocation;
      if (source) updates.source = source;

      if (Object.keys(updates).length > 0) {
        await supabase
          .from('waitlist')
          .update(updates)
          .eq('email', email.toLowerCase());
      }

      return NextResponse.json({ success: true, message: 'Details updated!' });
    }

    // Insert new signup with all available data
    const { error } = await supabase.from('waitlist').insert({
      email: email.toLowerCase(),
      name: name || null,
      birth_date: birthDate || null,
      birth_time: birthTime || null,
      birth_place: birthLocation || null,
      source: source || 'unknown',
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email captured!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Step 2: Update with birth details
export async function PUT(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { email, birthDate, birthTime, birthPlace } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update existing entry with birth details
    const { error } = await supabase
      .from('waitlist')
      .update({
        birth_date: birthDate || null,
        birth_time: birthTime || null,
        birth_place: birthPlace || null,
      })
      .eq('email', email.toLowerCase());

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update details' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Profile complete!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const runtime = 'edge';
