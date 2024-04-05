import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter'; // Import the CategoryFilter component
import { fetchProducts } from './services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        setFilteredProducts(data); // Set initial filtered products to all products
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
      <Row className="my-4">
        <Col>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col>
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ProductList products={filteredProducts} addToCart={addToCart} />
        </Col>
        <Col md={4}>
          <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

