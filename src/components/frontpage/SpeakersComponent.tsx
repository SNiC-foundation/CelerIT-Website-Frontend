import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import TypographyHeader from '../layout/TypographyHeader';

function SpeakersComponent() {
  return (
    <>
      <TypographyHeader variant="h3">
        Speakers
      </TypographyHeader>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare ut lectus
        {' '}
        id ullamcorper. Pellentesque id dictum odio. Nunc sed quam eu risus blandit
        {' '}
        lobortis vestibulum sit amet ex. Praesent maximus consectetur pharetra. Integer
        {' '}
        finibus velit malesuada sapien venenatis consequat et nec libero. Vivamus a diam
        {' '}
        dui. Duis vitae diam neque. Morbi ut congue nisl. Quisque sodales volutpat maximus.
      </Typography>
      <Typography variant="body1">
        Integer imperdiet elit vitae posuere efficitur. In sodales placerat augue. Vivamus
        {' '}
        sodales nulla a quam porta, nec blandit lorem consectetur. Sed at urna blandit,
        {' '}
        eleifend ipsum sodales, porta enim. Nulla non nulla laoreet, tempus risus non,
        {' '}
        ultrices odio. Morbi dictum pellentesque sapien at imperdiet. Pellentesque habitant
        {' '}
        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu ex
        {' '}
        rutrum, ultricies ex ut, dapibus lorem. Class aptent taciti sociosqu ad litora
        {' '}
        torquent per conubia nostra, per inceptos himenaeos. Vivamus quis dapibus elit. Nunc
        {' '}
        in lorem augue. Aliquam porttitor nibh nec urna maximus luctus at eu augue.
      </Typography>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button component={Link} to="/speakers" variant="contained" color="secondary" size="large" startIcon={<ArrowForward />}>
          See the list of speakers
        </Button>
      </Box>
    </>
  );
}

export default SpeakersComponent;
