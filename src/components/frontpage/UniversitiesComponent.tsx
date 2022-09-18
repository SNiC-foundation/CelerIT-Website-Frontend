import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import TypographyHeader from '../layout/TypographyHeader';
import { shuffleArray } from '../../helpers/array';

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
  const [width, setWidth] = React.useState(document.body.scrollWidth);

  const ref = React.useRef(null);

  const getWidth = () => {
    const viewportWidth = document.body.scrollWidth;
    setWidth(viewportWidth);
  };

  React.useEffect(() => {
    getWidth();
    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, []);

  const height = ref && ref.current ? (ref.current as any).scrollHeight : 0;

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
        <Marquee gradientColor={[238, 238, 238]}>
          {logos.concat(logos).concat(logos).concat(logos).map((l) => (
            <img src={l.image} alt={l.name} style={{ height: '80px', margin: '1rem' }} />
          ))}
        </Marquee>
      </Box>
      <Box sx={{ height }} />
    </Box>
  );
}

export default UniversitiesComponent;
