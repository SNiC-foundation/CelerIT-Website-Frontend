import React from 'react';
import { Box, Popover } from '@mui/material';
import { Info, Public } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Partner } from '../../clients/server.generated';
import PartnerModal from './PartnerModal';

interface Props {
  partner: Partner;
  anchorEl: HTMLElement | null;
  onMouseLeave: () => void;
  size: string;
}

function PartnerPopover({
  partner, anchorEl, onMouseLeave, size,
}: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const logoFilename = partner.logoFilename ? partner.logoFilename.replaceAll('\\', '/') : '';

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Box onMouseLeave={onMouseLeave} sx={{ margin: '1rem', textAlign: 'center' }}>
          <img src={`/api/static/${logoFilename}`} alt="logo" style={{ height: size }} />
          <br />
          <Box sx={{ paddingTop: '1rem', color: 'darkgrey', fontStyle: 'italic' }}>
            {partner.specialization}
          </Box>
          <Box sx={{ paddingTop: '1rem' }}>
            <Button href={partner.url} target="_blank" variant="contained" sx={{ marginRight: '1rem' }}>
              <Public />
            </Button>
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              <Info />
            </Button>
          </Box>
        </Box>
      </Popover>
      <PartnerModal partner={partner} open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}

export default PartnerPopover;
