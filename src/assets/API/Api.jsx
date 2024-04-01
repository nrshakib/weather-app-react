const API_KEY = import.meta.env.VITE_WEATHER_APP;
// console.log(API_KEY);
const API_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeatherData = async (location, unit) => {
  const response = await fetch(
    `${API_URL}/weather?q=${location}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  const data = await response.json();
  return data;
};

export const getForecastData = async (location, unit) => {
  const response = await fetch(
    `${API_URL}/forecast?q=${location}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  const data = await response.json();
  return data;
};
