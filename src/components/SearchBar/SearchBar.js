import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { searchProducts } from '../../services/Api';

// Component for the search bar
const SearchBar = ({ onSearch }) => {
  // State variable for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Fetch products based on search query
      const results = await searchProducts(searchQuery);
      // Callback function to handle search results
      onSearch(results);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex" aria-label="Search Products">
      {/* Input field for search query */}
      <FormControl
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="me-2"
        aria-label="Search Products Input"
      />
      {/* Button to trigger search */}
      <Button variant="primary" type="submit" aria-label="Search Products Button">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;