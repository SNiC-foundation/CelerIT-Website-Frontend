import React from 'react';
import { Box, styled } from '@mui/material';

const ContextBoxElement = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
  },
  [theme.breakpoints.up('md')]: {
    flexBasis: '50%',
  },
  overflow: 'hidden',
  zIndex: 2,
}));

interface Props {
  image: string;
  children: React.ReactNode | React.ReactNode[];
}

function SkewContentBox({ image, children }: Props) {
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
    <>
      <Box
        ref={ref}
        sx={(theme) => ({
          position: 'absolute',
          left: 0,
          transform: 'skewY(5deg)',
          overflow: 'hidden',
          width,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          marginTop: '6rem',
        })}
      >
        <Box sx={() => ({
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        })}
        >
          <ContextBoxElement sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 1,
            },
          })}
          >
            <Box sx={{
              maxWidth: '768px',
              float: 'right',
              padding: '2rem 24px 4rem',
              width: '100%',
              transform: 'skewY(-5.1deg)',
            }}
            >
              {children}
            </Box>
          </ContextBoxElement>
          <ContextBoxElement sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              height: '200px',
            },
          })}
          >
            <Box sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
            />
          </ContextBoxElement>
        </Box>
      </Box>
      <Box sx={{ height: `calc(${height}px + 10rem)` }} />
    </>
  );
}

export default SkewContentBox;
