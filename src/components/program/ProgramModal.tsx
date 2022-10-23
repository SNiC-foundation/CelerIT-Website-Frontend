import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Button,
} from '@mui/material';
import {
  Activity, Client,
} from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount;
  open: boolean;
  handleClose: () => void;
}

function ProgramModal({ activity, open, handleClose }: Props) {
  const { showAlert } = React.useContext(AlertContext);

  let newDescription = activity.description;
  if (activity.description == null || activity.description === '') {
    newDescription = 'A description is not yet set';
  }

  let speakers = activity.speakers.map((speaker) => speaker.name).join(', ');
  if (speakers === '') {
    speakers = '-';
  }

  const handleSubscribe = async () => {
    if (activity.subscribe === undefined) return;

    const client = new Client();
    client.subscribeToActivity(activity.subscribe.id)
      .then(() => {
        showAlert({
          message: 'Successfully subscribed to this activity',
          severity: 'success',
        });
        handleClose();
        // TODO: Find a nicer way to reload data after successful subscription
        window.location.reload();
      })
      .catch((e) => {
        // TODO: Give a clearer error message to the user by expanding "message" below
        showAlert({
          message: 'Something went wrong with subscribing to this activity.',
          severity: 'error',
        });
        console.log(e);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
          {activity.programPart.beginTime.getUTCHours().toString().padStart(2, '0')}
          :
          {activity.programPart.beginTime.getUTCMinutes().toString().padStart(2, '0')}
          -
          {activity.programPart.endTime.getUTCHours().toString().padStart(2, '0')}
          :
          {activity.programPart.endTime.getUTCMinutes().toString().padStart(2, '0')}
          <hr style={{ opacity: '0.40' }} />
          {newDescription}
        </>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          // TODO: Look at how to do separate styling for disabled button
          // style={{ backgroundColor: '#df421d' }}
          onClick={(event) => {
            event.preventDefault();
            handleSubscribe();
          }}
          disabled={
            activity.subscribe === undefined // if this is not a subscribable activity
            || activity.nrOfSubscribers >= activity.subscribe.maxParticipants
            || activity.subscribe.subscriptionListOpenDate.getTime() > Date.now()
            || activity.subscribe.subscriptionListCloseDate.getTime() < Date.now()
          }
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProgramModal;
