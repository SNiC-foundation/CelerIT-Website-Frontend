import React from 'react';
import { Box, Typography } from '@mui/material';
import HeaderBackground from './HeaderBackground';
import TypographyHeader from './TypographyHeader';

interface Props {
  title: string;
  text: string;
  lines: number;
  extraMargin?: number;
}

function PageHeader({
  title, text, lines, extraMargin,
}: Props) {
  const marginBottom = 9 + (extraMargin || 0);

  return (
    <>
      <HeaderBackground lines={lines} />
      <Box sx={{
        marginBottom: `${marginBottom}rem`, zIndex: 10, position: 'relative', color: 'white', textShadow: '1px 1px 6px #000',
      }}
      >
        <TypographyHeader variant="h1">
          {title}
        </TypographyHeader>
        <Typography variant="body1">
          {text}
        </Typography>
      </Box>
    </>
  );
}

PageHeader.defaultProps = ({
  extraMargin: 0,
});

export default PageHeader;
