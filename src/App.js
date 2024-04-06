
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './components/ProductList/ProductList';
import SearchBar from './components/SearchBar/SearchBar';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import { fetchProducts } from './services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopBar.css';
import CartContainer from './components/CartContainer/CartContainer';

// Main component for da whole app
const App = () => {
  // State variables
  const [products, setProducts] = useState([]); // Holds all products
  const [cart, setCart] = useState([]); // Holds items added to cart
  const [filteredProducts, setFilteredProducts] = useState([]); // Holds products after filtering
  const [categories, setCategories] = useState([]); // Holds unique categories from products
  const [hoveredProduct, setHoveredProduct] = useState(''); // Tracks product being hovered over

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from API
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // First, filtered products are da same as all products
        // Get unique categories from products
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to update the quantity of a product in the cart
  const updateCart = (product, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    );
    // Remove items with quantity 0 from the cart
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Function to handle search results
  const handleSearch = (results) => {
    setFilteredProducts(results);
  };

  // Function to handle category filter
  const handleCategoryChange = (category) => {
    if (category) {
      // Filter products by selected category
      const filteredByCategory = products.filter((product) => product.category === category);
      setFilteredProducts(filteredByCategory);
    } else {
      // If no category is selected, show all da products
      setFilteredProducts(products);
    }
  };

  // Function to handle product hover
  const handleProductHover = (title) => {
    setHoveredProduct(title);
  };

  return (
    <Container fluid>
      {/* Site title overlaid */}
      <Row className="site-title-row">
        <Col xs={12}>
          <h1 className="site-title" aria-label="Scott's E-Commerce Site">
            Scott's E-Commerce Site
          </h1>
        </Col>
      </Row>
      {/* Top bar with category filter and search */}
      <Row className="top-bar">
        <Col xs={4}>
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </Col>
        <Col xs={4}>
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          {/* Additional elements can go here */}
        </Col>
      </Row>
      {/* Product list and cart */}
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }} className="mt-5">
          {/* Product list component */}
          <ProductList
            products={filteredProducts} // Pass filtered products to the product list
            addToCart={addToCart}
            onProductHover={handleProductHover}
            hoveredProduct={hoveredProduct}
          />
        </Col>
        {/* Cart container */}
        <CartContainer cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
      </Row>
    </Container>
  );
};

export default App;
