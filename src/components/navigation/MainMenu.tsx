import React from 'react';
import { Box, Container } from '@mui/material';
import AppToolbar from './AppToolbar';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function MainMenu({ children }: Props) {
  return (
    <>
      <AppToolbar />
      <Box sx={(theme) => ({ width: '100%', backgroundColor: theme.palette.secondary.main })}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </>
  );
}

export default MainMenu;
