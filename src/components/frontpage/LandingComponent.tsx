import React from 'react';
import { Box } from '@mui/material';
import { Partner } from '../../clients/server.generated';
import { apiImageUrl } from '../../helpers/apiHelper';

interface Props {
  location: string;
  partners: Partner[];
}

function LandingComponent({ location, partners }: Props) {
  const [width, setWidth] = React.useState(document.body.scrollWidth);
  const [outerHeight, setOuterHeight] = React.useState(window.innerHeight);
  const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);
  const [partnerBarHeight, setPartnerBarHeight] = React.useState(0);

  const calcHeight = innerHeight + 32;
  const estimatedLogoHeight = (outerHeight - partnerBarHeight - 64);
  const fixedHeight = (estimatedLogoHeight * 3) < width || estimatedLogoHeight * 1.1 > width;

  const outerRef = React.useRef(null);
  const partnerBarRef = React.useRef(null);

  const recalcSizes = () => {
    const viewportWidth = document.body.scrollWidth;
    setWidth(viewportWidth);
    const viewportHeight = window.innerHeight;
    setOuterHeight(viewportHeight);
  };

  const getOuterRefHeight = () => {
    if (!outerRef.current) return;
    const h = (outerRef.current as any).scrollHeight;
    setInnerHeight(h);
  };

  const getPartnerBarHeight = () => {
    if (!partnerBarRef.current) return;
    const h = (partnerBarRef.current as any).scrollHeight;
    setPartnerBarHeight(h);
  };

  React.useEffect(() => {
    recalcSizes();
    getOuterRefHeight();
    getPartnerBarHeight();

    const ob = new ResizeObserver(getOuterRefHeight);
    ob.observe(outerRef.current as any);

    window.addEventListener('resize', recalcSizes);

    return () => {
      window.removeEventListener('resize', recalcSizes);
      ob.disconnect();
    };
  }, []);

  React.useEffect(() => {
    getOuterRefHeight();
    getPartnerBarHeight();
  }, [outerRef, outerRef.current]);

  let calculatedHeightIfWidth = width / 2.5;
  if (width <= 386) calculatedHeightIfWidth -= 32;

  return (
    <Box
      sx={{
        display: fixedHeight ? '' : 'flex', height: fixedHeight ? '' : `calc(${outerHeight}px - 16px - 64px)`, width: '100%', flexDirection: 'column',
      }}
    >
      <Box sx={{ flexGrow: 1, height: fixedHeight ? `${calculatedHeightIfWidth}px` : '' }} ref={outerRef}>
        <Box sx={(theme) => ({
          marginTop: '-32px',
          position: 'absolute',
          width: `${width}px`,
          height: fixedHeight ? `${calculatedHeightIfWidth}px` : `${calcHeight}px`,
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
      <Box
        sx={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingY: '0.5rem',
        }}
        ref={partnerBarRef}
      >
        {partners.map((p) => (
          <Box sx={{
            height: '92px', width: '92px', display: 'flex', alignItems: 'center', padding: '0.25rem',
          }}
          >
            <Box>
              <a href={p.url} target="_blank" rel="noreferrer">
                <img
                  src={apiImageUrl(p.logoFilename)}
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
