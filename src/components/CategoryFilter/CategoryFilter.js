import React from 'react';
import { Form, FormLabel } from 'react-bootstrap';

// Component for category filter
const CategoryFilter = ({ categories, onCategoryChange }) => {
  // Function to handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    // Callback function to handle category change
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="d-flex align-items-center" aria-label="Category Filter">
      <FormLabel className="me-2">Filter:</FormLabel>
      {/* Dropdown to select category */}
      <Form.Control
        as="select"
        onChange={handleCategoryChange}
        aria-label="Category Filter Select"
      >
        {/* Option to select all categories */}
        <option value="">All Categories</option>
        {/* Iterate over categories to display each category as an option */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Control>
    </div>
  );
};

export default CategoryFilter;
