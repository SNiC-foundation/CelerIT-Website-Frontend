import React from 'react';
import {
  Box,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { Client, RegisterUserParams } from '../../clients/server.generated';
import TypographyHeader from '../../components/layout/TypographyHeader';
import { AlertContext } from '../../alerts/AlertContextProvider';

function Register() {
  const [registered, setRegistered] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { showAlert } = React.useContext(AlertContext);

  const closeRegisteredDialog = () => {
    navigate('/');
  };

  const handleRegister = async (params: RegisterUserParams) => {
    setLoading(true);
    const client = new Client();
    try {
      await client.registerUser(params);
      setRegistered(true);
    } catch (e) {
      showAlert({ message: 'Something went wrong registering your ticket. Please try again later. If it still does not work, please contact your study assocation.', severity: 'error', time: 8000 });
    } finally {
      setLoading(false);
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
        <Paper elevation={3}>
          {loading ? (<LinearProgress color="primary" />) : null}
          <Box
            sx={{
              p: 3, width: 'auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            }}
            component="form"
          >
            <TypographyHeader variant="h5">
              Activate your SNiC 2022: CelerIT ticket
            </TypographyHeader>
            <Typography variant="body1">
              With this form, you can activate your ticket for SNiC 2022: CelerIT on November 30th.
              If you have not yet received a ticket, but you think you should have one, please
              contact your study association.
            </Typography>
            <RegisterForm handleSubmit={handleRegister} />
          </Box>
        </Paper>
      </Grid>

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
