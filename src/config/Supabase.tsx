import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.PUBLIC_KEY as string

const Supabase = createClient(supabaseUrl, supabaseKey)

export default Supabase