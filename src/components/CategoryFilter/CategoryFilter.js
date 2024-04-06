import React from 'react';
import { Form, FormLabel } from 'react-bootstrap';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="d-flex align-items-center">
      <FormLabel className="me-2">Filter:</FormLabel>
      <Form.Control as="select" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
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