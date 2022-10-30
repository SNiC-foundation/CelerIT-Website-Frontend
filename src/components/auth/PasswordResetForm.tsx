import React from 'react';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, LinearProgress, Box,
} from '@mui/material';
import {
  Lock, Visibility, VisibilityOff,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import validator from 'validator';
import { Client, ResetPasswordRequest } from '../../clients/server.generated';
import TypographyHeader from '../layout/TypographyHeader';
import PasswordResetFormRequirements from './PasswordResetFormRequirements';

function PasswordResetForm() {
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordReset = () => {
    setLoading(true);
    const client = new Client();
    client.resetPassword(new ResetPasswordRequest({
      newPassword: password1,
      token: token || '',
    }))
      .then(async () => {
        navigate('/login');
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const hasEightCharacters = (password1.length >= 8);

  const hasLowerCase = (/[a-z]/.test(password1));
  const hasUpperCase = (/[A-Z]/.test(password1));
  const hasNumbers = (/[0-9]/.test(password1));
  const hasSymbols = (validator.isStrongPassword(password1, {
    minLength: 0,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 1,
  }));

  const validPassword = hasEightCharacters
    && hasLowerCase
    && hasUpperCase
    && hasNumbers
    && hasSymbols;

  const notEqual = password1 !== password2 || password2.length === 0;

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
          Reset your password
        </TypographyHeader>
        <PasswordResetFormRequirements
          hasEightCharacters={hasEightCharacters}
          hasLowerCase={hasLowerCase}
          hasUpperCase={hasUpperCase}
          hasNumbers={hasNumbers}
          hasSymbols={hasSymbols}
        />
        <FormControl variant="standard" sx={{ my: 1, width: '100%' }} error={!validPassword}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword1 ? 'text' : 'password'}
            onChange={(event) => setPassword1(event.target.value)}
            value={password1}
            startAdornment={(
              <InputAdornment position="start">
                <Lock color={!validPassword ? 'error' : undefined} />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword1(!showPassword1)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my: 1, width: '100%' }} error={notEqual}>
          <InputLabel htmlFor="password">Password (repeat)</InputLabel>
          <Input
            id="password"
            type={showPassword2 ? 'text' : 'password'}
            onChange={(event) => setPassword2(event.target.value)}
            value={password2}
            startAdornment={(
              <InputAdornment position="start">
                <Lock color={notEqual ? 'error' : undefined} />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword2(!showPassword2)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
            error={notEqual}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handlePasswordReset}
          disabled={notEqual || !validPassword}
        >
          Reset password
        </Button>
      </Box>
    </Paper>
  );
}

export default PasswordResetForm;
