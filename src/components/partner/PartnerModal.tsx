import React from 'react';
import {
  Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import { Partner } from '../../clients/server.generated';

interface Props {
  partner: Partner;
  open: boolean;
  handleClose: () => void;
}

function PartnerModal({ partner, open, handleClose }: Props) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {partner.name}
      </DialogTitle>
      <DialogContent sx={{ whiteSpace: 'pre-wrap' }}>
        {partner.description}
      </DialogContent>
    </Dialog>
  );
}

export default PartnerModal;
