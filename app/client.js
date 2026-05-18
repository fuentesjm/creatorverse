import { createClient } from '@supabase/supabase-js'

const URL = 'https://lpdgjjxlhwnkgfgukqfc.supabase.co'
const API_KEY = 'sb_publishable_F2gL2Wvg-Er3WInpJUAOrQ__k1_ahPW'
export const supabase = createClient(URL, API_KEY)