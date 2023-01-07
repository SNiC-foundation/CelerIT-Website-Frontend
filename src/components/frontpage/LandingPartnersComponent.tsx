import React from 'react';
import { Box } from '@mui/material';
import { Partner } from '../../clients/server.generated';
import { apiImageUrl } from '../../helpers/apiHelper';

interface Props {
  shuffledPartners: Partner[];
}

function LandingPartnersComponent({ shuffledPartners }: Props) {
  return (
    <>
      {shuffledPartners.map((p) => (
        <Box
          sx={{
            height: '92px', width: '92px', display: 'flex', alignItems: 'center', padding: '0.25rem',
          }}
          key={p.name}
        >
          <Box>
            <a href={p.url} target="_blank" rel="noreferrer">
              <img
                src={apiImageUrl(p.logoFilename)}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                alt={p.name}
              />
            </a>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default LandingPartnersComponent;
