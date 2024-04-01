import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Your City..."
        className="w-full px-3 py-2 rounded-md bg-gray-300 text-black focus:outline-none focus:bg-gray-700 focus:text-white capitalize"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
