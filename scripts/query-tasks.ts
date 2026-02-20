import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function queryTasks() {
  const today = new Date().toISOString().split('T')[0];
  
  // Get completed tasks for today
  const { data: completed, error: completedError } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'done')
    .gte('completed_at', `${today}T00:00:00`)
    .lte('completed_at', `${today}T23:59:59`)
    .order('completed_at', { ascending: false });

  if (completedError) {
    console.error('Error fetching completed tasks:', completedError);
  } else {
    console.log('COMPLETED_TASKS:', JSON.stringify(completed || [], null, 2));
  }

  // Get activity log for today
  const { data: activity, error: activityError } = await supabase
    .from('activity_log')
    .select('*')
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`)
    .order('created_at', { ascending: false });

  if (activityError) {
    console.error('Error fetching activity log:', activityError);
  } else {
    console.log('ACTIVITY_LOG:', JSON.stringify(activity || [], null, 2));
  }

  // Get this_week tasks for tomorrow
  const { data: thisWeek, error: thisWeekError } = await supabase
    .from('tasks')
    .eq('status', 'this_week')
    .order('created_at', { ascending: true })
    .limit(10);

  if (thisWeekError) {
    console.error('Error fetching this_week tasks:', thisWeekError);
  } else {
    console.log('THIS_WEEK_TASKS:', JSON.stringify(thisWeek || [], null, 2));
  }
}

queryTasks().catch(console.error);
