import React from 'react';
import { Box, Link } from '@mui/material';

interface Props {
  value: any;
}

export default function AdminTableExpandableCell({ value }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  if (value === null || value === undefined) {
    return <Box />;
  }

  if (typeof value !== 'string') {
    return <Box>{value.toString()}</Box>;
  }

  return (
    <Box sx={{ whiteSpace: 'pre-wrap' }}>
      {expanded ? value : value.slice(0, 200).trim()}
      {value.length > 200 && (
        <>
          {expanded ? '' : '...'}
          &nbsp;
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            sx={{ fontSize: 'inherit', cursor: 'pointer' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'view less' : 'view more'}
          </Link>
        </>
      )}
    </Box>
  );
}
