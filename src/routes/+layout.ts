import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createClient } from '@supabase/supabase-js'
import type { LayoutLoad } from "./$types"

// Create the client session with Supabase  
export const load: LayoutLoad = async ({ fetch, depends }) => {
    depends('supabase:auth')

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch
        }
    });

    return { supabase }
}
