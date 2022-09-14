import React from 'react';
import { Paper } from '@mui/material';
import { Partner } from '../../clients/server.generated';
import PartnerPopover from './PartnerPopover';

interface Props {
  partner: Partner;
  size: string;
}

function PartnerLogo({ partner, size }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const logoFilename = partner.logoFilename != null ? partner.logoFilename.replace('\\', '/') : '';

  return (
    <Paper
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', width: size,
      }}
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
    >
      <img
        src={`/api/static/${logoFilename}`}
        alt="logo"
        style={{ maxHeight: size, maxWidth: '100%' }}
      />
      <PartnerPopover
        partner={partner}
        anchorEl={anchorEl}
        onMouseLeave={() => setAnchorEl(null)}
        size={size}
      />
    </Paper>
  );
}

export default PartnerLogo;
