import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zpxsxnevjgbuelfezgaw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OxnefUPalFgsADvrauYywg_1ESxe-oY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);