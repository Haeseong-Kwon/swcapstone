import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Safely initialize Supabase client
// If credentials are missing or placeholders, we log a warning instead of crashing
const isConfigured = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 0;

if (!isConfigured) {
  console.warn(
    'Supabase credentials are missing or invalid. Please check your .env.local file. ' +
    'The application will run in "disconnected" mode.'
  );
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
