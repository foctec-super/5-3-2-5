import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./Navbar";
import "./SellerRegistration.css";

const SellerRegistrationForm = () => {
  const [type, setType] = useState("product");
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    website: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!agreed) {
      toast({
        title: "You must agree to the terms and policy.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate form submission
    console.log("Submitting:", { type, ...formData });
    toast({
      title: "Submission Successful!",
      description: `Your ${
        type === "product" ? "product" : "organization"
      } has been submitted.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Navbar />

      <Box className="sell-form">
        <Box className="sell-content">
          <Heading className="sell-header">Register to become a seller</Heading>
          <FormControl mb={4} className="select">
            <FormLabel>Select Type</FormLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="dropdown"
            >
              <option value="product">Register a Product</option>
              <option value="organization">Register an Organization</option>
            </Select>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>
              {type === "product" ? "Product Name" : "Organization Name"}
            </FormLabel>
            <Input
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
            />
          </FormControl>

          {type === "product" && (
            <>
              <FormControl mb={4} className="select">
                <FormLabel>Select Categories</FormLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="dropdown"
                >
                  <option value="product">Product</option>
                  <option value="services">Services</option>
                  <option value="food">Food</option>
                </Select>
              </FormControl>

              <FormControl mb={4} isRequired>
                <FormLabel>Price (USD)</FormLabel>
                <Input
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}

          {type === "organization" && (
            <FormControl mb={4}>
              <FormLabel>Website</FormLabel>
              <Input
                name="website"
                placeholder="e.g. www.example.com"
                onChange={handleChange}
              />
            </FormControl>
          )}

          <FormControl mb={4} isRequired className="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Brief description"
              onChange={handleChange}
            />
          </FormControl>

          <div className="checkbox">
            <input
              type="checkbox"
              isChecked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I agree to the 
            <a
              href="/terms"
              style={{ color: "blue" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Policy
            </a>
          </div>

          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isDisabled={!agreed}
            width="full"
            className="submit-button"
          >
            Submit for Approval
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SellerRegistrationForm;
