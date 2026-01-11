import { useState, useEffect } from "react";

export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const executeFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useMultipleFetch(fetchFunctions) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const executeFetches = async () => {
      if (fetchFunctions.length === 0) {
        if (isMounted) {
          setLoading(false);
          setData([]);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(fetchFunctions.map((fn) => fn()));
        if (isMounted) {
          setData(results);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    executeFetches();

    return () => {
      isMounted = false;
    };
  }, [fetchFunctions.length]);

  const refetch = async () => {
    if (fetchFunctions.length === 0) {
      setLoading(false);
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await Promise.all(fetchFunctions.map((fn) => fn()));
      setData(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
