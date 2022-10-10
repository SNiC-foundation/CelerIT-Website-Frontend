import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { Client, RegisterUserParams } from '../../clients/server.generated';

function Register() {
  const [registered, setRegistered] = React.useState(false);
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const closeRegisteredDialog = () => {
    navigate('/');
  };

  const closeErrorDialog = () => {
    setError(false);
  };

  const handleRegister = async (params: RegisterUserParams) => {
    const client = new Client();
    try {
      await client.registerUser(params);
      setRegistered(true);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: 'calc(100vh - 128px)' }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <RegisterForm handleRegister={handleRegister} />
      </Grid>

      <Dialog open={error} onClose={closeErrorDialog}>
        <DialogTitle>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Something went wrong registering your ticket. Please try again later.
            If it still does not work, please contact your study assocation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeErrorDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={registered} onClose={closeRegisteredDialog}>
        <DialogTitle>
          Success
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Step one of the activation of your ticket is successfully completed.
            Please follow the instructions in your email to finish the activation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeRegisteredDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Register;
