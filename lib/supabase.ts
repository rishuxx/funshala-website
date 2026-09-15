import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zimoxijdvqwnrzqfjlhe.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbW94aWpkdnF3bnJ6cWZqbGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjczNTksImV4cCI6MjEwNTA0MzM1OX0.RvM-7KElddjTP_OYgOEA7HrXO87vAjNq8CaTOyXR5_U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
