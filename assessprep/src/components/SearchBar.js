import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px 20px; 
  border: none;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;

  &:focus {
    outline: 2px solid #66afeb;
  }

  &::placeholder {
    color: #999;
  }
  background-color: #f5f5f5;
  background-image: linear-gradient(to right, #f5f5f5 0%, #eee 100%);
`;

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mb-4">
      <StyledInput
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

//simple genric searchbar component with debounce
