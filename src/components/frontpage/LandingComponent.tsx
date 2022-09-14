import React from 'react';
import { Box } from '@mui/material';
import { Partner } from '../../clients/server.generated';

interface Props {
  location: string;
  partners: Partner[];
}

function LandingComponent({ location, partners }: Props) {
  const [width, setWidth] = React.useState(document.body.scrollWidth);
  const [outerHeight, setOuterHeight] = React.useState(window.innerHeight);
  const [innerHeight, setInnerHeight] = React.useState(0);

  const outerRef = React.useRef(null);

  const recalcSizes = () => {
    const viewportWidth = document.body.scrollWidth;
    setWidth(viewportWidth);
    const viewportHeight = window.innerHeight;
    setOuterHeight(viewportHeight);
  };

  // eslint-disable-next-line no-unused-vars
  const getRefHeight = () => {
    if (!outerRef.current) return;
    const h = (outerRef.current as any).scrollHeight;
    setInnerHeight(h);
  };

  React.useEffect(() => {
    recalcSizes();
    getRefHeight();

    const ob = new ResizeObserver(getRefHeight);
    ob.observe(outerRef.current as any);

    window.addEventListener('resize', recalcSizes);

    return () => {
      window.removeEventListener('resize', recalcSizes);
      ob.disconnect();
    };
  }, []);

  React.useEffect(() => {
    getRefHeight();
  }, [outerRef, outerRef.current]);

  const calcHeight = `calc(${outerHeight}px - 16px - 64px)`;

  return (
    <Box sx={{
      display: 'flex', height: calcHeight, width: '100%', flexDirection: 'column',
    }}
    >
      <Box sx={{ flexGrow: 1 }} ref={outerRef}>
        <Box sx={(theme) => ({
          marginTop: '-32px',
          position: 'absolute',
          width: `${width}px`,
          height: `${innerHeight + 32}px`,
          backgroundColor: theme.palette.primary.main,
          left: 0,
        })}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay>
            <source
              src={location}
              type="video/mp4"
              style={{ width: '100%' }}
            />
          </video>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingY: '0.5rem',
      }}
      >
        {partners.map((p) => (
          <Box sx={{
            height: '92px', width: '92px', display: 'flex', alignItems: 'center', padding: '0.25rem',
          }}
          >
            <Box>
              <a href={p.url} target="_blank" rel="noreferrer">
                <img
                  src={`/api/static/${p.logoFilename!.replace('\\', '/')}`}
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                  alt={p.name}
                />
              </a>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LandingComponent;
