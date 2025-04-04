import { useState, useEffect } from "react";

function useWeather(initialCity) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=ND7HTCCR9MZ6MNK4J3CXEPPQE&contentType=json`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(initialCity);
  }, [initialCity]);

  return { weather, loading, error, fetchWeather };
}

export default useWeather;
