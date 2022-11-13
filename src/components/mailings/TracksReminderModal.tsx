import React from 'react';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress,
} from '@mui/material';
import { Client, User } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

function TracksReminderModal() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { showAlert } = React.useContext(AlertContext);

  React.useEffect(() => {
    if (!open) return;
    const client = new Client();
    client.getTracksReminderUsers()
      .then((u) => setUsers(u))
      .catch(() => {
        showAlert({ severity: 'error', message: 'Could not fetch users due to an error' });
      })
      .finally(() => setLoading(false));
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmails = () => {
    if (users == null) return;
    setLoading(true);
    const client = new Client();
    client.sendTracksReminders(users.map((u) => u.id))
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
          Send track reminders
        </DialogTitle>
        <DialogContent>
          The following people will receive an email that they should subscribe
          to one or more tracks.
          {users != null ? (
            <Box sx={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Name</th>
                    <th style={{ textAlign: 'left' }}>Email</th>
                    <th style={{ textAlign: 'left' }}>Nr of tracks</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr>
                      <td style={{ paddingRight: '0.5rem' }}>{u.name}</td>
                      <td style={{ paddingRight: '0.5rem' }}>{u.email}</td>
                      <td>{u.subscriptions.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ) : (<span style={{ fontStyle: 'italic' }}>Nobody.</span>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Close</Button>
          <Button
            onClick={handleSendEmails}
            variant="contained"
            color="secondary"
            disabled={users == null || users.length === 0 || loading}
          >
            Send emails
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ m: '0.5rem' }}>Send track reminders</Button>
    </>
  );
}

export default TracksReminderModal;
