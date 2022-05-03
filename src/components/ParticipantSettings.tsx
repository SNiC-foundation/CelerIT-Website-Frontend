import React from 'react';
import {
  Box, FormControl, IconButton, Input, InputAdornment,
  InputLabel, MenuItem, Select,
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
    association: string;
  }

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
    association: '',
  });
  const [association, setAssociation] = React.useState('');

  const handleChange = (
    prop: keyof State,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="password"
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
        <FormControl fullWidth>
          <InputLabel id="association">Age</InputLabel>
          <Select
            labelId="association-label"
            id="association"
            value={association}
            label="Association"
            onChange={(event) => setAssociation(event.target.value)}
          >
            <MenuItem value="A Eskwadraat">A-Eskwadraat</MenuItem>
            <MenuItem value="ASCII">ASCII</MenuItem>
            <MenuItem value="Cognac">Cognac</MenuItem>
            <MenuItem value="Cover">Cover</MenuItem>
            <MenuItem value="De Leidsche Flesch">De Leidsche Flesch</MenuItem>
            <MenuItem value="GEWIS">GEWIS</MenuItem>
            <MenuItem value="Inter Actief">CInter-Actief</MenuItem>
            <MenuItem value="Sticky">Sticky</MenuItem>
            <MenuItem value="Thalia">Thalia</MenuItem>
            <MenuItem value="via">via</MenuItem>

          </Select>
        </FormControl>

      </div>
    </Box>
  );
}

export default ParticipantSettings;
