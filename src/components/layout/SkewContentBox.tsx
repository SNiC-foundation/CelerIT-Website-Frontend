import React from 'react';
import { Box, styled } from '@mui/material';

const ContextBoxElement = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
  },
  [theme.breakpoints.up('md')]: {
    flexBasis: '50%',
  },
  zIndex: 2,
}));

interface Props {
  image: string;
  children: React.ReactNode | React.ReactNode[];
  inverse?: boolean;
  supportBarHeight?: number;
  supportBarAngle?: number;
  verticalImageHeight?: number;
}

function SkewContentBox({
  image, children, inverse, supportBarHeight, supportBarAngle, verticalImageHeight,
}: Props) {
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
          <Box sx={(theme) => ({
            width: '50%',
            overflow: 'hidden',
            position: 'absolute',
            left: '50%',
            transform: `skewY(-${5 + (supportBarAngle || 0)}deg) translateY(-4rem)`,
            backgroundColor: theme.palette.secondary.main,
            height: supportBarHeight,
          })}
          />
          <ContextBoxElement sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 1,
            },
            order: inverse ? 1 : undefined,
          })}
          >
            <Box sx={{
              maxWidth: '768px',
              float: inverse ? 'left' : 'right',
              padding: '3rem 48px 4rem',
              width: '100%',
              transform: 'skewY(-5.1deg)',
            }}
            >
              {children}
            </Box>
          </ContextBoxElement>
          <ContextBoxElement sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              height: verticalImageHeight,
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

SkewContentBox.defaultProps = ({
  inverse: false,
  supportBarHeight: 125,
  supportBarAngle: 8,
  verticalImageHeight: 200,
});

export default SkewContentBox;
