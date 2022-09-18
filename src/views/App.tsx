import React from 'react';
import { Box, Typography } from '@mui/material';
import LandingComponent from '../components/frontpage/LandingComponent';
import { Client, Partner } from '../clients/server.generated';
import ThemeComponent from '../components/frontpage/ThemeComponent';
import DateLocationComponent from '../components/frontpage/DateLocationComponent';
import SkewContentBox from '../components/layout/SkewContentBox';
import TypographyHeader from '../components/layout/TypographyHeader';
import UniversitiesComponent from '../components/frontpage/UniversitiesComponent';
import { shuffleArray } from '../helpers/array';

function App() {
  const [partners, setPartners] = React.useState<Partner[] | null>(null);
  const [shuffledPartners, setShuffledPartners] = React.useState<Partner[] | null>(null);

  React.useEffect(() => {
    const client = new Client();
    client.getAllPartners()
      .then((p) => {
        setPartners(p);
        setShuffledPartners(shuffleArray(p));
      });
  }, []);

  if (!partners || !shuffledPartners) return null;

  return (
    <>
      <LandingComponent location="./CelerIT_animatie.mp4" shuffledPartners={shuffledPartners} />
      <DateLocationComponent />
      <ThemeComponent />
      <SkewContentBox image="./windowsxp.jpg">
        <TypographyHeader variant="h3">
          Wie dit leest trekt een bak
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
      </SkewContentBox>
      <UniversitiesComponent />
      <Box>
        <TypographyHeader variant="h3">
          Wie dit leest trekt een bak
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
      </Box>
    </>
  );
}

export default App;
