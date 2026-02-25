import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FREE_DAILY_LIMIT = 10;

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      );
    }

    // Get user info
    const { data: user, error: userError } = await supabase
      .from('snapreplies_users')
      .select('id, is_premium')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If premium, always allow
    if (user.is_premium) {
      // Still track usage for analytics
      await incrementUsage(userId);
      return NextResponse.json({
        allowed: true,
        isPremium: true,
        used: -1, // unlimited
        remaining: -1,
        limit: -1
      });
    }

    // Get today's usage
    const today = new Date().toISOString().split('T')[0];
    const { data: usage } = await supabase
      .from('snapreplies_usage')
      .select('reply_count')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    const currentCount = usage?.reply_count || 0;

    // Check if limit reached
    if (currentCount >= FREE_DAILY_LIMIT) {
      return NextResponse.json({
        allowed: false,
        isPremium: false,
        used: currentCount,
        remaining: 0,
        limit: FREE_DAILY_LIMIT
      });
    }

    // Increment usage
    const newCount = await incrementUsage(userId);

    return NextResponse.json({
      allowed: true,
      isPremium: false,
      used: newCount,
      remaining: FREE_DAILY_LIMIT - newCount,
      limit: FREE_DAILY_LIMIT
    });

  } catch (error) {
    console.error('Use error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function incrementUsage(userId: string): Promise<number> {
  const today = new Date().toISOString().split('T')[0];

  // Try to increment existing record
  const { data: existing } = await supabase
    .from('snapreplies_usage')
    .select('id, reply_count')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (existing) {
    const newCount = existing.reply_count + 1;
    await supabase
      .from('snapreplies_usage')
      .update({ reply_count: newCount })
      .eq('id', existing.id);
    return newCount;
  }

  // Create new record for today
  await supabase
    .from('snapreplies_usage')
    .insert({
      user_id: userId,
      date: today,
      reply_count: 1
    });

  return 1;
}

// GET endpoint to check status without incrementing
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId required' },
        { status: 400 }
      );
    }

    // Get user info
    const { data: user } = await supabase
      .from('snapreplies_users')
      .select('id, is_premium')
      .eq('id', userId)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.is_premium) {
      return NextResponse.json({
        isPremium: true,
        used: -1,
        remaining: -1,
        limit: -1
      });
    }

    // Get today's usage
    const today = new Date().toISOString().split('T')[0];
    const { data: usage } = await supabase
      .from('snapreplies_usage')
      .select('reply_count')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    const currentCount = usage?.reply_count || 0;

    return NextResponse.json({
      isPremium: false,
      used: currentCount,
      remaining: FREE_DAILY_LIMIT - currentCount,
      limit: FREE_DAILY_LIMIT
    });

  } catch (error) {
    console.error('Status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
