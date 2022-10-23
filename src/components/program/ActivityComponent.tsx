import React from 'react';
import { Box } from '@mui/material';
import ProgramModal from './ProgramModal';
import { Activity } from '../../clients/server.generated';

interface Props {
  activity: Activity,
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
      <Box onClick={() => setModalOpen(true)} sx={{ cursor: 'pointer' }}>
        <h1>
          {`${activity.name}`}
        </h1>
        <h4>
          {`${activity.location}`}
        </h4>
        <p>
          {newDescription}
        </p>
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
