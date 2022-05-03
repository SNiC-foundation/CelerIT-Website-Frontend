import React from 'react';
import {
  Button, Container, InputAdornment, Paper, TextField,
} from '@mui/material';
import { Lock, Person } from '@mui/icons-material';
// import logo from './logo.svg';
// import './App.css';

function LoginForm() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3 }}>
        <TextField
          id="input-with-icon-textfield"
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          id="input-with-icon-textfield"
          label="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <br />
        <br />
        <Button variant="contained">Login</Button>
        <Button sx={{ color: 'text.disabled' }}>Forgot password</Button>
      </Paper>
    </Container>
  );
}

export default LoginForm;
