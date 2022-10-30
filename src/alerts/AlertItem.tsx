import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { Alert as AlertObject } from './AlertContextProvider';

interface Props {
  alert: AlertObject;
}

function AlertItem({ alert }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={alert.time ? alert.time : 5000}
      onClose={handleClose}
      sx={{ maxWidth: 600 }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertItem;
