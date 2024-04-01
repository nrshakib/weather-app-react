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

  // Function to determine background color based on weather description
  const getBackgroundColor = (description) => {
    if (description.includes("clear")) {
      return "bg-blue-300";
    } else if (description.includes("clouds")) {
      return "bg-gray-600 text-white";
    } else if (
      description.includes("rain") ||
      description.includes("drizzle")
    ) {
      return "bg-gray-300";
    } else if (description.includes("haze")) {
      return "bg-gray-500";
    } else {
      return "bg-black text-white";
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
              list[0].weather[0].description
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
