import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress,
} from '@mui/material';
import { Client } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

function FinalInfoModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { showAlert } = React.useContext(AlertContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmails = () => {
    setLoading(true);
    const client = new Client();
    client.sendFinalInfo()
      .then(() => handleClose())
      .catch(() => {
        showAlert({ severity: 'error', message: 'Could not send emails to users due to an error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {loading && <LinearProgress />}
        <DialogTitle>
          Send final information mail
        </DialogTitle>
        <DialogContent>
          Click the button below to send an email to all participants
          with the final information about the conference.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Close</Button>
          <Button
            onClick={handleSendEmails}
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            Send emails
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ m: '0.5rem' }}>Send final info email</Button>
    </>
  );
}

export default FinalInfoModal;
