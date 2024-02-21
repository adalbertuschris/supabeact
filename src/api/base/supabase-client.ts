import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.VT_REACT_APP_SUPABASE_URL,
  process.env.VT_REACT_APP_SUPABASE_KEY
);
