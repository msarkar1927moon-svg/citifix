import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wslnltvmufoznwbqghbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbG5sdHZtdWZvem53YnFnaGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTQzMzIsImV4cCI6MjA3NzI5MDMzMn0.v6A_HKZtCxP5Jq73evaTPOD1IihIL84GPXn7XiVoN0A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);