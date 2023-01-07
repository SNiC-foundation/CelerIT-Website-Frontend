import React, { FormEvent } from 'react';
import {
  Alert,
  Box, Button, CardContent, CircularProgress, FormControl, Grid, Paper, TextField,
} from '@mui/material';
import {
  Check, Clear, PriorityHigh, QuestionMark,
} from '@mui/icons-material';
import { useElementSize } from 'usehooks-ts';
import TypographyHeader from '../../components/layout/TypographyHeader';
import { ApiException, Client, Ticket } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';
import TicketCheckInInfo from '../../components/ticket/TicketCheckInInfo';
import TicketScanHistory from '../../components/ticket/TicketScanHistory';
import TicketTrackInfo from '../../components/ticket/TicketTrackInfo';

function CheckIn() {
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [ticket, setTicket] = React.useState<Ticket | null>(null);

  const { showAlert } = React.useContext(AlertContext);
  const [ref, { width }] = useElementSize();

  const handleCodeSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);
    const client = new Client();
    client.scanSingleTicket(code).then((t) => {
      if (t != null) {
        setTicket(t);
      } else {
        setTicket(null);
      }
    }).catch((e: ApiException) => {
      showAlert({ severity: 'error', message: e.response });
      setTicket(null);
    }).finally(() => {
      setLoading(false);
      setCode('');
    });
  };

  let codeIcon;
  let alert;
  if (loading) {
    codeIcon = (<CircularProgress size="50%" />);
  } else if (ticket == null) {
    codeIcon = (<Clear color="error" sx={{ width: '100%', height: '100%' }} />);
  } else if (ticket.user == null) {
    codeIcon = (<QuestionMark color="warning" sx={{ width: '100%', height: '100%' }} />);
    alert = (<Alert sx={{ mb: '1rem' }} severity="warning">This ticket has not been activated on the CelerIT website! Please send this person to support.</Alert>);
  } else if (ticket.user.subscriptions.length === 0) {
    codeIcon = (<PriorityHigh color="info" sx={{ width: '100%', height: '100%' }} />);
    alert = (<Alert sx={{ mb: '1rem' }} severity="info">This visitor was too late with activating their ticket. Please give them an empty badge!</Alert>);
  } else {
    codeIcon = (<Check color="success" sx={{ width: '100%', height: '100%' }} />);
  }

  return (
    <>
      <TypographyHeader variant="h2" sx={{ textAlign: 'center', margin: '1rem 0 2rem' }}>
        Check in participants
      </TypographyHeader>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <CardContent>
              <Box
                component="form"
                onSubmit={handleCodeSubmit}
                sx={{ textAlign: 'center' }}
              >
                <FormControl fullWidth>
                  <TextField
                    label="Ticket code"
                    id="ticket"
                    onChange={(event) => setCode(event.target.value)}
                    value={code}
                    autoFocus
                    autoComplete="off"
                  />
                </FormControl>
                <Button variant="contained" type="submit" sx={{ my: '1rem' }}>
                  Check code
                </Button>
              </Box>
              <Box
                ref={ref}
                sx={{
                  width: '100%',
                  height: width,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {codeIcon}
              </Box>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <CardContent>
              {alert}
              <Box sx={{ marginBottom: '1rem' }}>
                <TypographyHeader variant="h5">
                  Scanned ticket
                </TypographyHeader>
                <TicketCheckInInfo ticket={ticket} />
              </Box>
              <Box sx={{ marginBottom: '1rem' }}>
                <TypographyHeader variant="h5">
                  Tracks
                </TypographyHeader>
                <TicketTrackInfo ticket={ticket} />
              </Box>
              <Box>
                <TypographyHeader variant="h5">
                  Scan history
                </TypographyHeader>
                <TicketScanHistory ticket={ticket} />
              </Box>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default CheckIn;
