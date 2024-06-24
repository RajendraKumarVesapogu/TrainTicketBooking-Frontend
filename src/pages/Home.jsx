import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ToggleCustomTheme from './components/ToggleCustomTheme';
import ToggleColorMode from './components/ToggleColorMode';
import Search from './components/Search';
import AppAppBar from './components/AppAppBar';
// const logoStyle = {
//   width: '140px',
//   height: 'auto',
//   cursor: 'pointer',
// };



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

export default function Home() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Search />
    </ThemeProvider>
  );
}