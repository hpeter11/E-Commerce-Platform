import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './Cart.css';

const Cart = ({ cart, updateCart, removeFromCart }) => {
  return (
    <div className="cart-body">
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center">
            <img src={item.thumbnail} alt={item.title} style={{ maxHeight: '50px', marginRight: '10px' }} />
            <div>
              <span>{item.title}</span>
              <div>
                <Button variant="outline-secondary" onClick={() => updateCart(item, item.quantity - 1)} disabled={item.quantity === 1}>
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline-secondary" onClick={() => updateCart(item, item.quantity + 1)}>
                  +
                </Button>
                <Button variant="outline-danger" className="ml-2" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cart;