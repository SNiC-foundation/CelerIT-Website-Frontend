import React from 'react';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, LinearProgress, Box,
} from '@mui/material';
import {
  Lock, Person, Visibility, VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Client, LoginParams } from '../../clients/server.generated';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    setLoading(true);
    const client = new Client();
    client.login(new LoginParams({
      email, password,
    }))
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setLoading(false);
      });
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

        <FormControl variant="standard" sx={{ my: 1, width: '100%' }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
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

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Button sx={{ color: 'text.disabled', mt: 2 }}>Forgot password</Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;
