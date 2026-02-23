#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

let supabaseUrl, supabaseKey;

envContent.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
    supabaseUrl = line.split('=')[1].trim();
  }
  if (line.startsWith('SUPABASE_SERVICE_KEY=')) {
    supabaseKey = line.split('=')[1].trim();
  }
});

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function queryDailyLogData() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  try {
    // Query completed tasks
    const { data: completedTasks, error: tasksError } = await supabase
      .from('tasks')
      .select('task_name, category, completed_at')
      .eq('status', 'done')
      .gte('completed_at', `${today}T00:00:00`)
      .lt('completed_at', `${today}T23:59:59`)
      .order('category')
      .order('completed_at');

    if (tasksError) throw tasksError;

    // Query activity log
    const { data: activityLog, error: activityError } = await supabase
      .from('activity_log')
      .select('event_type, details, created_at')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`)
      .order('created_at');

    if (activityError) throw activityError;

    // Query this_week tasks for tomorrow
    const { data: thisWeekTasks, error: weekError } = await supabase
      .from('tasks')
      .select('task_name, category, priority')
      .eq('status', 'this_week')
      .order('priority', { ascending: false })
      .order('category');

    if (weekError) throw weekError;

    // Output as JSON
    console.log(JSON.stringify({
      date: today,
      completed_tasks: completedTasks || [],
      activity_log: activityLog || [],
      this_week_tasks: thisWeekTasks || []
    }, null, 2));

  } catch (error) {
    console.error('Error querying Supabase:', error);
    process.exit(1);
  }
}

queryDailyLogData();
