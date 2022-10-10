import React from 'react';
import { Grid } from '@mui/material';
import PasswordResetForm from '../../components/auth/PasswordResetForm';

function ResetPassword() {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <Grid item xs={12} md={6} lg={4}>
        <PasswordResetForm />
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
