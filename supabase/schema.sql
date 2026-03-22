-- Enable RLS
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS semester_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS recruitment_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS recruitment_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS team_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS corporate_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS videos ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Table (Students/Users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'Student',
  major TEXT,
  bio TEXT,
  tech_stack TEXT[],
  github_url TEXT,
  portfolio_url TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1-1. Semester Profiles Table (semester-scoped self introductions)
CREATE TABLE IF NOT EXISTS semester_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  semester_key TEXT NOT NULL,
  academic_year INTEGER NOT NULL,
  academic_term TEXT NOT NULL,
  course_track TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'Student',
  major TEXT,
  bio TEXT,
  tech_stack TEXT[],
  github_url TEXT,
  portfolio_url TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'LOOKING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, semester_key)
);

-- 2. Recruitment Posts Table
CREATE TABLE IF NOT EXISTS recruitment_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  semester_key TEXT,
  academic_year INTEGER,
  academic_term TEXT,
  course_track TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  recruiting_roles JSONB,
  status TEXT DEFAULT 'Recruiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2-1. Recruitment Post Comments Table
CREATE TABLE IF NOT EXISTS recruitment_post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES recruitment_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2-2. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  post_id UUID REFERENCES recruitment_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES recruitment_post_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Team Registrations Table
CREATE TABLE IF NOT EXISTS team_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_key TEXT,
  academic_year INTEGER,
  academic_term TEXT,
  course_track TEXT,
  team_name TEXT NOT NULL,
  project_item TEXT NOT NULL,
  members JSONB, -- Changed from TEXT[] to support {role, name} objects
  leader_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'Activities',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Corporate Proposals Table
CREATE TABLE IF NOT EXISTS corporate_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_key TEXT,
  academic_year INTEGER,
  academic_term TEXT,
  course_track TEXT,
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT[],
  deadline DATE,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE IF EXISTS recruitment_posts ADD COLUMN IF NOT EXISTS semester_key TEXT;
ALTER TABLE IF EXISTS recruitment_posts ADD COLUMN IF NOT EXISTS academic_year INTEGER;
ALTER TABLE IF EXISTS recruitment_posts ADD COLUMN IF NOT EXISTS academic_term TEXT;
ALTER TABLE IF EXISTS recruitment_posts ADD COLUMN IF NOT EXISTS course_track TEXT;

ALTER TABLE IF EXISTS team_registrations ADD COLUMN IF NOT EXISTS semester_key TEXT;
ALTER TABLE IF EXISTS team_registrations ADD COLUMN IF NOT EXISTS academic_year INTEGER;
ALTER TABLE IF EXISTS team_registrations ADD COLUMN IF NOT EXISTS academic_term TEXT;
ALTER TABLE IF EXISTS team_registrations ADD COLUMN IF NOT EXISTS course_track TEXT;

ALTER TABLE IF EXISTS corporate_proposals ADD COLUMN IF NOT EXISTS semester_key TEXT;
ALTER TABLE IF EXISTS corporate_proposals ADD COLUMN IF NOT EXISTS academic_year INTEGER;
ALTER TABLE IF EXISTS corporate_proposals ADD COLUMN IF NOT EXISTS academic_term TEXT;
ALTER TABLE IF EXISTS corporate_proposals ADD COLUMN IF NOT EXISTS course_track TEXT;

DROP POLICY IF EXISTS "Public Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Public Semester profiles are viewable by everyone" ON semester_profiles;
DROP POLICY IF EXISTS "Authenticated users can create semester profiles" ON semester_profiles;
DROP POLICY IF EXISTS "Users can update their own semester profiles" ON semester_profiles;
DROP POLICY IF EXISTS "Public Recruitment posts are viewable by everyone" ON recruitment_posts;
DROP POLICY IF EXISTS "Authenticated users can create recruitment posts" ON recruitment_posts;
DROP POLICY IF EXISTS "Public Recruitment post comments are viewable by everyone" ON recruitment_post_comments;
DROP POLICY IF EXISTS "Authenticated users can create recruitment post comments" ON recruitment_post_comments;
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Public Team registrations are viewable by everyone" ON team_registrations;
DROP POLICY IF EXISTS "Authenticated users can register teams" ON team_registrations;
DROP POLICY IF EXISTS "Public Corporate proposals are viewable by everyone" ON corporate_proposals;
DROP POLICY IF EXISTS "Public Videos are viewable by everyone" ON videos;

-- Basic RLS Policies (Public Read, Authenticated Write)
CREATE POLICY "Public Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public Semester profiles are viewable by everyone" ON semester_profiles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create semester profiles" ON semester_profiles FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);
CREATE POLICY "Users can update their own semester profiles" ON semester_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public Recruitment posts are viewable by everyone" ON recruitment_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create recruitment posts" ON recruitment_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public Recruitment post comments are viewable by everyone" ON recruitment_post_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create recruitment post comments" ON recruitment_post_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Authenticated users can create notifications" ON notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = actor_id);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = recipient_id);

CREATE POLICY "Public Team registrations are viewable by everyone" ON team_registrations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can register teams" ON team_registrations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public Corporate proposals are viewable by everyone" ON corporate_proposals FOR SELECT USING (true);
CREATE POLICY "Public Videos are viewable by everyone" ON videos FOR SELECT USING (true);
