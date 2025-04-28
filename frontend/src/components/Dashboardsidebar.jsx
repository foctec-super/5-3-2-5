import React, { useState } from "react";
import {
  Box,
  IconButton,
  Flex,
  Text,
  Button,
  Input,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaBars,
  FaTimes,
  FaMoneyBillWave,
  FaPaperPlane,
  FaHistory,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const DashSidebar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalActive, setIsModalActive] = useState(false);
  const [recipientId, setRecipientId] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const submitRecipient = () => {
    if (recipientId.length === 23) {
      alert("Recipient ID submitted: " + recipientId);
      closeModal();
      setRecipientId(""); // Clear input
    } else {
      alert("Please enter exactly 23 characters!");
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isMobile ? isOpen : isHovered;
  const menuItems = [
    { icon: FaMoneyBillWave, label: "Transactions", path: "/transactions" },
    { icon: FaHistory, label: "History", path: "/transaction-history" },
    { icon: FaPaperPlane, label: "Send Money", onClick: openModal },
    { icon: IoSettings, label: "Settings", path: "#" },
  ];

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
        backgroundColor="#39393b"
        color="white"
        width={isExpanded ? "200px" : "60px"}
        transition="width 0.3s ease"
        onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
        zIndex="1000"
        boxShadow="lg"
      >
        <Box mt={70}>
          <Flex
            direction="column"
            pt="4"
            gap="12"
            align={isExpanded ? "flex-start" : "center"}
            px={isExpanded ? "4" : "2"}
          >
            {menuItems.map((item, idx) => (
              <Flex
                key={idx}
                align="center"
                gap="4"
                cursor="pointer"
                _hover={{ bg: "#007acc" }}
                p="2"
                borderRadius="md"
                w="100%"
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <Box fontSize="xl">
                  <item.icon size={24} />
                </Box>
                {isExpanded && <Text>{item.label}</Text>}
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
      {/* Modal and Overlay */}
      {isModalActive && (
        <>
          <Box
            className="modal active"
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundColor="white"
            padding="20px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
            borderRadius="8px"
            zIndex="1000"
          >
            <p>Enter Recipient ID (23 characters):</p>
            <Input
              type="text"
              id="recipientId"
              className="recipientInput"
              maxLength={23}
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
            />
            <Flex gap={11} mt={4} float={"right"}>
              <Button className="submit-btn" onClick={submitRecipient}>
                Submit
              </Button>
              <Button className="close-button" onClick={closeModal}>
                Close
              </Button>
            </Flex>
          </Box>

          <Box
            className="overlay active"
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="999"
            onClick={closeModal}
          />
        </>
      )}
      ;
    </>
  );
};

export default DashSidebar;
