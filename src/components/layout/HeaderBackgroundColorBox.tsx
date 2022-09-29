import React from 'react';
import { Box, keyframes, styled } from '@mui/material';

interface Props {
  rotate: number;
  height: string;
  marginLeft: string;
  time: number;
  offset: number;
}

function HeaderBackgroundColorBox({
  rotate, height, marginLeft, time, offset,
}: Props) {
  const shuffle = () => keyframes(`
    0% {
      transform: translateX(-100px) rotate(${rotate}deg)
    }
    100% {
      transform: translateX(100px) rotate(${rotate}deg)
    }
  `);

  const ColoredBox = styled(Box)(({ theme }) => ({
    width: 'calc(100% + 400px)',
    backgroundImage: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
    position: 'absolute',
    left: '-100px',
    boxShadow: '1px 1px 20px #000',
    animation: `${shuffle()} ${time}s ease ${offset}s infinite alternate`,
  }));

  return (
    <ColoredBox
      sx={() => ({
        height,
        marginLeft,
      })}
    />
  );
}

export default HeaderBackgroundColorBox;
