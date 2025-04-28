import React from 'react';
import { Box } from '@chakra-ui/react';

const TransactionsPage = () => {
  return (
    <>
      <Box
        className="transaction-nav"
        backgroundColor="#39393b"
        color="white"
        padding="10px"
        textAlign="center"
        fontSize="24px"
      >
        Transactions
      </Box>
      <Box
        className="content"
        padding="20px"
        fontSize="18px"
        color="rgb(182, 180, 180)"
        fontStyle={"italic"}
      >
        <p>Here is a summary of your transactions.</p>
      </Box>
    </>
  );
};

export default TransactionsPage;
