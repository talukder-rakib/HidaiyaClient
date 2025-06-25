import { createClient } from '@supabase/supabase-js';

// Fallback for environments like Bolt.new that don't support import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ecndlukvrugaifdwatlo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbmRsdWt2cnVnYWlmZHdhdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTAxMzAsImV4cCI6MjA2NDA4NjEzMH0.Z3u2iXrIZezjpWjtx4xfr0ay5J1dFHe4ohU-_VtPVsU'; // your full anon key

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key must be provided in environment or fallback');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
