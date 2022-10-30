import React from 'react';
import { Grid } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';

function Login() {
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
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default Login;
