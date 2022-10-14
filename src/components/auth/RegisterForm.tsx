import React from 'react';
import {
  Alert,
  Button, Checkbox, CircularProgress, Collapse, FormControl, FormControlLabel,
  TextField, Typography,
} from '@mui/material';
import validator from 'validator';
import {
  CreateParticipantUserParams, ParticipantInfo, RegisterUserParams, Ticket, User,
} from '../../clients/server.generated';
import TicketFormField from './TicketFormField';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (params: RegisterUserParams) => Promise<void>;
  user?: User;
}

function RegisterForm({ user, handleSubmit }: Props) {
  const [ticket, setTicket] = React.useState<Ticket | undefined>(user ? user.ticket : undefined);
  const [ticketValid, setTicketValid] = React.useState(!!(user && user.ticket));
  const [email, setEmail] = React.useState(user ? user.email : '');
  const [name, setName] = React.useState(user ? user.name : '');
  const [dietaryWishes, setDietaryWishes] = React.useState(user ? user.dietaryWishes : '');
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = React.useState(
    user ? user.agreeToPrivacyPolicy : false,
  );
  const [agreeToSharingWithCompanies, setAgreeToSharingWithCompanies] = React.useState(
    user && user.participantInfo ? user.participantInfo.agreeToSharingWithCompanies : true,
  );
  const [studyProgram, setStudyProgram] = React.useState(
    user && user.participantInfo ? user.participantInfo.studyProgram : '',
  );

  const [loading, setLoading] = React.useState(false);

  const my = 0.5;

  const disabled = user !== undefined;

  const handleSubmitButton = async () => {
    if (ticket === undefined && user == null) return;
    setLoading(true);
    await handleSubmit(new RegisterUserParams({
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
      token: ticket?.code ?? '',
    }));
    setLoading(false);
  };

  const ticketField = () => {
    if (user && !user.ticket) return null;
    return (
      <FormControl variant="standard" sx={{ my, width: '100%' }} error={!ticketValid}>
        <TicketFormField
          ticket={ticket}
          setTicket={setTicket}
          ticketValid={ticketValid}
          setTicketValid={setTicketValid}
          disabled={disabled}
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
    );
  };

  const studyProgramField = () => {
    if (user && !user.participantInfo) return null;
    return (
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
    );
  };

  const dataSharingField = () => {
    if (user && !user.participantInfo) return null;
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      {ticketField()}
      <FormControl variant="standard" sx={{ my, width: '100%' }}>
        <TextField
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          variant="standard"
          required
          label="Email address"
          error={!validator.isEmail(email)}
          disabled={disabled}
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
      {studyProgramField()}
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
              checked={agreeToPrivacyPolicy}
              onChange={(event) => setAgreeToPrivacyPolicy(event.target.checked)}
              required
              disabled={disabled}
            />
            )}
          label="I agree with the privacy policy*"
          sx={(theme) => ({
            color: !agreeToPrivacyPolicy
              ? theme.palette.error.main : undefined,
          })}
        />
      </FormControl>
      {dataSharingField()}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={async (e) => {
          e.preventDefault();
          await handleSubmitButton();
        }}
        disabled={(ticket === undefined && user === undefined)
          || validator.isEmpty(email)
          || !validator.isEmail(email)
          || validator.isEmpty(name)
          || (validator.isEmpty(studyProgram) && user === undefined)
          || !agreeToPrivacyPolicy
          || loading}
      >
        Submit
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>
    </>
  );
}

RegisterForm.defaultProps = ({
  user: undefined,
});

export default RegisterForm;
