import React from 'react';
import {
  Box, Button, Checkbox, FormControl, FormControlLabel,
  LinearProgress, Paper, TextField, Typography,
} from '@mui/material';
import validator from 'validator';
import TypographyHeader from '../layout/TypographyHeader';
import { CreateParticipantUserParams, ParticipantInfo, RegisterUserParams } from '../../clients/server.generated';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleRegister: (params: RegisterUserParams) => Promise<void>;
}

function RegisterForm({ handleRegister }: Props) {
  const [token, setToken] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [dietaryWishes, setDietaryWishes] = React.useState('');
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = React.useState(false);
  const [agreeToSharingWithCompanies, setAgreeToSharingWithCompanies] = React.useState(true);
  const [studyProgram, setStudyProgram] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const my = 0.5;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await handleRegister(new RegisterUserParams({
        user: new CreateParticipantUserParams({
          email,
          name,
          dietaryWishes,
          agreeToPrivacyPolicy,
          participantInfo: new ParticipantInfo({
            agreeToSharingWithCompanies,
            studyProgram,
          }),
        }),
        token,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3}>
      {loading ? (<LinearProgress color="primary" />) : null}
      <Box
        sx={{
          p: 3, width: 'auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}
        component="form"
      >
        <TypographyHeader variant="h5">
          Activate your SNiC 2022: CelerIT ticket
        </TypographyHeader>
        <Typography variant="body1">
          With this form, you can activate your ticket for SNiC 2022: CelerIT on November 30th.
          If you have not yet received a ticket, but you think you should have one, please
          contact your study association.
        </Typography>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <TextField
            id="ticket"
            onChange={(event) => setToken(event.target.value)}
            value={token}
            variant="standard"
            required
            label="Ticket code"
            error={validator.isEmpty(email)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <TextField
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            variant="standard"
            required
            label="Email address"
            error={!validator.isEmail(email)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <TextField
            id="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            variant="standard"
            required
            label="Name"
            error={validator.isEmpty(name)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <TextField
            id="study-program"
            onChange={(event) => setStudyProgram(event.target.value)}
            value={studyProgram}
            required
            variant="standard"
            label="Study program"
            placeholder="Study program (please include Bachelor or Master)"
            error={validator.isEmpty(studyProgram)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <TextField
            id="diet"
            onChange={(event) => setDietaryWishes(event.target.value)}
            value={dietaryWishes}
            variant="standard"
            label="Dietary wishes"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ my, width: '100%' }} error={!agreeToPrivacyPolicy}>
          <FormControlLabel
            control={(
              <Checkbox
                value={agreeToPrivacyPolicy}
                onChange={(event) => setAgreeToPrivacyPolicy(event.target.checked)}
                required
              />
            )}
            label="I agree with the privacy policy*"
            sx={(theme) => ({
              color: !agreeToPrivacyPolicy
                ? theme.palette.error.main : undefined,
            })}
          />
        </FormControl>
        <Typography variant="body1" sx={{ textAlign: 'left', marginTop: my * 4 }}>
          During the SNiC 2022: CelerIT conference, we will use a QR-code system to share
          contact information of participants with this year&apos;s partners.
          Every participant will receive a personal QR code on their badge.
          When you have talked with a company, they may request to scan your QR code for
          your contact details. If the toggle below is checked, the company will receive
          your contact details after the conference. If you do not check the toggle below,
          a company can still scan your code, but they will not receive your contact information.
        </Typography>
        <FormControl variant="standard" sx={{ my, width: '100%' }}>
          <FormControlLabel
            control={(
              <Checkbox
                value={agreeToSharingWithCompanies}
                onChange={(event) => setAgreeToSharingWithCompanies(event.target.checked)}
              />
            )}
            label="I agree with sharing my contact information with companies"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

export default RegisterForm;
