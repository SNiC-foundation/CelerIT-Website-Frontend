import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import TypographyHeader from '../layout/TypographyHeader';

function SpeakersComponent() {
  return (
    <Box sx={{ paddingY: '4rem' }}>
      <TypographyHeader variant="h3">
        Speakers
      </TypographyHeader>
      <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
        A big part of a SNiC conference are its speakers. This year, we again have an amazing list
        of people from all over the world joining our conference. These speakers all have
        interesting stories to tell: what they are working on, what they have worked on or something
        that they have experienced in their field. Either in a panel or in a presentation/talk, they
        share their vision on the world with us.
      </Typography>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button component={Link} to="/speakers" variant="contained" color="secondary" size="large" startIcon={<ArrowForward />}>
          See the list of speakers
        </Button>
      </Box>
    </Box>
  );
}

export default SpeakersComponent;
