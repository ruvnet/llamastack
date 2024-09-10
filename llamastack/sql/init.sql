-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Drop existing view if it exists
DROP VIEW IF EXISTS public_profiles;

-- Create public_profiles view
CREATE VIEW public_profiles AS
  SELECT id, first_name, last_name, avatar_url
  FROM profiles;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_profile;

-- Create or replace function to update profile
CREATE OR REPLACE FUNCTION update_profile(
  user_id UUID,
  new_first_name TEXT,
  new_last_name TEXT,
  new_avatar_url TEXT,
  new_email TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET
    first_name = COALESCE(new_first_name, first_name),
    last_name = COALESCE(new_last_name, last_name),
    avatar_url = COALESCE(new_avatar_url, avatar_url),
    email = COALESCE(new_email, email),
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT SELECT ON public_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION update_profile TO authenticated;