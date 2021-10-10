import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'h'
const supabaseAnonKey = 'fuyyr76ru76r6r'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)