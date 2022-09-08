import React from 'react';
import { Box } from '@mui/material';
import { Partner } from '../../clients/server.generated';
import PartnerPopover from './PartnerPopover';

interface Props {
  partner: Partner;
  size: string;
}

function PartnerLogo({ partner, size }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  return (
    <Box>
      <img
        src="https://join.gewis.nl/img/gewis.png"
        alt="logo"
        onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
        style={{ height: size }}
      />
      <PartnerPopover
        partner={partner}
        anchorEl={anchorEl}
        onMouseLeave={() => setAnchorEl(null)}
        size={size}
      />
    </Box>
  );
}

export default PartnerLogo;
