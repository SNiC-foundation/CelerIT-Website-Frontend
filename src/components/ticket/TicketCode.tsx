import React from 'react';
import {
  Box, CardContent, Container, Paper, Typography,
} from '@mui/material';
import { Ticket } from '../../clients/server.generated';
import TypographyHeader from '../layout/TypographyHeader';

interface Props {
  ticket: Ticket;
}

function TicketCode({ ticket }: Props) {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ my: '3rem' }}>
        <CardContent>
          <TypographyHeader variant="h4" sx={{ marginBottom: '2rem', marginLeft: 0 }}>
            Ticket bar code
          </TypographyHeader>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            The bar code below contains your ticket code. Please have this bar code ready
            once you arrive at the conference, so we can have a fast checkin. You can print
            the code, or you can bring it on your phone. You can also find the code in your
            email.
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img alt={ticket.code} src={`/api/static/barcodes/${ticket.code}.png`} style={{ maxWidth: '100%' }} />
          </Box>
        </CardContent>
      </Paper>
    </Container>
  );
}

export default TicketCode;
