import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from './App.jsx';
import theme from './styleTheme';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
