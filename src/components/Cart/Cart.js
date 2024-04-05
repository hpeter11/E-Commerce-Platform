import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './Cart.css'

const Cart = ({ cart, updateCart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-item">
      <h4>Cart</h4>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <span>{item.title}</span>
              <div>
                <Button
                  variant="outline-secondary"
                  onClick={() => updateCart(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  onClick={() => updateCart(item, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="outline-danger"
                  className="ml-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="mt-3">
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default Cart;