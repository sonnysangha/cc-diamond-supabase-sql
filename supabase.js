import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fnwloyyiintkdxfygifr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const client = createClient(supabaseUrl, supabaseKey);

export default client;
