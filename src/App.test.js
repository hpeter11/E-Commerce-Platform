import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Use jest to get rid of leakage
describe('App', () => {
  let originalError;
  beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  // Basic render test
  test('renders the site title', () => {
    render(<App />);
    const siteTitle = screen.getByText(/Scott's E-Commerce Site/i);
    expect(siteTitle).toBeInTheDocument();
  });

  // Tests product list appears 
  test('renders product list', async () => {
    render(<App />);
    const productCards = await screen.findAllByRole('img', { name: /image of/i });
    expect(productCards).not.toHaveLength(0);
  });

  // Test that cart feature works
  test('adds a product to cart', async () => {
    render(<App />);
    const addToCartButtons = await screen.findAllByLabelText(/Add .* to cart/i);
    const initialCartCount = screen.getByLabelText(/Total: \$/i).textContent;
    
    // Click the first add to cart button
    userEvent.click(addToCartButtons[0]);
    
    // Wait for the cart to update
    await waitFor(() => {
      const updatedCartCount = screen.getByLabelText(/Total: \$/i).textContent;
      expect(updatedCartCount).not.toEqual(initialCartCount);
    });
  });

  test('removes a product from cart', async () => {
    render(<App />);
    const addToCartButtons = await screen.findAllByLabelText(/Add .* to cart/i);
    const initialCartCount = screen.getByLabelText(/Total: \$/i).textContent;
    
    // Click the first add to cart button
    userEvent.click(addToCartButtons[0]);
    
    // Wait for the cart to update
    await waitFor(() => {
      const updatedCartCount = screen.getByLabelText(/Total: \$/i).textContent;
      expect(updatedCartCount).not.toEqual(initialCartCount);
    });

    const removeFromCartButtons = await screen.findAllByLabelText(/Remove .* from cart/i);
    const initialCartCountAfterAddition = screen.getByLabelText(/Total: \$/i).textContent;
    
    // Click the first remove from cart button
    userEvent.click(removeFromCartButtons[0]);
    
    // Wait for the cart to update
    await waitFor(() => {
      const updatedCartCountAfterRemoval = screen.getByLabelText(/Total: \$/i).textContent;
      expect(updatedCartCountAfterRemoval).not.toEqual(initialCartCountAfterAddition);
    });
  });

  // Test search works fine
  test('searches for products', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search products.../i);
    await act(async () => {
      userEvent.type(searchInput, 'example search term');
      userEvent.click(screen.getByLabelText(/Search Products Button/i));
    });
  });
});