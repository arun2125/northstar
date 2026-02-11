-- Dashboard Tables for North Star Astro
-- Run this in Supabase SQL Editor (one-time setup)

-- Tasks table (kanban board)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('backlog', 'this_week', 'in_progress', 'done')),
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('product', 'content', 'marketing', 'admin', 'general')),
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  due_date DATE
);

-- Activity log (auto-tracked work)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  details JSONB,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'jarvis', 'cron', 'system')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Metrics snapshots (daily tracking)
CREATE TABLE IF NOT EXISTS metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, metric_name)
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for now - dashboard is password protected at app level)
CREATE POLICY "Allow all for tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for activity_log" ON activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for metrics" ON metrics FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_metrics_date ON metrics(date DESC);

-- Insert some initial tasks based on our current plan
INSERT INTO tasks (title, description, status, category, priority) VALUES
  ('Build birth chart parser', 'Swiss Ephemeris or API integration for calculating natal charts', 'this_week', 'product', 1),
  ('Build chat interface', 'Next.js + Claude API for AI astrology chat', 'backlog', 'product', 2),
  ('Get to 100 waitlist signups', 'Organic + engagement farming', 'this_week', 'marketing', 1),
  ('Cross-post birth chart blog to Medium', 'With canonical link back to site', 'this_week', 'content', 3),
  ('Create Saturn Return blog post', 'Emotional, targets 27-30 year olds', 'backlog', 'content', 2),
  ('Create thread version of birth chart post', 'For X/Twitter distribution', 'backlog', 'content', 3),
  ('Daily engagement routine', 'Twitter replies, Reddit answers, FB groups', 'in_progress', 'marketing', 1),
  ('Seed r/AI_Astro with 3 posts', 'Welcome post, discussion, resource list', 'this_week', 'marketing', 2),
  ('Set up Google Search Console', 'Submit sitemap, track indexing', 'backlog', 'marketing', 4),
  ('Create 10 programmatic SEO pages', 'Sun sign pages (/sun-in-aries etc)', 'backlog', 'content', 3)
ON CONFLICT DO NOTHING;

-- Log this setup
INSERT INTO activity_log (action, details, source) VALUES
  ('dashboard_setup', '{"message": "Dashboard tables created and initial tasks added"}', 'system');
