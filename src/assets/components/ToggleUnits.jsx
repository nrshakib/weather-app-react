const ToggleUnits = ({ unit, onChange }) => {
  let buttonText;
  if (unit === "metric") {
    buttonText = "Switch to Fahrenheit";
  } else if (unit === "imperial") {
    buttonText = "Switch to Celsius";
  }

  const handleToggle = () => {
    if (unit === "metric") {
      onChange("imperial");
    } else if (unit === "imperial") {
      onChange("metric");
    }
  };

  return (
    <div className="text-center mb-4 mt-2">
      <button
        onClick={handleToggle}
        className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ToggleUnits;
