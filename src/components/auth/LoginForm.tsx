import React from 'react';
import {
  Button, Container, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper,
} from '@mui/material';
import {
  Lock, Person, Visibility, VisibilityOff,
} from '@mui/icons-material';

interface State {
  showPassword: boolean;
}

function handleClickLogin() {
  alert('Je bent ingelogd');
}

function handleClickForgotPassword() {
  alert('Ja doe gewoon onthouden ofzo');
}

function LoginForm() {
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 3, width: 'auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}
      >
        <FormControl variant="standard" sx={{ my: 1, width: '100%' }}>
          <InputLabel htmlFor="user">Username</InputLabel>
          <Input
            id="user"
            startAdornment={(
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            )}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ my: 1, width: '100%' }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            startAdornment={(
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleClickLogin}>Login</Button>
        <Button sx={{ color: 'text.disabled', mt: 2 }} onClick={handleClickForgotPassword}>Forgot password</Button>
      </Paper>
    </Container>
  );
}

export default LoginForm;
