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

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('priority', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const body = await request.json();
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      title: body.title,
      description: body.description || null,
      status: body.status || 'backlog',
      category: body.category || 'general',
      priority: body.priority || 0,
      due_date: body.due_date || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the activity
  await supabase.from('activity_log').insert([{
    action: `Task created: ${body.title}`,
    details: { task_id: data.id, category: body.category },
    source: 'manual',
  }]);

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const body = await request.json();
  
  const updates: Record<string, unknown> = {};
  if (body.status !== undefined) updates.status = body.status;
  if (body.title !== undefined) updates.title = body.title;
  if (body.description !== undefined) updates.description = body.description;
  if (body.category !== undefined) updates.category = body.category;
  if (body.priority !== undefined) updates.priority = body.priority;
  
  // If marking as done, set completed_at
  if (body.status === 'done') {
    updates.completed_at = new Date().toISOString();
  } else if (body.status && body.status !== 'done') {
    updates.completed_at = null;
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', body.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log status changes
  if (body.status) {
    await supabase.from('activity_log').insert([{
      action: `Task moved to ${body.status}: ${data.title}`,
      details: { task_id: body.id, new_status: body.status },
      source: 'manual',
    }]);
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  const body = await request.json();
  
  // Get task title for logging
  const { data: task } = await supabase
    .from('tasks')
    .select('title')
    .eq('id', body.id)
    .single();

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', body.id);

  if (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log the deletion
  await supabase.from('activity_log').insert([{
    action: `Task deleted: ${task?.title || 'Unknown'}`,
    details: { task_id: body.id },
    source: 'manual',
  }]);

  return NextResponse.json({ success: true });
}
