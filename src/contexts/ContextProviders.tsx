import React from 'react';
import AuthContextProvider from '../auth/AuthContextProvider';
import AlertContextProvider from '../alerts/AlertContextProvider';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

function ContextProviders({ children }: Props) {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        {children}
      </AlertContextProvider>
    </AuthContextProvider>
  );
}

export default ContextProviders;
