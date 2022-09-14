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
        main: '#df421d',
      },
      mode: 'light',
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
