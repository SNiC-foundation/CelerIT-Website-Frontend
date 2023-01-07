import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Button, LinearProgress,
} from '@mui/material';
import {
  Activity, ApiException, Client,
} from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';
import { AuthContext } from '../../auth/AuthContextProvider';

export type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount;
  open: boolean;
  handleClose: () => void;
  getProgram: () => void;
}

function ProgramModal({
  activity, open, handleClose, getProgram,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = React.useContext(AlertContext);
  const { user, updateProfile } = React.useContext(AuthContext);

  let newDescription = activity.description;
  if (newDescription == null || newDescription === '' || newDescription === undefined) {
    newDescription = 'More information will follow soon.';
  }

  let speakers = activity.speakers.map((speaker) => speaker.name).join(', ');
  if (speakers === '') speakers = '-';

  const subscriptionListOpen = activity.subscribe
    ? activity.subscribe.subscriptionListOpenDate.getTime() < Date.now()
      && activity.subscribe.subscriptionListCloseDate.getTime() > Date.now()
    : false;

  const handleSubscribe = () => {
    if (activity.subscribe === undefined) return;

    setLoading(true);
    const client = new Client();
    client.subscribeToActivity(activity.id)
      .then(async () => {
        showAlert({
          message: 'Successfully subscribed to this activity',
          severity: 'success',
        });
        getProgram();
        await updateProfile();
        handleClose();
      })
      .catch((e: ApiException) => {
        showAlert({
          message: `Something went wrong with subscribing to this activity: ${JSON.parse(e.response).message}`,
          severity: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  let blockedMessage: string = '';
  if (activity.subscribe && user) {
    if (user.subscriptions.map((s) => s.id).includes(activity.subscribe.id)) {
      blockedMessage = 'You are already subscribed to this activity.';
    } else if (activity.subscribe.subscriptionListOpenDate.getTime() > Date.now()) {
      blockedMessage = `Subscription list opens at ${activity.subscribe.subscriptionListOpenDate.toLocaleString()}`;
    } else if (activity.subscribe.subscriptionListCloseDate.getTime() < Date.now()) {
      blockedMessage = 'Subscription list has closed.';
    } else if (activity.nrOfSubscribers >= activity.subscribe.maxParticipants) {
      blockedMessage = 'This activity is full.';
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {loading && (<LinearProgress />)}
      <DialogTitle sx={{ textAlign: 'center' }}>
        {activity.name}
      </DialogTitle>
      <DialogContent dividers>
        <>
          <strong>Speaker: </strong>
          {speakers}
          <br />
          <strong>Location: </strong>
          {activity.location}
          <br />
          <strong>Time: </strong>
          {activity.programPart.beginTime.toLocaleTimeString(undefined, { timeZone: 'Europe/Amsterdam', timeStyle: 'short' })}
          -
          {activity.programPart.endTime.toLocaleTimeString(undefined, { timeZone: 'Europe/Amsterdam', timeStyle: 'short' })}
          {!!activity.recordingUrl && (
            <>
              <br />
              <strong>Recording: </strong>
              <a href={activity.recordingUrl} title="Recording" target="_blank" rel="noreferrer">
                Click here to watch the recording
              </a>
            </>
          )}
          <hr style={{ opacity: '0.40', whiteSpace: 'pre-wrap' }} />
          {newDescription}
          {(blockedMessage !== '' || subscriptionListOpen) && (
            <>
              <hr style={{ opacity: '0.40' }} />
              <span style={{ fontStyle: 'italic' }}>{blockedMessage}</span>
              {blockedMessage !== '' && (<br />)}
              <span style={{ fontStyle: 'italic' }}>
                Subscription list closes on
                {' '}
                {activity.subscribe?.subscriptionListCloseDate.toLocaleString()}
                .
              </span>
            </>
          )}
        </>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={(event) => {
            event.preventDefault();
            handleClose();
          }}
        >
          Close
        </Button>
        {activity.subscribe && user && (
          <Button
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              handleSubscribe();
            }}
            color="secondary"
            disabled={blockedMessage !== ''}
          >
            {user.subscriptions.map((s) => s.activity.programPartId).includes(activity.programPartId) ? 'Switch' : 'Subscribe'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ProgramModal;
