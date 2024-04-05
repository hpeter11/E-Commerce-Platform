import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { searchProducts } from '../../services/Api';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchProducts(searchQuery);
      onSearch(results);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <Form onSubmit={handleSearch} inline>
      <FormControl
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;