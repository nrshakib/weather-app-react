const CurrentWeather = ({ data, unit }) => {
  const { main, weather, name, sys } = data;
  const temperature = unit === "metric" ? main.temp : (main.temp * 9) / 5 + 32;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="text-center bg-blue-300 p-5">
      <h2 className="text-2xl font-bold">
        {name}, {sys.country}
      </h2>
      <div className="flex items-center justify-center gap-4">
        <div className="text-lg">{currentDate}</div>
        <div className="text-lg">{currentTime}</div>
      </div>
      <div className="text-xl">
        Temp: {Math.round(temperature)} {unit === "metric" ? "°C" : "°F"}
      </div>
      <div className="text-lg capitalize">
        Condition: {weather[0].description}
      </div>
      <div>Humidity: {main.humidity}%</div>
    </div>
  );
};

export default CurrentWeather;
