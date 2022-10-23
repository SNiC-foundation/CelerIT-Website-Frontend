import React from 'react';
import {
  Box, Typography, Divider,
} from '@mui/material';
import ProgramModal from './ProgramModal';
import { Activity } from '../../clients/server.generated';

type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount,
}

function ActivityComponent(props: Props) {
  const {
    activity,
  } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  let newDescription = activity.description;
  if (activity.description == null || activity.description === '') {
    newDescription = 'A description is not yet set';
  }

  return (
    <>
      {/* TODO: Visualise currently subscribed activities by user */}
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
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default ActivityComponent;
