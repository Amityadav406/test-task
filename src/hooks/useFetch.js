import React, { useState, useEffect } from "react";
import ENV from "../configs/env";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const useFetch = (url, options: {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const route_url = ENV.BASE_URL + url;
      setIsLoading(true);

      try {
        const res = await fetch(route_url, {
          ...options,
        });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { response, error, isLoading };
};
export default useFetch;
