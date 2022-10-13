import React from 'react';
import {
  Alert,
  Button, Checkbox, Collapse, FormControl, FormControlLabel,
  TextField, Typography,
} from '@mui/material';
import validator from 'validator';
import {
  CreateParticipantUserParams, ParticipantInfo, RegisterUserParams, Ticket,
} from '../../clients/server.generated';
import TicketFormField from './TicketFormField';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleRegister: (params: RegisterUserParams) => Promise<void>;
}

function RegisterForm({ handleRegister }: Props) {
  const [ticket, setTicket] = React.useState<Ticket | undefined>(undefined);
  const [ticketValid, setTicketValid] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [dietaryWishes, setDietaryWishes] = React.useState('');
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = React.useState(false);
  const [agreeToSharingWithCompanies, setAgreeToSharingWithCompanies] = React.useState(true);
  const [studyProgram, setStudyProgram] = React.useState('');

  const my = 0.5;

  const handleSubmit = async () => {
    if (ticket === undefined) return;
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
      token: ticket.code,
    }));
  };

  return (
    <>
      <FormControl variant="standard" sx={{ my, width: '100%' }} error={!ticketValid}>
        <TicketFormField
          ticket={ticket}
          setTicket={setTicket}
          ticketValid={ticketValid}
          setTicketValid={setTicketValid}
        />
        <Collapse in={ticket !== undefined}>
          <Alert severity="info" sx={{ my: '1rem' }}>
            This is a valid ticket from
            {' '}
            {ticket ? ticket.association : ''}
            .
          </Alert>
        </Collapse>
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
        disabled={ticket === undefined
          || validator.isEmpty(email)
          || !validator.isEmail(email)
          || validator.isEmpty(name)
          || validator.isEmpty(studyProgram)
          || !agreeToPrivacyPolicy}
      >
        Submit
      </Button>
    </>
  );
}

export default RegisterForm;
