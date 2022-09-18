import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ArrowForward, Place } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LandingComponent from '../components/frontpage/LandingComponent';
import { Client, Partner } from '../clients/server.generated';
import ThemeComponent from '../components/frontpage/ThemeComponent';
import DateLocationComponent from '../components/frontpage/DateLocationComponent';
import SkewContentBox from '../components/layout/SkewContentBox';
import TypographyHeader from '../components/layout/TypographyHeader';
import UniversitiesComponent from '../components/frontpage/UniversitiesComponent';
import { shuffleArray } from '../helpers/array';
import PartnerGrid from '../components/partner/PartnerGrid';

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
      <SkewContentBox image="./parktheater.jpg" verticalImageHeight={500}>
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
      </SkewContentBox>
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
    </>
  );
}

export default App;
