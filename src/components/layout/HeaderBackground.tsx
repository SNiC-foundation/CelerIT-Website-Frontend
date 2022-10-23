import React from 'react';
import { Box } from '@mui/material';
import HeaderBackgroundColorBox from './HeaderBackgroundColorBox';
import { useBodyScrollSize } from '../../hooks/useBodyScrollSize';

interface Props {
  lines: number;
}

function HeaderBackground({ lines }: Props) {
  const { width } = useBodyScrollSize();

  const height = 50 + lines;

  return (
    <Box
      id="header-background"
      sx={{
        position: 'absolute',
        left: 0,
        width,
        zIndex: -1,
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
