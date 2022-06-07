import React from 'react';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper,
} from '@mui/material';
import {
  Lock, Person, Visibility, VisibilityOff,
} from '@mui/icons-material';

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
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
          type={showPassword ? 'text' : 'password'}
          startAdornment={(
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
            )}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            )}
        />
      </FormControl>

      <Button variant="contained" sx={{ mt: 2 }}>Login</Button>
      <Button sx={{ color: 'text.disabled', mt: 2 }}>Forgot password</Button>
    </Paper>
  );
}

export default LoginForm;
