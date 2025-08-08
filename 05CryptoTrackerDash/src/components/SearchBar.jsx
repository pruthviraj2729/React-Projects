import React from 'react';

const SearchBar = ({ search, onSearchChange }) => (
  <input
    type="text"
    placeholder="Search by name or symbol..."
    className="mb-4 px-4 py-2 border rounded w-full"
    value={search}
    onChange={e => onSearchChange(e.target.value)}
  />
);

export default SearchBar;
