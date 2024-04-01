import { useEffect, useState } from "react";

const CurrentWeather = ({ data, unit }) => {
  const { main, weather, name, sys } = data;
  // console.log(main);
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

  return (
    <div className="text-center bg-blue-300 p-5 transition-transform transform hover:scale-110">
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
