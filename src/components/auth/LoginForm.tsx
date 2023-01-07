import React from 'react';
import {
  Button, IconButton, Input, InputAdornment, InputLabel, FormControl, Paper, LinearProgress, Box,
  FormControlLabel, Switch,
} from '@mui/material';
import {
  Lock, Person, Visibility, VisibilityOff,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Client, LoginParams } from '../../clients/server.generated';
import { AuthContext } from '../../auth/AuthContextProvider';
import { AlertContext } from '../../alerts/AlertContextProvider';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { updateProfile } = React.useContext(AuthContext);
  const { showAlert } = React.useContext(AlertContext);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    const client = new Client();
    client.login(new LoginParams({
      email, password, rememberMe,
    }))
      .then(async () => {
        await updateProfile();
        navigate('/');
      })
      .catch(() => {
        setLoading(false);
        showAlert({
          message: 'Invalid username and/or password. Please try again.',
          severity: 'error',
        });
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
        component="form"
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
        <FormControl variant="standard" sx={{ my: 1, width: '100%' }}>
          <Box>
            <FormControlLabel
              control={<Switch checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} />}
              label="Remember me"
            />
          </Box>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Button
          component={Link}
          sx={{ color: 'text.disabled', mt: 2, marginLeft: 1 }}
          to="/forgot-password"
        >
          Forgot password
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;
