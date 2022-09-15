import React from 'react';
import { Box, styled } from '@mui/material';

const ColoredBox = styled(Box)(({ theme }) => ({
  width: '120%',
  backgroundImage: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
  position: 'absolute',
  boxShadow: '1px 1px 20px #000',
}));

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
      <ColoredBox
        sx={() => ({
          transform: 'rotate(8.5deg)',
          height: `${height - 22.5}rem`,
          marginLeft: '-5%',
        })}
      />
      <ColoredBox
        sx={() => ({
          transform: 'rotate(-6deg)',
          height: `${height - 22.5}rem`,
          marginLeft: '-10%',
        })}
      />
    </Box>
  );
}

export default HeaderBackground;
