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
    // Somehow, some devices still fail to render to the correct height.
    // This dirty hack should fix it.
    const timeout = setTimeout(getWidth, 500);

    return () => {
      window.removeEventListener('resize', getWidth);
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    const viewportWidth = document.body.scrollWidth;
    if (viewportWidth !== width) {
      getWidth();
    }
  });

  let height = ref && ref.current ? (ref.current as any).scrollHeight : 200;
  if (height === 0) height = 200;

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
      <Box sx={{ height }} />
    </Box>
  );
}

export default UniversitiesComponent;
