import React from 'react';
import {
  Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Logged in Participant:
//
// Name (string) niet edit
// Email (string) (check validity) niet edit
// Password (string) (editable) > when edit 'confirm password'
// Association (selection field) wel edit
// Study (selection field) + if select other > text field wel edit
// Dietary wishes or allergies (text field) wel edit
// I give permission to share my information with the Partners of SNiC 2022 (checkbox)
//
// Save button
function ParticipantSettings() {
  interface State {
    password: string;
    showPassword: boolean;
  }
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <div>
        <TextField
          disabled
          id="name"
          label="Name"
          defaultValue="John Doe"
          variant="standard"
        />
        <TextField
          disabled
          id="email"
          label="Email"
          defaultValue="snicjes@celerit.nl"
          variant="standard"
        />
        <TextField
          disabled
          id="password"
          label="Password"
          defaultValue="John Doe"
          variant="standard"
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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

      </div>
    </Box>
  );
}

export default ParticipantSettings;
