import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for a city..."
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
        className="search-input"
      />
      <button type="submit" disabled={isLoading} className="search-button">
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
