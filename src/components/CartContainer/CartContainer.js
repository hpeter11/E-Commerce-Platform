import React from 'react';
import Cart from '../Cart/Cart';
import './CartContainer.css';

// Component to display the cart container
const CartContainer = ({ cart, updateCart, removeFromCart }) => {
  return (
    <div className="cart-container" aria-label="Cart">
      <div className="cart-header">
        <h4 className="cart-title">Cart:</h4>
        {/* Label for cart header */}
      </div>
      <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
      <div className="cart-total">
        <strong aria-label={`Total: $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`}>
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          {/* Logic to display cart total */}
        </strong>
      </div>
    </div>
  );
};

export default CartContainer;