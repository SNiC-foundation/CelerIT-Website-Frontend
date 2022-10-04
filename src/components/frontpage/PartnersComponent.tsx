import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import TypographyHeader from '../layout/TypographyHeader';
import PartnerGrid from '../partner/PartnerGrid';
import { Partner } from '../../clients/server.generated';

interface Props {
  partners: Partner[];
}

function PartnersComponent({ partners }: Props) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ marginBottom: '2rem' }}>
        <TypographyHeader variant="h2">
          2022 Partners
        </TypographyHeader>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
          Interested in becoming a partner or speaker?
          {' '}
          <a href="/about">Contact us</a>
          {' '}
          for details.
        </Typography>
        <Button component={Link} to="/partners" variant="contained" size="large" startIcon={<ArrowForward />}>
          More about the 2022 partners
        </Button>
      </Box>
      <hr />
      <PartnerGrid partners={partners} scaleFactor={0.7} extensive={false} />
    </Box>
  );
}

export default PartnersComponent;
