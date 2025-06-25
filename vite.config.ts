import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://ecndlukvrugaifdwatlo.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbmRsdWt2cnVnYWlmZHdhdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTAxMzAsImV4cCI6MjA2NDA4NjEzMH0.Z3u2iXrIZezjpWjtx4xfr0ay5J1dFHe4ohU-_VtPVsU'),
  },
});
