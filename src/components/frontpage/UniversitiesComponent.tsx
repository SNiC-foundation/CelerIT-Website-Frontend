import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import TypographyHeader from '../layout/TypographyHeader';
import { shuffleArray } from '../../helpers/array';

const logos = shuffleArray([
  {
    image: './universities/Eindhoven_University_of_Technology_logo_new.png',
    name: 'Eindhoven University of Technology',
  },
  {
    image: './universities/logo-uva.png',
    name: 'Universiteit van Amsterdam',
  },
  {
    image: './universities/Radboud-University.webp',
    name: 'Radboud University',
  },
  {
    image: './universities/tue-eaisi.jpg',
    name: 'Eindhoven Artificial Intelligence Systems Institute',
  },
  {
    image: './universities/UniversiteitLeidenLogo.svg.png',
    name: 'Universiteit Leiden',
  },
]);

function UniversitiesComponent() {
  const [width, setWidth] = React.useState(document.body.scrollWidth);

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

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <TypographyHeader variant="h3">
          Educational & Research institutes
        </TypographyHeader>
        <Typography variant="body2">
          The following universities
          , educational institutes and research institutes support SNiC 2022: CelerIT.
        </Typography>
      </Container>
      <Box sx={{ position: 'absolute', left: 0, width }}>
        <Marquee gradientColor={[238, 238, 238]}>
          {logos.concat(logos).concat(logos).concat(logos).map((l) => (
            <img src={l.image} alt={l.name} style={{ height: '80px', margin: '1rem' }} />
          ))}
        </Marquee>
      </Box>
    </>
  );
}

export default UniversitiesComponent;
