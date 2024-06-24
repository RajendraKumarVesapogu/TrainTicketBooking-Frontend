import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import ToggleCustomTheme from './components/ToggleCustomTheme';
import ToggleColorMode from './components/ToggleColorMode';
import AppAppBar from './components/AppAppBar';

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function Trains() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const storedTrains = localStorage.getItem('trains');
    if (storedTrains) {
      setTrains(JSON.parse(storedTrains));
    } else {
      setTrains([{ "train_name": "Rajendra Express", "available_seats": 123 }]); // Default value if localStorage is empty
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100%"
        my={4}
      >
        {trains.map((train, index) => (
          <Box
            key={index}
            width={300}
            p={2}
            mb={2}
            textAlign="center"
            border="2px solid grey"
            borderRadius="8px"
          >
            <h2>{train.train_name}</h2>
            <p>Available Seats: {train.available_seats}</p>
            {/* <Button></Button> */}
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
}
