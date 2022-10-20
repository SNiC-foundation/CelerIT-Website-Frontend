import React from 'react';
import { Box } from '@mui/material';
import { AlertContext } from './AlertContextProvider';
import AlertItem from './AlertItem';

function AlertContainer() {
  const { alerts } = React.useContext(AlertContext);

  return (
    <Box>
      {alerts.map((alert) => (
        <AlertItem alert={alert} key={alert.date} />
      ))}
    </Box>
  );
}

export default AlertContainer;
