import React from 'react';
import {
  Box, Button, Container, Divider, Link as MaterialLink,
} from '@mui/material';
import { PhotoCamera, Videocam } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TypographyHeader from '../layout/TypographyHeader';

function AftermovieComponent() {
  return (
    <Box sx={{ my: '4rem', textAlign: 'center' }}>
      <TypographyHeader variant="h3">
        Thank you for visiting SNiC 2022!
      </TypographyHeader>
      <Container maxWidth="md" sx={{ my: '2rem' }}>
        <Box
          style={{
            position: 'relative', width: '100%', height: 0, paddingBottom: '56.27198%',
          }}
        >
          <iframe
            title="SNiC 2022: CelerIT Aftermovie on YouTube"
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            }}
            width="500"
            height="294"
            src="https://www.youtube.com/embed/7yLsFBx4aBc?&theme=dark&color=white&autohide=2"
            frameBorder="0"
          />
        </Box>
      </Container>
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<PhotoCamera />}
          component={MaterialLink}
          href="https://drive.google.com/drive/folders/16ejPDmR00-0TJf88pIfbQba85JJIRcPc?usp=share_link"
          target="_blank"
        >
          Photos
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<Videocam />}
          component={Link}
          to="/program"
        >
          Recordings
        </Button>
      </Box>
      <Divider />
    </Box>
  );
}

export default AftermovieComponent;
