import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('snapreplies_users')
      .select('id, is_premium')
      .eq('email', normalizedEmail)
      .single();

    if (existingUser) {
      // Return existing user
      return NextResponse.json({
        success: true,
        userId: existingUser.id,
        isPremium: existingUser.is_premium,
        isNew: false
      });
    }

    // Create new user
    const { data: newUser, error } = await supabase
      .from('snapreplies_users')
      .insert({ email: normalizedEmail })
      .select('id, is_premium')
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      userId: newUser.id,
      isPremium: newUser.is_premium,
      isNew: true
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
