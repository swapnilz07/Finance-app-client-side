import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Error = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt="30px"
    >
      <Typography variant="h1" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Something went wrong.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        The page you are looking for might be temporarily unavailable or does
        not exist.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        size="large"
      >
        Go back to Home
      </Button>
    </Box>
  );
};

export default Error;
