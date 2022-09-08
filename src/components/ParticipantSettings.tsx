import React from 'react';
import {
  // eslint-disable-next-line max-len
  Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputAdornment,
  InputLabel, MenuItem, Select, Stack,
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

interface Props {
  create: boolean;
}

interface State {
  password: string;
  showPassword: boolean;
  association: string;
  study: string;
}

function ParticipantSettings(props: Props) {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
    association: '',
    study: '',
  });

  const [association, setAssociation] = React.useState('');
  const [study, setStudy] = React.useState('');

  const { create } = props;

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
      <Stack spacing={2}>
        <TextField
          disabled={!create}
          id="name"
          label="Name"
          defaultValue="John Doe"
          variant="standard"
        />
        <TextField
          disabled={!create}
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
          <InputLabel id="association">Association</InputLabel>
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
            <MenuItem value="Inter Actief">Inter-Actief</MenuItem>
            <MenuItem value="Sticky">Sticky</MenuItem>
            <MenuItem value="Thalia">Thalia</MenuItem>
            <MenuItem value="via">via</MenuItem>

          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="study">Study</InputLabel>
          <Select
            labelId="study-label"
            id="study"
            value={study}
            label="Study"
            onChange={(event) => setStudy(event.target.value)}
          >
            <MenuItem value="Bsc Computer Science">Bsc Computer Science</MenuItem>
            <MenuItem value="Bsc Artificial Intelligence">Bsc Artificial Intelligence</MenuItem>
            <MenuItem value="Bsc Mathematics">Bsc Mathematics</MenuItem>
            <MenuItem value="Msc Computer Science">Msc Computer Science</MenuItem>
            <MenuItem value="Msc Artificial Intelligence"> Msc Artificial Intelligence</MenuItem>
            <MenuItem value="Msc Mathematics">Msc Mathematics</MenuItem>
            <MenuItem value="Other">
              Other...
            </MenuItem>

          </Select>
        </FormControl>
        {study === 'Other'
          ? (
            <TextField
              id="other"
              style={{ margin: 8 }}
              label="Other"
              placeholder="Bsc/Msc + study name"
              fullWidth
              variant="standard"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : null}
        <TextField
          id="diet"
          label="Dietary wishes and/or allergies"
          defaultValue=""
          variant="standard"
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="I give permission to share my information with Partners of SNiC 2022 (optional)"
            sx={(theme) => ({ color: theme.palette.text.primary })}
          />
        </FormGroup>
        <Button variant="contained" style={{ maxWidth: '50px' }}>Save</Button>
      </Stack>
    </Box>
  );
}

export default ParticipantSettings;
