import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { AuthContext } from '../../auth/AuthContextProvider';
import RegisterForm from '../../components/auth/RegisterForm';
import {
  Client, Partial_UpdateParticipantParams_, Partial_UserParams_,
  RegisterUserParams,
} from '../../clients/server.generated';
import TypographyHeader from '../../components/layout/TypographyHeader';
import TicketCode from '../../components/ticket/TicketCode';
import ParticipantQRCodeComponent from '../../components/user/ParticipantQRCodeComponent';

function UserHome() {
  const { user } = React.useContext(AuthContext);

  const navigate = useNavigate();

  if (user === undefined) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (params: RegisterUserParams) => {
    const client = new Client();
    if (user.participantInfo) {
      await client.updateParticipant(user.participantInfo.id, new Partial_UpdateParticipantParams_({
        studyProgram: params.user.participantInfo.studyProgram,
      }));
    }

    await client.updateUserProfile(user.id, new Partial_UserParams_({
      name: params.user.name,
      dietaryWishes: params.user.dietaryWishes,
    }));
  };

  return (
    <Box>
      <Paper elevation={3}>
        <Box sx={{ p: 3 }}>
          <TypographyHeader variant="h4" sx={{ marginBottom: '2rem', marginLeft: 0 }}>
            Update your personal information
          </TypographyHeader>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            Below you can update your personal information. If you wish to
            change your email address (for example because you gave your
            ticket to someone else), please contact your study association.
          </Typography>
          <RegisterForm user={user} handleSubmit={handleSubmit} />
        </Box>
      </Paper>

      {user.participantInfo && (<ParticipantQRCodeComponent participant={user.participantInfo} />)}

      {user.ticket && (<TicketCode ticket={user.ticket} />)}
    </Box>
  );
}

export default UserHome;
