import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Client, ForgotPasswordRequest } from '../../clients/server.generated';
import PasswordForgotForm from '../../components/auth/PasswordForgotForm';

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();

  const closeRegisteredDialog = () => {
    navigate('/');
  };

  const closeErrorDialog = () => {
    setError(false);
  };

  const handleForgotPassword = async (params: ForgotPasswordRequest) => {
    const client = new Client();
    try {
      await client.forgotPassword(params);
      setSent(true);
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
      <Grid item xs={12} md={6} lg={4}>
        <PasswordForgotForm handleForgotPassword={handleForgotPassword} />
      </Grid>

      <Dialog open={error} onClose={closeErrorDialog}>
        <DialogTitle>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Something went wrong resetting your password. Please try again later.
            If it still does not work, please contact your study assocation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeErrorDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={sent} onClose={closeRegisteredDialog}>
        <DialogTitle>
          Success
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Password reset request successfully received.
            Please follow the instructions in your email to reset your password.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeRegisteredDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ForgotPassword;
