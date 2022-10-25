import React from 'react';
import {
  Box, Typography, Divider,
} from '@mui/material';
import ProgramModal from './ProgramModal';
import { Activity, User } from '../../clients/server.generated';

type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount,
  user: User | undefined,
}

function ActivityComponent(props: Props) {
  const {
    activity,
    user,
  } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  let newDescription = activity.description;
  if (newDescription == null || newDescription === '' || newDescription === undefined) {
    newDescription = 'A description is not yet set';
  }
  // TODO: Find a nice value for this magic number
  const maxLengthToDisplay = 50;
  if (newDescription.length > maxLengthToDisplay) {
    newDescription = `${newDescription.substring(0, maxLengthToDisplay)}...`;
  }

  return (
    <>
      <Box onClick={() => setModalOpen(true)} sx={{ cursor: 'pointer' }}>
        <Typography variant="h4">
          {`${activity.name}`}
        </Typography>
        <Typography variant="h6">
          {`${activity.location}`}
        </Typography>
        <Typography variant="body1">
          {newDescription}
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ textAlign: 'right' }}>
          {activity.nrOfSubscribers}
          /
          {activity.subscribe?.maxParticipants}
          {' '}
          subscribed
        </Typography>
      </Box>

      <ProgramModal
        activity={activity}
        user={user}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default ActivityComponent;
