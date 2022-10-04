import React from 'react';
import { Box } from '@mui/material';
import HeaderBackgroundColorBox from './HeaderBackgroundColorBox';

interface Props {
  lines: number;
}

function HeaderBackground({ lines }: Props) {
  const [width, setWidth] = React.useState(document.body.scrollWidth);

  const getWidth = () => {
    const viewportWidth = document.body.scrollWidth;
    setWidth(viewportWidth);
  };

  const height = 50 + lines;

  React.useEffect(() => {
    getWidth();
    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, []);

  React.useEffect(() => {
    const viewportWidth = document.body.scrollWidth;
    if (viewportWidth !== width) {
      getWidth();
    }
  });

  return (
    <Box
      id="header-background"
      sx={{
        position: 'absolute',
        left: 0,
        width,
        zIndex: 0,
        height: `${height}rem`,
        top: '-10rem',
        overflow: 'hidden',
      }}
    >
      <HeaderBackgroundColorBox
        rotate={8.5}
        height={`${height - 22.5}rem`}
        marginLeft="-5%"
        time={7}
        offset={-4}
      />
      <HeaderBackgroundColorBox
        rotate={-6}
        height={`${height - 22.5}rem`}
        marginLeft="-10%"
        time={11}
        offset={0}
      />
    </Box>
  );
}

export default HeaderBackground;
