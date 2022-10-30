import React from 'react';
import {
  Button, Input, InputAdornment, InputLabel, FormControl, Paper, LinearProgress, Box,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import validator from 'validator';
import {
  ForgotPasswordRequest,
} from '../../clients/server.generated';
import TypographyHeader from '../layout/TypographyHeader';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleForgotPassword: (params: ForgotPasswordRequest) => void;
}

function PasswordForgotForm({ handleForgotPassword }: Props) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await handleForgotPassword(new ForgotPasswordRequest({
        email,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
    >
      {loading ? (<LinearProgress color="primary" />) : null}
      <Box
        sx={{
          p: 3, width: 'auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}
      >
        <TypographyHeader variant="h5">
          Forgot password
        </TypographyHeader>
        <FormControl variant="standard" sx={{ my: 1, width: '100%' }}>
          <InputLabel htmlFor="user">Email</InputLabel>
          <Input
            id="user"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            startAdornment={(
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={!validator.isEmail(email)}
        >
          Get password reset
        </Button>
      </Box>
    </Paper>
  );
}

export default PasswordForgotForm;
