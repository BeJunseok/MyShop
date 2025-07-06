import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const triggerSearch = () => {
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") triggerSearch();
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="상품 검색"
        className="w-64 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
      />
      <button
        onClick={triggerSearch}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
      >
        검색
      </button>
    </div>
  );
}
