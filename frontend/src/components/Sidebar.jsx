import {
  Text,
  Box,
  VStack,
  HStack,
  Collapse,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FiX, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { RiCustomerServiceLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const currentYear = new Date().getFullYear();
  const [openCategory, setOpenCategory] = useState(null);
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
    setSortOption(option); // Set the current sort option
    setSortedProducts(sortedArray);
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <Box
      position={{ base: "fixed", md: "relative" }}
      left={isOpen ? "0" : "-250px"}
      h="100vh"
      w="200px"
      p={4}
      transition="0.3s ease-in-out"
      className="sidebar"
      z-index={20}
    >
      {/* Close Button (Only for Mobile) */}
      <IconButton
        aria-label="Close Sidebar"
        icon={<FiX />}
        onClick={toggleSidebar}
        mb={4}
        display={{ base: "block", md: "none" }}
        className="close-button"
      />

      <VStack align="start" spacing={4}>
        {/* Navigation Links (Mobile Only) */}
        <Button
          as={Link}
          to="/"
          variant="ghost"
          display={{ base: "block", md: "none" }}
          margin={"8px 10px"}
        >
          <Flex justify={"center"} align={"center"}>
            <FaHome style={{ marginRight: "5px" }} />
            Home
          </Flex>
        </Button>
        <HStack spacing={2} className="role-toggle" margin={"8px 10px"}>
          <LuUsers style={{ marginRight: "3px" }} />
          <Text fontSize="lg">{role}</Text>
          <motion.div
            key={role}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <IconButton
              icon={
                role === "Buyer" ? (
                  <FaToggleOff size={"30px"} />
                ) : (
                  <FaToggleOn size={"30px"} />
                )
              }
              aria-label="Toggle Role"
              onClick={toggleRole}
              fontSize="24px"
              bg="transparent"
              _hover={{ bg: "gray.200" }}
            />
          </motion.div>
        </HStack>

        {/* Sort by Dropdown */}
        <Box margin={"8px 10px"}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaSortAmountDown />}
              rightIcon={<FiChevronDown />}
            >
              Sort By
            </MenuButton>
            <MenuList className="menu-list">
              <MenuItem
                className="menu-item"
                onClick={() => handleSort("date")}
              >
                Arrival Date
              </MenuItem>
              <MenuItem
                className="menu-item"
                onClick={() => handleSort("reviews")}
              >
                Reviews
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <div className="social-divider">
          <span>Select categories by:</span>
        </div>

        {/* Products Section */}
        <Button
          leftIcon={<AiOutlineProduct size={25} />}
          onClick={() => toggleCategory("products")}
          margin={"8px 10px"}
          variant="ghost"
          className="product"
        >
          Products
        </Button>
        <Collapse in={openCategory === "products"}>
          <VStack pl={4} align="start">
            <Button variant="link">Vehicles</Button>
            <Button variant="link">Accessories</Button>
            <Button variant="link">Clothing</Button>
            <Button variant="link">Home Hardware</Button>
          </VStack>
        </Collapse>

        {/* Services Section */}
        <Button
          leftIcon={<RiCustomerServiceLine size={25} />}
          onClick={() => toggleCategory("services")}
          margin={"8px 10px"}
          variant="ghost"
          className="services"
        >
          Services
        </Button>
        <Collapse in={openCategory === "services"}>
          <VStack pl={4} align="start">
            <Button variant="link">Private Doctors</Button>
            <Button variant="link">Project Managers</Button>
            <Button variant="link">Private Drivers</Button>
            <Button variant="link">Web developers</Button>
          </VStack>
        </Collapse>

        {/* Food Section */}
        <Button
          leftIcon={<IoFastFood size={25} />}
          onClick={() => toggleCategory("services")}
          margin={"8px 10px"}
          variant="ghost"
          className="services"
        >
          Food
        </Button>
        <Collapse in={openCategory === "services"}>
          <VStack pl={4} align="start">
            <Button variant="link">Food delivery</Button>
            <Button variant="link">Food stuffs</Button>
            <Button variant="link">Groceries</Button>
          </VStack>
        </Collapse>

        <div className="copyright">
          <p>&copy; {currentYear} NJ.C Bandwidth. All rights reserved.</p>
        </div>
      </VStack>
    </Box>
  );
};

export default Sidebar;
