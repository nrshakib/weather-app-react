import { useEffect, useState } from "react";

const WeatherForecast = ({ data, unit }) => {
  const { list } = data;
  console.log(data);
  const [temperature, setTemperature] = useState({
    celsius: list[0].main.temp,
    fahrenheit: (list[0].main.temp * 9) / 5 + 32,
  });
  const [filteredForecast, setFilteredForecast] = useState([]);

  useEffect(() => {
    const filteredData = list.filter((forecast, index) => index % 8 === 0); // Filter data to include every 8th forecast (24-hour gap)
    const daysForecast = filteredData.slice(0, 5); // Include the next 5 forecasts
    setFilteredForecast(
      daysForecast.map((forecast) => ({
        ...forecast,
      }))
    );
    setTemperature({
      celsius: list[0].main.temp,
      fahrenheit: (list[0].main.temp * 9) / 5 + 32,
    });
  }, [list]);

  const convertTemperature = (temperature) => {
    let convertedTemp;
    if (unit === "metric") {
      convertedTemp = temperature.celsius;
    } else if (unit === "imperial") {
      convertedTemp = temperature.fahrenheit;
    }
    return convertedTemp;
  };

  const getBackgroundColor = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "bg-blue-300"; // Light blue for clear skies
      case "Clouds":
        return "bg-gray-400"; // Gray for cloudy weather
      case "Clear Sky":
        return "bg-blue-600"; // Dark gray for rain
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
      <h2 className="text-xl font-bold mb-4 text-center text-red-600 underline">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {filteredForecast.map((forecast, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-lg transition-transform transform hover:scale-110 hover:bg-gray-800 hover:text-white ${getBackgroundColor(
              list[0].weather[0].main
            )}`}
          >
            <div>
              Date:{" "}
              <span className="font-semibold">
                {new Date(forecast.dt * 1000).toLocaleDateString()}
              </span>
            </div>
            <div>
              Local Time:{" "}
              <span className="font-semibold">
                {new Date(forecast.dt * 1000).toLocaleTimeString()}
              </span>
            </div>
            <div>
              Temp:{" "}
              <span className="text-lg font-bold">
                {Math.round(convertTemperature(temperature, unit))}
                {unit === "metric" ? "°C" : "°F"}
              </span>
            </div>
            <div className="capitalize">
              Condition:{" "}
              <span className="text-lg font-semibold">
                {forecast.weather[0].description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
