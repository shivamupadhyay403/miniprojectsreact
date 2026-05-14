import React, { useEffect, useState } from "react";

const useFetch = (api, query = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    callApi(api, query);
  }, [api, query]);
  const callApi = async (api, query) => {
    const url = query ? `${api}?query=${encodeURIComponent(query)}` : api;
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetch(url);
      const responseData = await data.json();
      setData(responseData ?? []);
    } catch (err) {
      setError(err.response);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, data };
};

export default useFetch;
