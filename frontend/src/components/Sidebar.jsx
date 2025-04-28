import React, { useState } from "react";
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Text,
  Flex,
  Button,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaSortAmountDown,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const currentYear = new Date().getFullYear();
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

  const isExpanded = isMobile ? isOpen : isHovered;

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FaTimes /> : <FaBars />}
          onClick={isOpen ? onClose : onOpen}
          position="fixed"
          top="1rem"
          left="0.7rem"
          zIndex="1100"
          background="white"
        />
      )}

      <Box
        position="fixed"
        left="0"
        top="0"
        height="100vh"
        backgroundColor="#f8f9fa"
        color="white"
        width={isExpanded ? "220px" : "60px"}
        transition="width 0.3s ease"
        onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
        zIndex="0"
        boxShadow="lg"
        p={4}
      >
        <VStack
          align={isExpanded ? "flex-start" : "center"}
          spacing={6}
          mt="70px"
        >
          {/* Home Link */}
          <Button
            as={Link}
            to="/"
            variant="ghost"
            width="100%"
            justifyContent={isExpanded ? "flex-start" : "center"}
            leftIcon={
              isExpanded ? (
                <FaHome size={25} color="black" />
              ) : (
                <FaHome size={28} color="#000000" />
              )
            }
          >
            {isExpanded && "Home"}
          </Button>

          {/* Role Toggle */}
          <HStack
            spacing={2}
            pl={isExpanded ? 4 : 0}
            width="100%"
            justify={isExpanded ? "flex-start" : "center"}
          >
            <LuUsers size={isExpanded ? 25 : 28} color="black" />
            {isExpanded && (
              <>
                <Text fontSize="lg" color={"black"}>
                  {role}
                </Text>
                <motion.div
                  key={role}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <IconButton
                    icon={
                      role === "Buyer" ? (
                        <FaToggleOff size="30px" />
                      ) : (
                        <FaToggleOn size="30px" />
                      )
                    }
                    aria-label="Toggle Role"
                    onClick={toggleRole}
                    fontSize="24px"
                    bg="transparent"
                    _hover={{ bg: "gray.200" }}
                  />
                </motion.div>
              </>
            )}
          </HStack>

          {/* Sort By Dropdown */}
          {isExpanded && (
            <Box width="100%">
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    isExpanded ? (
                      <FaSortAmountDown size={25} color="black" />
                    ) : (
                      <FaSortAmountDown size={28} color="#000000" /> // Force color
                    )
                  }
                  rightIcon={<FiChevronDown />}
                  width="100%"
                  justifyContent="flex-start"
                >
                  Sort By
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleSort("date")} color={"black"}>
                    Arrival Date
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSort("reviews")}
                    color={"black"}
                  >
                    Reviews
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}

          {/* Divider */}
          {isExpanded && (
            <Box w="100%" textAlign="center" fontSize="sm" color="gray.400">
              Select categories by:
            </Box>
          )}

          {/* Products Section */}
          <Button
            variant="ghost"
            width="100%"
            justifyContent={isExpanded ? "flex-start" : "center"}
            leftIcon={
              isExpanded ? (
                <AiOutlineProduct size={25} color="black" />
              ) : (
                <AiOutlineProduct size={28} color="#000000" /> // Force color
              )
            }
            onClick={() => toggleCategory("products")}
          >
            {isExpanded && "Products"}
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
            variant="ghost"
            width="100%"
            justifyContent={isExpanded ? "flex-start" : "center"}
            leftIcon={
              isExpanded ? (
                <RiCustomerServiceLine size={25} color="black" />
              ) : (
                <RiCustomerServiceLine size={28} color="#000000" /> // Force color
              )
            }
            onClick={() => toggleCategory("services")}
          >
            {isExpanded && "Services"}
          </Button>
          <Collapse in={openCategory === "services"}>
            <VStack pl={4} align="start">
              <Button variant="link">Private Doctors</Button>
              <Button variant="link">Project Managers</Button>
              <Button variant="link">Private Drivers</Button>
              <Button variant="link">Web Developers</Button>
            </VStack>
          </Collapse>

          {/* Food Section */}
          <Button
            variant="ghost"
            width="100%"
            justifyContent={isExpanded ? "flex-start" : "center"}
            leftIcon={
              isExpanded ? (
                <IoFastFood size={25} color="black" />
              ) : (
                <IoFastFood size={28} color="#000000" /> // Force color
              )
            }
            onClick={() => toggleCategory("food")}
          >
            {isExpanded && "Food"}
          </Button>
          <Collapse in={openCategory === "food"}>
            <VStack pl={4} align="start">
              <Button variant="link">Food Delivery</Button>
              <Button variant="link">Food Stuffs</Button>
              <Button variant="link">Groceries</Button>
            </VStack>
          </Collapse>

          {/* Footer Copyright */}
          <Box
            width="100%"
            textAlign="center"
            py="4"
            fontSize="sm"
            borderTop="1px solid #4a4a4a"
          >
            {isExpanded ? (
              <Box
                pt="3"
                fontSize="sm"
                color="gray.400"
                textAlign="center"
                w="100%"
              >
                &copy; {currentYear} NJ.C Bandwidth. All rights reserved.
              </Box>
            ) : (
              <Text fontSize="xs">&copy;</Text>
            )}
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;
