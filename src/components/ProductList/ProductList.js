import React from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';

const ProductList = ({ products, addToCart }) => {
  return (
    <Container className="pt-5 mt-5">
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="product-card">
  <div className="product-card-image-container">
    <Card.Img
      variant="top"
      src={product.thumbnail}
      alt={product.title}
      aria-label={`Image of ${product.title}`}
      style={{ maxHeight: '200px', objectFit: 'contain' }}
      className="product-card-image"
    />
  </div>
  <Card.Body className="product-card-body">
    <Card.Title className="product-card-title">{product.title}</Card.Title>
    <Card.Text className="product-card-price">${product.price}</Card.Text>
    <Button variant="primary" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  </Card.Body>
  <Card.Footer className="product-card-footer">
    <small className="text-muted">{product.description}</small>
  </Card.Footer>
</Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;