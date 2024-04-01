const ToggleUnits = ({ unit, onChange }) => {
  const handleToggle = () => {
    onChange(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="text-center mb-4">
      <button
        onClick={handleToggle}
        className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
      >
        {unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
    </div>
  );
};

export default ToggleUnits;
