import React from 'react';
import Container from '@mui/material/Container';
import { Box, Paper, Typography } from '@mui/material';
import { Participant } from '../../clients/server.generated';
import TypographyHeader from '../layout/TypographyHeader';
import ParticipantQrCode from './ParticipantQrCode';

interface Props {
  participant: Participant;
}

function ParticipantQRCodeComponent({ participant }: Props) {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ my: '3rem' }}>
        <Box sx={{ p: 3 }}>
          <TypographyHeader variant="h4" sx={{ marginBottom: '2rem', marginLeft: 0 }}>
            QR Code
          </TypographyHeader>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            The QR code below can be scanned by companies to share your contact
            information with them.
          </Typography>
          <ParticipantQrCode participant={participant} />
        </Box>
      </Paper>
    </Container>
  );
}

export default ParticipantQRCodeComponent;
