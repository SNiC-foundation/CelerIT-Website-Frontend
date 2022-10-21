import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import { useElementSize } from 'usehooks-ts';
import TypographyHeader from '../layout/TypographyHeader';
import { shuffleArray } from '../../helpers/array';
import { useBodyScrollSize } from '../../hooks/useBodyScrollSize';

const logos = shuffleArray([
  {
    image: './universities/TUe-logo-descriptor-line-scarlet-L.png',
    name: 'Eindhoven University of Technology',
  },
  {
    image: './universities/logo-uva.png',
    name: 'Universiteit van Amsterdam',
  },
  {
    image: './universities/ru-icis.svg',
    name: 'Radboud University',
  },
  {
    image: './universities/tue-eaisi.jpg',
    name: 'Eindhoven Artificial Intelligence Systems Institute',
  },
  {
    image: './universities/Liacs_logo_liggend_RGB-scaled.jpg',
    name: 'Universiteit Leiden',
  },
  {
    image: './universities/logo-balk-bernoulli.png',
    name: 'Rijksuniversiteit Groningen',
  },
]);

function UniversitiesComponent() {
  const [ref, { height }] = useElementSize();
  const { width } = useBodyScrollSize();

  return (
    <Box sx={{ marginBottom: '4rem' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
        <TypographyHeader variant="h3">
          Educational & Research institutes
        </TypographyHeader>
        <Typography variant="body2">
          The following universities
          , educational institutes and research institutes support SNiC 2022: CelerIT.
        </Typography>
      </Container>
      <Box sx={{ position: 'absolute', left: 0, width }} ref={ref}>
        <Marquee
          gradientColor={[238, 238, 238]}
          gradientWidth={width < 600 ? width / 4 : undefined}
        >
          {logos.concat(logos).concat(logos).concat(logos).map((l, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <img src={l.image} alt={l.name} style={{ height: '80px', margin: '1rem' }} key={index} />
          ))}
        </Marquee>
      </Box>
      <Box sx={{ height: height > 0 ? height : 200 }} />
    </Box>
  );
}

export default UniversitiesComponent;
