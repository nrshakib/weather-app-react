// App.js
import { useState, useEffect } from "react";
import { getCurrentWeatherData, getForecastData } from "./assets/API/Api";
import SearchBar from "./assets/components/SearchBar";
import ToggleUnits from "./assets/components/ToggleUnits";
import CurrentWeather from "./assets/components/CurrentWeather";
import WeatherForecast from "./assets/components/WeatherForecast";

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [backgroundColor, setBackgroundColor] = useState("");
  // const [weatherHistory, setWeatherHistory] = useState([]);

  useEffect(() => {
    const defaultLocation = "Dhaka"; // Default location
    fetchWeather(defaultLocation);
  }, []);

  // useEffect(() => {
  //   const storedHistory = JSON.parse(localStorage.getItem("weatherHistory"));
  //   if (soredHistory) {
  //     setWeatherHistory(storedHistory);
  //   }
  // }, []);

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      const currentWeather = await getCurrentWeatherData(location, unit);
      const forecast = await getForecastData(location, unit);
      setCurrentWeatherData(currentWeather);
      setForecastData(forecast);
      setLoading(false);
      setBackgroundColor(getBackgroundColor(currentWeather.weather[0].main));
      addToWeatherHistory(currentWeather);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleToggleUnits = (newUnit) => {
    setUnit(newUnit);
    if (currentWeatherData) {
      fetchWeather(currentWeatherData.name);
    }
  };

  const getBackgroundColor = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "bg-blue-300"; // Light blue for clear skies
      case "Clouds":
        return "bg-gray-400"; // Gray for cloudy weather
      case "Rain":
        return "bg-gray-600"; // Dark gray for rain
      case "Thunderstorm":
        return "bg-gray-800"; // Darker gray for thunderstorms
      case "Snow":
        return "bg-white"; // White for snow
      default:
        return "bg-gray-100"; // Light gray for other conditions
    }
  };

  const addToWeatherHistory = (weatherData) => {
    // Add weather data to history
    const updatedHistory = [weatherData, ...weatherHistory.slice(0, 4)];
    setWeatherHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: backgroundColor }}>
      <div className="max-w-xl mx-auto px-4 py-8">
        <SearchBar onSearch={fetchWeather} />
        {loading && <div className="text-center mt-4">Loading...</div>}
        {/* {error && <div className="text-center mt-4">Error: {error}</div>} */}
        {currentWeatherData && (
          <CurrentWeather data={currentWeatherData} unit={unit} />
        )}
        <ToggleUnits unit={unit} onChange={handleToggleUnits} />
        {forecastData && <WeatherForecast data={forecastData} unit={unit} />}
        {/* <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Weather History</h2>
          <div className="flex gap-1">
            {weatherHistory.map((weather, index) => (
              <div key={index} className="bg-gray-400 p-4 rounded-md mb-2">
                <div>
                  {weather.name}, {weather.sys.country}
                </div>
                <div>{weather.weather[0].main}</div>
                <div>{new Date(weather.dt * 1000).toLocaleDateString()}</div>
                <div>{new Date(weather.dt * 1000).toLocaleTimeString()}</div>
                <div>{weather.main.temp}°C</div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;
