import React from 'react';
import {
  Box, Container as MuiContainer, styled,
} from '@mui/material';
import AppToolbar from './AppToolbar';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Container = styled(MuiContainer)(({ theme }) => ({
  color: theme.palette.text.primary,
  minHeight: 'calc(100vh - 64px)',
  paddingTop: '1em',
  paddingBottom: '1em',
}));

function MainMenu({ children }: Props) {
  return (
    <>
      <AppToolbar />
      <Box sx={() => ({
        display: 'flex',
        flexFlow: 'column',
        minHeight: '100vh',
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
          <Container
            maxWidth="xl"
          >
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default MainMenu;
