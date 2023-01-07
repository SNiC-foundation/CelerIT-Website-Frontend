import React from 'react';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import TimeAgo from 'javascript-time-ago';
import { Client, SendSetPasswordReminderParams, User } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

function SetPasswordReminderModal() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [users, setUsers] = React.useState<User[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { showAlert } = React.useContext(AlertContext);
  const timeAgo = new TimeAgo('en-UK');

  React.useEffect(() => {
    if (date == null || !open) return;
    const client = new Client();
    client.getSetPasswordReminderUsers(date)
      .then((u) => setUsers(u))
      .catch(() => {
        showAlert({ severity: 'error', message: 'Could not fetch users due to an error' });
      })
      .finally(() => setLoading(false));
  }, [date, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmails = () => {
    if (users == null || date == null) return;
    setLoading(true);
    const client = new Client();
    client.sendSetPasswordReminder(
      new SendSetPasswordReminderParams({ date, ids: users.map((u) => u.id) }),
    )
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
          Send activation reminders
        </DialogTitle>
        <DialogContent>
          <DateTimePicker
            onChange={(value) => setDate(value)}
            value={date}
            renderInput={(fieldProps) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...fieldProps}
                error={date == null}
                required
                sx={{ marginTop: '0.5rem' }}
              />
            )}
            label="Account maximum registration date"
            views={['year', 'day', 'hours', 'minutes', 'seconds']}
          />
          <hr />
          The following people will receive an email that they should set a password.
          {date != null && users != null ? (
            <Box sx={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Name</th>
                    <th style={{ textAlign: 'left' }}>Email</th>
                    <th style={{ textAlign: 'left' }}>Account creation</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr>
                      <td style={{ paddingRight: '0.5rem' }}>{u.name}</td>
                      <td style={{ paddingRight: '0.5rem' }}>{u.email}</td>
                      <td>{timeAgo.format(u.createdAt)}</td>
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
            disabled={date == null || users == null || users.length === 0 || loading}
          >
            Send emails
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ m: '0.5rem' }}
      >
        Send activation reminders
      </Button>
    </>
  );
}

export default SetPasswordReminderModal;
