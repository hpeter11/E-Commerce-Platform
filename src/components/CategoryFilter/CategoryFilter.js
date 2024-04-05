import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <Form.Group>
      <Form.Label>Filter by Category</Form.Label>
      <Form.Control as="select" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CategoryFilter;