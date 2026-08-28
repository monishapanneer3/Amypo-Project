import { useState, useEffect, useCallback } from "react";

/**
 * useFetch
 * Central hook used across the app to manage `loading` and `data` states
 * consistently for any data-fetching component.
 *
 * @param {Function} fetcher - async function that resolves with data
 * @param {Array} deps - dependency array controlling re-fetch
 * @returns {{ loading: boolean, data: any, error: any, refetch: Function }}
 */
const useFetch = (fetcher, deps = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    Promise.resolve()
      .then(() => fetcher())
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    const cancel = load();
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { loading, data, error, refetch: load };
};

export default useFetch;
