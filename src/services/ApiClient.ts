const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const headers = {
    apikey: SUPABASE_API_KEY,
    Authorization: `Bearer ${ SUPABASE_API_KEY }`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

export const supabaseFetch = async (path: string, options: RequestInit = {}) => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
        headers,
        ...options,
    });

    if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || 'Fetch Error');
    }

    return res.json();
};