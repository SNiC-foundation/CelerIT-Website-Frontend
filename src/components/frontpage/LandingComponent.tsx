import React from 'react';
import { Box } from '@mui/material';
import { useElementSize, useWindowSize } from 'usehooks-ts';
import { Partner } from '../../clients/server.generated';
import LandingPartnersComponent from './LandingPartnersComponent';
import { useBodyScrollSize } from '../../hooks/useBodyScrollSize';

interface Props {
  location: string;
  finalFrame?: string;
  shuffledPartners: Partner[];
}

function LandingComponent({
  location, shuffledPartners, finalFrame,
}: Props) {
  // Height of the outer box containing the animation and the partners
  const [outerRef, outerSizes] = useElementSize();
  const innerHeight = outerSizes.height;

  // Height of the window
  const windowSize = useWindowSize();
  const outerHeight = windowSize.height;

  // Height of the partners bar
  const [partnerBarRef, partnerSizes] = useElementSize();
  const partnerBarHeight = partnerSizes.height;

  // Width of the page
  const { width } = useBodyScrollSize();

  const calcHeight = innerHeight + 32;
  const estimatedLogoHeight = (outerHeight - partnerBarHeight - 64);
  const fixedHeight = (estimatedLogoHeight * 3) < width || estimatedLogoHeight * 1.1 > width;

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
          <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} poster={finalFrame} autoPlay muted playsInline>
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
        <LandingPartnersComponent shuffledPartners={shuffledPartners} />
      </Box>
    </Box>
  );
}

LandingComponent.defaultProps = ({
  finalFrame: undefined,
});

export default LandingComponent;
