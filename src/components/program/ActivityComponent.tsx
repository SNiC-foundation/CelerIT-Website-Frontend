import React from 'react';
import {
  Box, Typography, Divider,
} from '@mui/material';
import ProgramModal, { ActivityWithParticipantAmount } from './ProgramModal';

interface Props {
  activity: ActivityWithParticipantAmount,
  getProgram: () => void,
}

function ActivityComponent({ activity, getProgram }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Box
        onClick={(event) => {
          event.preventDefault();
          setModalOpen(true);
        }}
        sx={{
          cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column',
        }}
      >
        <Box sx={{ marginBottom: '0.5rem', flex: 1 }}>
          <Typography variant="h5">
            {activity.name}
          </Typography>
          <Typography variant="h6" sx={{ fontStyle: 'italic' }}>
            {activity.location}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {activity.description || 'A description is not yet set'}
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
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        getProgram={getProgram}
      />
    </>
  );
}

export default ActivityComponent;
