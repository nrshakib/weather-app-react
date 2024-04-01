import { useEffect, useState } from "react";

const WeatherForecast = ({ data, unit }) => {
  const { list } = data;
  //   const [temperatures, setTemperatures] = useState([]);
  const [filteredForecast, setFilteredForecast] = useState([]);

  useEffect(() => {
    const filteredData = list.filter((forecast, index) => index % 8 === 0); // Filter data to include every 8th forecast (24-hour gap)
    const convertedData = filteredData.map((forecast) => ({
      ...forecast,
      temperature: {
        celsius: forecast.main.temp,
        fahrenheit: (forecast.main.temp * 9) / 5 + 32,
      },
    }));
    setFilteredForecast(convertedData);
  }, [list]);

  const convertTemperature = (temperature) => {
    return unit === "metric" ? temperature.celsius : temperature.fahrenheit;
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

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredForecast.map((forecast, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-lg transition-transform transform hover:scale-110 ${getBackgroundColor(
              list[0].weather[0].main
            )}`}
          >
            <div>{new Date(forecast.dt * 1000).toLocaleDateString()}</div>
            <div>{new Date(forecast.dt * 1000).toLocaleTimeString()}</div>
            <div className="text-lg font-bold">
              {Math.round(convertTemperature(forecast.temperature))}
              {unit === "metric" ? "°C" : "°F"}
            </div>
            <div className="capitalize">{forecast.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
