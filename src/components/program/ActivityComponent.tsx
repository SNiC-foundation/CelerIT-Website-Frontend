import React from 'react';
import {
  Box, Typography, Divider,
} from '@mui/material';
import ProgramModal from './ProgramModal';
import { Activity, User } from '../../clients/server.generated';

export type ActivityWithParticipantAmount = Activity & {
  nrOfSubscribers: number;
}

interface Props {
  activity: ActivityWithParticipantAmount,
  user: User | undefined,
  getProgram: () => void,
}

function ActivityComponent({ activity, user, getProgram }: Props) {
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

  console.log(modalOpen);

  return (
    <>
      <Box
        onClick={(event) => {
          console.log('open');
          event.preventDefault();
          setModalOpen(true);
        }}
        sx={{
          cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column',
        }}
      >
        {/* TODO: Visualise currently subscribed activities by user */}
        <Box sx={{ marginBottom: '0.5rem', flex: 1 }}>
          <Typography variant="h5">
            {`${activity.name}`}
          </Typography>
          <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
            {`${activity.location}`}
          </Typography>
          <Typography variant="body1">
            {newDescription}
          </Typography>
        </Box>
        {activity.subscribe && (
        <Box sx={{ width: '100%' }}>
          <Divider />
          <Typography variant="body1" sx={{ textAlign: 'right' }}>
            {activity.nrOfSubscribers}
            /
            {activity.subscribe?.maxParticipants}
            {' '}
            subscribed
          </Typography>
        </Box>
        )}
      </Box>

      <ProgramModal
        activity={activity}
        user={user}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        getProgram={getProgram}
      />
    </>
  );
}

export default ActivityComponent;
