import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvxtnhawypcwdyffjisb.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)