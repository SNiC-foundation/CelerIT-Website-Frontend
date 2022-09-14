import React from 'react';
import { styled, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TypographyHeader from '../TypographyHeader';

const Paragraph = styled(Typography)({
  paddingTop: '1.5rem',
});

function ThemeComponent() {
  return (
    <Container maxWidth="md" sx={{ marginTop: '6rem', textAlign: 'center' }}>
      <TypographyHeader variant="h2">
        Theme
      </TypographyHeader>
      <Typography variant="body1">
        The theme of this year&apos;s conference is
        {' '}
        <span style={{ fontWeight: 'bold' }}>CelerIT</span>
        : the speed at which the IT sector has evolved and developed in
        the relative short timespan of 40-60 years.
      </Typography>
      <Paragraph variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare ut lectus
        {' '}
        id ullamcorper. Pellentesque id dictum odio. Nunc sed quam eu risus blandit
        {' '}
        lobortis vestibulum sit amet ex. Praesent maximus consectetur pharetra. Integer
        {' '}
        finibus velit malesuada sapien venenatis consequat et nec libero. Vivamus a diam
        {' '}
        dui. Duis vitae diam neque. Morbi ut congue nisl. Quisque sodales volutpat maximus.
      </Paragraph>
      <Paragraph variant="body1">
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
      </Paragraph>
    </Container>
  );
}

export default ThemeComponent;
