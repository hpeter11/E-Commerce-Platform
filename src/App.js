import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './components/ProductList/ProductList';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter'; 
import { fetchProducts } from './services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopBar.css';
import CartContainer from './components/CartContainer/CartContainer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); 
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (product, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    );
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

 
  const handleSearch = (results) => {
    setFilteredProducts(results);
  };

  const handleCategoryChange = (category) => {
    if (category) {
      const filteredByCategory = products.filter((product) => product.category === category);
      setFilteredProducts(filteredByCategory);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <Container fluid>
      <Row className="site-title-row">
        <Col xs={12}>
          <h1 className="site-title">Scott's E-Commerce Site</h1>
        </Col>
      </Row>
      <Row className="top-bar">
        <Col xs={4}>
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </Col>
        <Col xs={4}>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
        </Col>
      </Row>
      <Row className="mt-5">
  <Col md={{ span: 8, offset: 2 }} className="mt-5">
    <ProductList products={filteredProducts} addToCart={addToCart} />
  </Col>
  <CartContainer cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
</Row>
    </Container>
  );
};

export default App;

