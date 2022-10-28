import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Button, LinearProgress,
} from '@mui/material';
import {
  Activity, ApiException, Client, User,
} from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';

type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount;
  user: User | undefined;
  open: boolean;
  handleClose: () => void;
  getProgram: () => void;
}

function ProgramModal({
  activity, user, open, handleClose, getProgram,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = React.useContext(AlertContext);

  let newDescription = activity.description;
  if (newDescription == null || newDescription === '' || newDescription === undefined) {
    newDescription = 'A description is not yet set';
  }

  let speakers = activity.speakers.map((speaker) => speaker.name).join(', ');
  if (speakers === '') {
    speakers = '-';
  }

  const handleSubscribe = () => {
    if (activity.subscribe === undefined) return;

    setLoading(true);
    const client = new Client();
    client.subscribeToActivity(activity.id)
      .then(() => {
        showAlert({
          message: 'Successfully subscribed to this activity',
          severity: 'success',
        });
        getProgram();
        handleClose();
      })
      .catch((e: ApiException) => {
        showAlert({
          message: `Something went wrong with subscribing to this activity: ${e.message}`,
          severity: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

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
          onClick={(event) => {
            event.preventDefault();
            handleClose();
          }}
        >
          Close
        </Button>
        {activity.subscribe && (
          <Button
            variant="contained"
            // TODO: Look at how to do separate styling for disabled button
            // style={{ backgroundColor: '#df421d' }}
            onClick={(event) => {
              event.preventDefault();
              handleSubscribe();
            }}
            color="secondary"
            disabled={
              user === undefined // if you are not logged in
              || activity.nrOfSubscribers >= activity.subscribe.maxParticipants
              || activity.subscribe.subscriptionListOpenDate.getTime() > Date.now()
              || activity.subscribe.subscriptionListCloseDate.getTime() < Date.now()
            }
          >
            Subscribe
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ProgramModal;
