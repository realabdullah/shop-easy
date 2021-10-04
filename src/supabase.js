import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvxtnhawypcwdyffjisb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzI3NzUzMSwiZXhwIjoxOTQ4ODUzNTMxfQ.7J_nqG-xYsZYRkr9ATPJRgStomrbG3QU_iquw2hLtes'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)