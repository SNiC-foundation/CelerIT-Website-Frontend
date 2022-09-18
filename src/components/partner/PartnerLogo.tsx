import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Info, Public } from '@mui/icons-material';
import { Partner } from '../../clients/server.generated';
import PartnerModal from './PartnerModal';
import TypographyHeader from '../layout/TypographyHeader';
import { apiImageUrl } from '../../helpers/apiHelper';

interface Props {
  partner: Partner;
  size: number;
  extensive?: boolean;
}

function PartnerLogo({ partner, size, extensive }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1.5rem',
        width: size,
      }}
    >
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1,
      }}
      >
        <img
          src={apiImageUrl(partner.logoFilename)}
          alt="logo"
          style={{ maxHeight: size, maxWidth: '100%' }}
        />
      </Box>
      {extensive ? (
        <Box>
          <TypographyHeader variant="h6" sx={{ paddingTop: '1rem', color: 'darkgrey', fontStyle: 'italic' }}>
            {partner.specialization}
          </TypographyHeader>
          {partner.shortDescription ? (
            <Box sx={{ marginTop: '0.5rem' }}>
              <Typography variant="body1">
                {partner.shortDescription}
              </Typography>
            </Box>
          ) : null}
          <Box sx={{ paddingTop: '1rem' }}>
            <Button href={partner.url} target="_blank" variant="contained" sx={{ marginRight: partner.description ? '1rem' : '' }}>
              <Public />
            </Button>
            {partner.description ? (
              <>
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                  <Info />
                </Button>
                <PartnerModal
                  partner={partner}
                  open={modalOpen}
                  handleClose={() => setModalOpen(false)}
                />
              </>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Paper>
  );
}

PartnerLogo.defaultProps = ({
  extensive: false,
});

export default PartnerLogo;
