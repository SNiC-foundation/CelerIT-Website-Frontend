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
      <Box sx={(theme) => ({
        display: 'flex',
        flexFlow: 'column',
        height: '100vh',
        backgroundColor: theme.palette.secondary.main,
      })}
      >
        <Box sx={() => ({
          height: '64px',
          flex: '0 1 auto',
        })}
        />
        <Box sx={() => ({
          flex: '1 1 auto',
        })}
        >
          <Container maxWidth="xl" sx={(theme) => ({ ...theme.mixins.toolbar })}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default MainMenu;
