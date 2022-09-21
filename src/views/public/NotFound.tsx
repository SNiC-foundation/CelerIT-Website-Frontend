import React from 'react';
import { Box, Typography } from '@mui/material';
import TypographyHeader from '../../components/layout/TypographyHeader';

function NotFound() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <TypographyHeader variant="h2">
        Error 404
      </TypographyHeader>
      <Typography variant="body1">
        There seems to be nothing here...
      </Typography>
    </Box>
  );
}

export default NotFound;
