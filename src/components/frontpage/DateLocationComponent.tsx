import React from 'react';
import { Box } from '@mui/material';
import { Place } from '@mui/icons-material';
import TypographyHeader from '../TypographyHeader';

function DateLocationComponent() {
  return (
    <Box sx={{ marginTop: '6rem', textAlign: 'center' }}>
      <TypographyHeader variant="h2">
        Wednesday November 30th, 2022
      </TypographyHeader>
      <TypographyHeader variant="h3">
        <Place sx={{ marginRight: '0.5rem', fontSize: 40 }} />
        Parktheater, Eindhoven
      </TypographyHeader>
    </Box>
  );
}

export default DateLocationComponent;
