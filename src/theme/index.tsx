import React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function SNiCTheme({ children }: Props) {
  // Todo: include CelerIT font

  const theme = createTheme({
    palette: {
      primary: {
        main: '#df421d',
      },
      secondary: {
        main: '#072b4e',
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default SNiCTheme;
