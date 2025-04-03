import { Box, Grid, Image, Text, Button, IconButton } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import "./Marketpage.css";
import { FiMenu } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { create } from "zustand";

// ✅ Zustand store (Define this OUTSIDE the component)
const useSidebarStore = create((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99.99",
    image: "https://via.placeholder.com/150",
    date: "2023-05-01",
    reviews: 200,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149.99",
    image: "https://via.placeholder.com/150",
    date: "2024-03-15",
    reviews: 50,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$49.99",
    image: "https://via.placeholder.com/150",
    date: "2025-11-22",
    reviews: 100,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$79.99",
    image: "https://via.placeholder.com/150",
    date: "2025-01-31",
    reviews: 150,
  },
];

const MarketPage = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();

  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortOption, setSortOption] = useState("");
  const [role, setRole] = useState("Buyer"); // Default role is Buyer

  const toggleRole = () => {
    setRole(role === "Buyer" ? "Seller" : "Buyer");
  };

  const handleSort = (option) => {
    let sortedArray = [...products];
    switch (option) {
      case "date":
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "reviews":
        sortedArray.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    setSortOption(option);
    setSortedProducts(sortedArray);
  };

  const SidebarToggle = () => {
    const { toggleSidebar } = useSidebarStore();
  
    return (
      <IconButton
        aria-label="Open Sidebar"
        icon={<FiMenu />}
        onClick={toggleSidebar}
        top={0}
        left={0}
        zIndex={1000}
        className="sidebar-toggle" 
      />
    );
  };
  

  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === "Escape") setShowSearchPopup(false);
    };
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, []);

  return (
    <>
    <Box className="marketnav">
      <SidebarToggle />

      <Text fontSize="2xl" fontWeight="bold" mb={4} className="market-header">
        Marketplace
      </Text>

      <Box className="desktop-links">
        <Link to="/" className="home-link">
          <FaHome size={22}/>
        </Link>

        <div className="cart-icon">
          <Link to="/cart" className="cart-link">
            <IoMdCart className="cart-svg" size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        <div className={`search ${showSearchPopup ? "active" : ""}`}>
          <button
            className="search-img"
            onClick={() => setShowSearchPopup(true)}
          >
            🔍
          </button>
        </div>
      </Box>
      </Box>


      <Box className="mobile">
        <div className={`search ${showSearchPopup ? "active" : ""}`}>
          <button
            className="search-icon-mobile"
            onClick={() => setShowSearchPopup(true)}
            style={{ marginRight: "40px" }}
          >
            🔍
          </button>
        </div>
      </Box>

      {/* Search Popup */}
      {showSearchPopup && (
        <>
          <div className="popup">
            <div
              className="search-overlay"
              onClick={() => setShowSearchPopup(false)}
            ></div>
            <div className="search-popup">
              <input type="text" placeholder="Search products..." />
              <div className="popup-btn">
                <button className="search-btn">Search 🔍</button>
                <button
                  className="close-btn"
                  onClick={() => setShowSearchPopup(false)}
                >
                  Close❌
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Box className="market-hero">
        <Text fontSize="2xl" fontWeight="bold" className="hero-header">
          Welcome to NJC Market Platform
        </Text>
      </Box>

      <Box className="market-content" p={5}>
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={6}
          className="product-grid"
        >
          {sortedProducts.map((product) => (
            <Box
              key={product.id}
              className="product-card"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={3}
              textAlign="center"
            >
              <Image src={product.image} alt={product.name} mb={3} />
              <Text fontWeight="bold">{product.name}</Text>
              <Text color="gray.500" mb={2}>
                {product.price}
              </Text>
              <Link to={`/product/${product.id}`}>
                <button className="add-button">Add to cart 🛒</button>
              </Link>
            </Box>
          ))}
        </Grid>

        {/* No Products Found Message */}
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            color={"gray"}
          >
            No Product found 😢 {""}
            <Link href="/create">
              <Text
                as={"span"}
                color={"blue"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </Box>
    </>
  );
};

export default MarketPage;
