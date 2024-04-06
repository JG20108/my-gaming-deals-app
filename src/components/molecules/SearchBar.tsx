import React, { useState } from 'react';
import SearchInput from '../atoms/SearchInput';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
};

export default SearchBar;