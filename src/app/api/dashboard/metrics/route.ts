import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  // Get waitlist count
  const { count: waitlistCount } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  // Get tasks done this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const { count: tasksDoneThisWeek } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'done')
    .gte('completed_at', weekAgo.toISOString());

  // Get stored metrics (tweets, blogs, etc.)
  const { data: storedMetrics } = await supabase
    .from('metrics')
    .select('metric_name, value')
    .order('date', { ascending: false })
    .limit(10);

  // Build metrics object
  const metricsMap = storedMetrics?.reduce((acc, m) => {
    acc[m.metric_name] = m.value;
    return acc;
  }, {} as Record<string, number>) || {};

  return NextResponse.json({
    waitlist_count: waitlistCount || 0,
    tweets_this_week: metricsMap.tweets_this_week || 0,
    blogs_published: metricsMap.blogs_published || 1, // We have 1 blog post
    tasks_done_this_week: tasksDoneThisWeek || 0,
  });
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const body = await request.json();
  
  // Upsert metric (update if exists for today, insert if not)
  const { data, error } = await supabase
    .from('metrics')
    .upsert({
      date: new Date().toISOString().split('T')[0],
      metric_name: body.metric_name,
      value: body.value,
    }, {
      onConflict: 'date,metric_name',
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving metric:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
