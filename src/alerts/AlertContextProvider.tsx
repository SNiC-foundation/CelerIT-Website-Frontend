import React from 'react';
import { AlertColor } from '@mui/material';

export interface AlertInput {
  severity: AlertColor;
  message: string;
  time?: number;
}

export interface Alert extends AlertInput {
  date: number;
}

export interface IAlertContext {
  alerts: Alert[];
  // eslint-disable-next-line no-unused-vars
  showAlert: (alert: AlertInput) => void;
}

export const AlertContext = React.createContext<IAlertContext>({
  alerts: [],
  showAlert: () => {},
});

interface Props {
  children: React.ReactNode | React.ReactNode[],
}

function AlertContextProvider({ children }: Props) {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  const showAlert = (alert: AlertInput) => {
    setAlerts([
      ...alerts,
      {
        ...alert,
        date: Date.now(),
      },
    ]);
  };

  const alertContext = React.useMemo(() => (({
    alerts,
    showAlert,
  })), [alerts]);

  return (
    <AlertContext.Provider value={alertContext}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContextProvider;
