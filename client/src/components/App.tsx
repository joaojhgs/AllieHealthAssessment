import React from "react";
import { Box } from "@mui/material";
import Home from "./home";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Home />
      </LocalizationProvider>
    </Box>
  );
};

export default App;
