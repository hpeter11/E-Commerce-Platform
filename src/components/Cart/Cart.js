import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './Cart.css';

// Component that handles cart logic 
const Cart = ({ cart, updateCart, removeFromCart }) => {
  return (
    <div className="cart-body">
      <ListGroup aria-label="Cart Items">
        {cart.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex align-items-center" aria-label={`${item.title} - Quantity: ${item.quantity}`}>

            {/* Create a list of items in the cart and format them accordingly: */}
            <img
              src={item.thumbnail}
              alt={`${item.title} product`}
              style={{ maxHeight: '50px', marginRight: '10px' }}
            />
            <div>
              <span aria-label={`${item.title} item`}>{item.title}</span>
              <div>
                {/* Buttons to increase and decrease cart items */}
                <Button
                  variant="outline-secondary"
                  onClick={() => updateCart(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  aria-label={`Decrease ${item.title} quantity`}
                >
                  -
                </Button>
                <span className="mx-2" aria-label={`${item.title} quantity: ${item.quantity}`}>
                  {item.quantity}
                </span>
                <Button
                  variant="outline-secondary"
                  onClick={() => updateCart(item, item.quantity + 1)}
                  aria-label={`Increase ${item.title} quantity`}
                >
                  +
                </Button>
                <Button
                  variant="outline-danger"
                  className="ml-2"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
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