import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_URL
const supabaseAnonKey = process.env.VUE_APP_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)