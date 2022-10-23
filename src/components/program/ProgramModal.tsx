import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, Button,
} from '@mui/material';
import { Activity } from '../../clients/server.generated';

interface Props {
  activity: Activity;
  open: boolean;
  handleClose: () => void;
}

function ProgramModal({ activity, open, handleClose }: Props) {
  const subscribe = () => {
    console.log('test');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {activity.name}
      </DialogTitle>
      <DialogContent dividers>
        <>
          <strong>Speaker: </strong>
          {activity.speaker}
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
          {activity.description}
        </>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ backgroundColor: '#df421d' }}
          onClick={(event) => {
            event.preventDefault();
            subscribe();
          }}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProgramModal;
