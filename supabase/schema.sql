-- Enable RLS
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS recruitment_posts ENABLE ROW LEVEL SECURITY;
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

-- 2. Recruitment Posts Table
CREATE TABLE IF NOT EXISTS recruitment_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  recruiting_roles JSONB,
  status TEXT DEFAULT 'Recruiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Team Registrations Table
CREATE TABLE IF NOT EXISTS team_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Basic RLS Policies (Public Read, Authenticated Write)
CREATE POLICY "Public Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public Recruitment posts are viewable by everyone" ON recruitment_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create recruitment posts" ON recruitment_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public Team registrations are viewable by everyone" ON team_registrations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can register teams" ON team_registrations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public Corporate proposals are viewable by everyone" ON corporate_proposals FOR SELECT USING (true);
CREATE POLICY "Public Videos are viewable by everyone" ON videos FOR SELECT USING (true);
