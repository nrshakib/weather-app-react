const WeatherForecast = ({ data, unit }) => {
  const { list } = data;

  // Filter forecast data to include only forecasts with a difference of 24 hours
  const filteredForecast = list.filter(
    (forecast, index) => index % 8 === 0 && index < 40
  );

  // Function to determine background color based on temperature
  const getBackgroundColor = (temperature) => {
    if (temperature < 0) {
      return "bg-blue-900";
    } else if (temperature < 10) {
      return "bg-blue-600";
    } else if (temperature < 20) {
      return "bg-green-500";
    } else if (temperature < 30) {
      return "bg-yellow-400";
    } else {
      return "bg-red-600";
    }
  };

  return (
    <div className="mt-8 transition-opacity duration-500 ease-in-out">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-4">
        {filteredForecast.map((forecast, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-md ${getBackgroundColor(
              Math.round(forecast.main.temp)
            )}`}
          >
            <div>{new Date(forecast.dt * 1000).toLocaleDateString()}</div>
            <div>{new Date(forecast.dt * 1000).toLocaleTimeString()}</div>
            <div>
              {Math.round(forecast.main.temp)} {unit === "metric" ? "°C" : "°F"}
            </div>
            <div className="capitalize">{forecast.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
