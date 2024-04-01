import { useEffect, useState } from "react";

const CurrentWeather = ({ data, unit }) => {
  const { main, weather, name, sys } = data;
  console.log(weather);
  const [temperature, setTemperature] = useState({
    celsius: main.temp,
    fahrenheit: (main.temp * 9) / 5 + 32,
  });

  useEffect(() => {
    setTemperature({
      celsius: main.temp,
      fahrenheit: (main.temp * 9) / 5 + 32,
    });
  }, []);

  const convertTemperature = (value, currentUnit) => {
    if (currentUnit === "metric") {
      return value.celsius;
    } else {
      return value.fahrenheit;
    }
  };
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  // Function to determine background color based on weather description
  const getBackgroundColor = (description) => {
    if (description.includes("clear")) {
      return "bg-blue-300"; // Define your own class for clear weather
    } else if (description.includes("clouds")) {
      return "bg-gray-800 text-white"; // Define your own class for cloudy weather
    } else if (
      description.includes("rain") ||
      description.includes("drizzle")
    ) {
      return "bg-gray-300"; // Define your own class for rainy weather
    } else if (description.includes("haze")) {
      return "bg-gray-500"; // Define your own class for snowy weather
    } else {
      return "bg-black text-white"; // Default background color
    }
  };
  return (
    <div
      className={`text-center p-5 transition-transform transform hover:scale-110 ${getBackgroundColor(
        weather[0].description
      )}`}
    >
      <h2 className="text-2xl font-bold">
        {name}, {sys.country}
      </h2>
      <div className="flex items-center justify-center gap-4">
        <div className="text-lg">{currentDate}</div>
        <div className="text-lg">{currentTime}</div>
      </div>
      <div className="text-xl">
        Temp: {Math.round(convertTemperature(temperature, unit))}
        {unit === "metric" ? "°C" : "°F"}
      </div>
      <div className="text-lg capitalize">
        Condition: {weather[0].description}
      </div>
      <div>Humidity: {main.humidity}%</div>
    </div>
  );
};

export default CurrentWeather;
