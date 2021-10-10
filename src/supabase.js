import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvxtnhawypcwdyffjisb.supabase.co'
const supabaseAnonKey = import.meta.env.VUE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)