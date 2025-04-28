import React from "react";
import { Box, Button, Text, Flex, Link } from "@chakra-ui/react";
import "./Bankdashboard.css";
import { keyframes } from "@emotion/react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import DashSidebar from "./Dashboardsidebar.jsx";

const BankDashboard = () => {
  const currentYear = new Date().getFullYear();
  const events = [
    {
      text: "💸 +33*********99 just withdrew $200",
      color: "blue.500",
      time: "10 seconds ago",
    },
    {
      text: "🎁 Sarah referred 3 friends",
      color: "green.500",
      time: "50 seconds ago",
    },
    {
      text: "🛒 Mike bought electronics",
      color: "purple.500",
      time: "25 seconds ago",
    },
    {
      text: "💰 Olivia saved $500 this month",
      color: "orange.500",
      time: "1 minute ago",
    },
    {
      text: "💸 +233*******774 just withdrew $550",
      color: "blue.500",
      time: "30 seconds ago",
    },
    {
      text: "🎁 Praise referred 2 friends",
      color: "green.500",
      time: "55 seconds ago",
    },
    {
      text: "🛒 +234********42 bought Laptop",
      color: "purple.500",
      time: "20 seconds ago",
    },
    {
      text: "💰 Jacob saved $250 this month",
      color: "orange.500",
      time: "40 seconds ago",
    },
  ];

  const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

  return (
    <>
      <DashSidebar />
      <Box
        className="dash-header"
        backgroundColor="#39393b"
        color="white"
        padding="10px"
        textAlign="center"
        fontSize="24px"
      >
        <Text className="nav-text">Bank Dashboard</Text>

        <FaCircleUser className="user" />
      </Box>
      <Box className="body">
        <Box
          className="content"
          padding="20px"
          textAlign="right"
          fontSize="20px"
        >
          <p className="balance">
            Balance:{" "}
            <span>
              <strong>$1,500</strong>
            </span>
          </p>
        </Box>
        <Box className="bank-hero">
          <Text className="bank-intro">
            Don't miss <br />
            <span>
              <strong>$NJ Points</strong>
            </span>
            <br />
            Join the revolution in Nairobi's digital community.
          </Text>
          <br />
          <Text>
            A community driven with providing the world with exceptional
            services through our registered and verified sellers. Refer and earn
            points for in-app purchases
            <br />
            <a href="/marketplace">
              <Button
                size="sm"
                mt={5}
                backgroundColor="blue.500"
                color="white"
                _hover={{ backgroundColor: "blue.600" }}
                _active={{ backgroundColor: "blue.700" }}
                borderRadius="md"
              >
                Marketplace
              </Button>
            </a>
          </Text>
        </Box>

        <Box
          className="bank-content"
          position={"relative"}
          height="300px"
          backgroundImage="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZGluZyUyMGNoYXJ0fGVufDB8fDB8fHww"
          backgroundSize="cover"
          backgroundPosition="center"
          overflow={"hidden"}
        >
          {/* Gradient overlay that fades out */}
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            bgGradient="linear(to-r, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3), transparent)"
            backdropFilter="blur(2px)"
            zIndex="0"
          />
          <Box position="relative" zIndex="1" p="6" color="white">
            <Text fontSize="4xl" fontWeight="bold" mb={15}>
              $NJP
            </Text>
            <Text
              fontSize="xl"
              mt={9}
              fontWeight="bold"
              color={"#cfb006"}
              pt={4}
            >
              🚀 23,000 active users
            </Text>
            <Text fontSize="xl" fontWeight="bold" color={"#19d426"} pt={4}>
              📈 90% increase in sales
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="#e37e12" pt={4}>
              🔐 100% Security
            </Text>
          </Box>
        </Box>

        <Box className="bank-body" fontFamily={"sans-serif"}>
          <Text color={"white"} fontSize="2xl" fontWeight="bold" pb={5}>
            ACCOUNT ADDRESS
          </Text>
          <Flex>
            <Text fontSize="lg" fontWeight="bold" pr={3}>
              042*****555
            </Text>
            <MdOutlineContentCopy />
          </Flex>
          <Text fontSize="lg" pt={3}>
            Unity Bank
          </Text>
          <Text fontSize="lg" pt={3}>
            NJ Money checkout
          </Text>
        </Box>
      </Box>

      <Box
        overflow="hidden"
        whiteSpace="nowrap"
        width="100%"
        bg="gray.100"
        p={9}
        position="relative"
      >
        <Box
          display="inline-block"
          animation={`${scroll} 90s linear infinite`}
          p={4}
          _hover={{ animationPlayState: "paused" }}
        >
          <Flex gap={6}>
            {[...events, ...events].map((event, index) => (
              <Box
                key={index}
                px={5}
                py={8}
                bg={event.color}
                color="white"
                borderBottomRightRadius="3rem"
                minWidth="max-content"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <Text fontSize="sm" fontWeight="bold">
                  {event.text}
                </Text>
                <Text fontSize="xs" opacity={0.8} mt={1}>
                  {event.time}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      <Box alignItems={"center"} className="bank-footer">
      <div className="footer-column bank-footer">
          <div className="footer-contact-item">
            <FaMapMarkerAlt />
            <span>Nairobi, NJ Kenya</span>
          </div>
          <div className="footer-contact-item">
            <FaPhoneAlt />
            <span>+254764455987</span>
          </div>
          <div className="footer-contact-item">
            <FaEnvelope />
            <span>fox_tec@yahoo.com</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} NJ.C Bandwidth. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </Box>
    </>
  );
};

export default BankDashboard;
