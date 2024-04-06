// CartContainer.js
import React from 'react';
import Cart from '../Cart/Cart';
import './CartContainer.css';

const CartContainer = ({ cart, updateCart, removeFromCart }) => {
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h4 className="cart-title" >Cart:</h4>
      </div>
      <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
      <div className="cart-total">
        <strong>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default CartContainer;