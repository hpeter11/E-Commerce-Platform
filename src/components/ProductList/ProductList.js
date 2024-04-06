import React from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';

// Component to display a list of products
const ProductList = ({ products, addToCart, onProductHover, hoveredProduct }) => {
  return (
    <Container className="pt-5 mt-5" aria-label="Product List">
      <Row>
        {/* Iterate over products to display each product card */}
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="product-card">
              {/* Product image */}
              <div className="product-card-image-container">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={`Image of ${product.title}`}
                  aria-label={`Image of ${product.title} product`}
                  onMouseOver={() => onProductHover(product.title)}
                  onMouseLeave={() => onProductHover('')}
                />
              </div>
              <Card.Body className="product-card-body">
                {/* Product title */}
                <Card.Title
                  className="product-card-title"
                  onMouseOver={() => onProductHover(product.title)}
                  onMouseLeave={() => onProductHover('')}
                  aria-label={hoveredProduct === product.title ? product.title : ''}
                >
                  {product.title}
                </Card.Title>
                {/* Product price */}
                <Card.Text className="product-card-price">${product.price}</Card.Text>
                {/* Button to add product to cart */}
                <Button
                  variant="primary"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </Button>
              </Card.Body>
              {/* Product description */}
              <Card.Footer className="product-card-footer">
                <small className="text-muted" aria-label={`${product.description}`}>
                  {product.description}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;