import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for fetching data from Sanity with automatic fallback to mock data.
 * 
 * @param fetcher - Async function that fetches data from Sanity
 * @param fallback - Mock/default data to use if Sanity fetch fails or returns null
 * @returns { data, loading, error }
 */
export function useSanityData<T>(
    fetcher: () => Promise<T | null>,
    fallback: T
): { data: T; loading: boolean; error: string | null } {
    const [data, setData] = useState<T>(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Memoize via useCallback to avoid re-creating on each render
    const stableFetcher = useCallback(fetcher, []);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const result = await stableFetcher();
                if (!cancelled) {
                    if (result !== null && result !== undefined) {
                        // Merge: use Sanity data but keep fallback values for fields Sanity doesn't have
                        if (typeof result === 'object' && !Array.isArray(result) && typeof fallback === 'object' && !Array.isArray(fallback)) {
                            setData({ ...fallback, ...result } as T);
                        } else {
                            setData(result);
                        }
                    }
                    // If result is null, we keep the fallback data
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[Sanity] Fetch error, using fallback data:', err);
                    setError(err instanceof Error ? err.message : 'Failed to fetch from Sanity');
                    // Keep fallback data on error
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, [stableFetcher]);

    return { data, loading, error };
}

/**
 * Hook for fetching array data from Sanity with automatic fallback.
 * Similar to useSanityData but specifically handles arrays,
 * falling back when the result is empty or null.
 */
export function useSanityArrayData<T>(
    fetcher: () => Promise<T[]>,
    fallback: T[]
): { data: T[]; loading: boolean; error: string | null } {
    const [data, setData] = useState<T[]>(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const stableFetcher = useCallback(fetcher, []);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const result = await stableFetcher();
                if (!cancelled) {
                    if (result && result.length > 0) {
                        setData(result);
                    }
                    // If result is empty, keep fallback
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[Sanity] Fetch error, using fallback data:', err);
                    setError(err instanceof Error ? err.message : 'Failed to fetch from Sanity');
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, [stableFetcher]);

    return { data, loading, error };
}
