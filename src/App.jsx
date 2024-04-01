import { useState } from "react";
import CurrentWeather from "./assets/components/CurrentWeather";
import SearchBar from "./assets/components/SearchBar";
import { getCurrentWeatherData } from "./assets/API/Api";

const App = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      const currentWeather = await getCurrentWeatherData(location, unit);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <SearchBar onSearch={fetchWeather}/>
      <CurrentWeather data={currentWeatherData} unit={unit} />
    </div>
  );
};

export default App;
