import React from 'react';
import { Box, styled } from '@mui/material';
import { useElementSize } from 'usehooks-ts';
import { useBodyScrollSize } from '../../hooks/useBodyScrollSize';

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
  bottomBar?: boolean;
  supportBarHeight?: number;
  supportBarAngle?: number;
  verticalImageHeight?: number;
}

function SkewContentBox({
  image, children, inverse, supportBarHeight, supportBarAngle, verticalImageHeight, bottomBar,
}: Props) {
  const [ref, { height }] = useElementSize();
  const { width } = useBodyScrollSize();

  return (
    <>
      <Box
        sx={() => ({
          position: 'absolute',
          left: 0,
          transform: 'skewY(5deg)',
          width,
          marginTop: '6rem',
        })}
      >
        <Box sx={(theme) => ({
          width: '50%',
          overflow: 'hidden',
          position: 'fixed',
          left: '50%',
          transform: `skewY(-${5 + (supportBarAngle || 0)}deg) translateY(-5vw)`,
          backgroundColor: theme.palette.secondary.main,
          height: supportBarHeight,
        })}
        />
        {bottomBar ? (
          <Box sx={(theme) => ({
            width: '50%',
            overflow: 'hidden',
            position: 'fixed',
            left: '0',
            transform: `skewY(-${30 + (supportBarAngle || 0)}deg) translateY(20vw)`,
            backgroundColor: theme.palette.secondary.main,
            height: supportBarHeight,
          })}
          />
        ) : null}
        <Box
          ref={ref}
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            position: 'relative',
          })}
        >
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
  bottomBar: false,
});

export default SkewContentBox;
