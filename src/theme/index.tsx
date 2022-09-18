import React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function SNiCTheme({ children }: Props) {
  // Todo: include CelerIT font

  const theme = createTheme({
    palette: {
      primary: {
        main: '#072b4e',
      },
      secondary: {
        dark: '#c7391a',
        main: '#df421d',
        light: '#e4502f',
      },
      mode: 'light',
      background: {
        default: '#eee',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default SNiCTheme;
