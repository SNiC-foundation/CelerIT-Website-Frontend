import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Place } from '@mui/icons-material';
import TypographyHeader from '../layout/TypographyHeader';

function LocationComponent() {
  return (
    <Box sx={(theme) => ({
      [theme.breakpoints.up('sm')]: {
        marginY: '4rem',
      },
    })}
    >
      <TypographyHeader variant="h3">
        Location
      </TypographyHeader>
      <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
        This year&apos;s SNiC takes place in the Parktheater in Eindhoven.
        Previously known as the City Theater, it is situated around the edge of the
        Stadwandelpark in the city centre of Eindhoven.
        With two large rooms, one smaller, cozier room, and many foyers and seating areas,
        it is the perfect host for an event the size of SNiC.
      </Typography>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button variant="contained" color="secondary" href="https://g.page/parktheatereindhoven?share" target="_blank" startIcon={<Place />}>
          Parktheater
        </Button>
      </Box>
    </Box>
  );
}

export default LocationComponent;
