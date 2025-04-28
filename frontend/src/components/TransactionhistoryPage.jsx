import React from 'react';
import { Box } from '@chakra-ui/react';

const TransactionHistoryPage = () => {
  // In a real app, this data would come from an API or state
  const transactions = [
    { id: 1, description: 'Paid $50 to John' },
    { id: 2, description: 'Received $100 from Alice' },
    { id: 3, description: 'Paid $20 for groceries' },
  ];

  return (
    <>
      <Box
        className="history-nav"
        backgroundColor="#39393b"
        color="white"
        padding="10px"
        textAlign="center"
        fontSize="24px"
      >
        Transaction History
      </Box>
      <Box>
        {transactions.map((transaction) => (
          <Box
            key={transaction.id}
            className="transaction"
            padding="10px"
            margin="10px 0"
            border="1px solid #1e90ff"
            borderRadius="8px"
            backgroundColor={transaction.id % 2 === 0 ? 'white' : '#e6f7ff'} // Alternate background
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          >
            {transaction.description}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default TransactionHistoryPage;
