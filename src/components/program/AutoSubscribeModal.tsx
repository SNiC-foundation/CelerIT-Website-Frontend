import React from 'react';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress,
} from '@mui/material';
import { Activity, Client } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

function AutoSubscribeModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [activities, setActivities] = React.useState<Activity[] | null>(null);

  const { showAlert } = React.useContext(AlertContext);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;

    setLoading(true);
    const client = new Client();
    client.getAllActivities()
      .then((acts) => setActivities(acts
        .map((a) => a.activity)
        .filter((a) => !!a.subscribe)))
      .catch(() => showAlert({ severity: 'error', message: 'Could not fetch activities due to an error.' }))
      .finally(() => setLoading(false));
  }, [open]);

  const openActivities = activities ? activities
    .filter((a) => a.subscribe!.subscriptionListCloseDate.getTime() > Date.now()) : null;

  const handleSubmit = () => {
    setLoading(true);
    const client = new Client();
    client.subscribeRemainingUsers()
      .then(() => {
        showAlert({ severity: 'success', message: 'Successfully subscribed remaining users to activities' });
        handleClose();
      })
      .catch(() => {
        showAlert({
          severity: 'error',
          message: 'Could not assign remaining users to activities due to an error.',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        {loading && <LinearProgress />}
        <DialogTitle>
          Subscribe remaining users
        </DialogTitle>
        <DialogContent>
          <Box>
            By using this function, you can automatically sign up users for the remaining
            activities, if they are not subscribed to one or more tracks. Note that you can
            only do this when all subscription lists are closed.
          </Box>
          {(openActivities && openActivities.length > 0) && (
          <Box sx={{ marginTop: '1rem' }}>
            The following activities still have an open subscription list:
            <table>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>Name</th>
                  <th>Close date</th>
                </tr>
              </thead>
              <tbody>
                {openActivities.map((a) => (
                  <tr key={a.id}>
                    <td style={{ paddingRight: '0.5rem' }}>{a.name}</td>
                    <td>{a.subscribe!.subscriptionListCloseDate.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Close</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            disabled={loading || (!openActivities) || openActivities.length > 0}
          >
            Subscribe remaining users
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ m: '0.5rem' }}
      >
        Subscribe remaining users
      </Button>
    </>
  );
}

export default AutoSubscribeModal;
