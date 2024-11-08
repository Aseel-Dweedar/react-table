import { useState, useCallback } from "react";

const useAPI = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiCall = useCallback(async (link, method, body) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/${link}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
      });
      const json = await res.json();
      setLoading(false);
      return { data: json };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { error: err.message };
    }
  }, []);

  return { apiCall, error, loading };
};

export { useAPI };
