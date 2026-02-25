-- SnapReplies Freemium Tables
-- Run this in Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS snapreplies_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking table (daily data)
CREATE TABLE IF NOT EXISTS snapreplies_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES snapreplies_users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  reply_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_snapreplies_usage_user_date 
ON snapreplies_usage(user_id, date);

CREATE INDEX IF NOT EXISTS idx_snapreplies_users_email 
ON snapreplies_users(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
DROP TRIGGER IF EXISTS update_snapreplies_users_updated_at ON snapreplies_users;
CREATE TRIGGER update_snapreplies_users_updated_at
    BEFORE UPDATE ON snapreplies_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
