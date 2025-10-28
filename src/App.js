import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import store from './Store/Store';
import SearchBar from './Components/Searchbar';
import UserProfile from './Components/UserProfile';

function GitHubUserFinder() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                GitHub User Finder
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    icon={<LightMode />}
                    checkedIcon={<DarkMode />}
                  />
                }
                label={darkMode ? 'Dark' : 'Light'}
              />
            </Box>
            <SearchBar />
            <UserProfile />
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default GitHubUserFinder;