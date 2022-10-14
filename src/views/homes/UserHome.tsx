import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { AuthContext } from '../../auth/AuthContextProvider';
import RegisterForm from '../../components/auth/RegisterForm';
import {
  Client,
  // eslint-disable-next-line camelcase
  Partial_UpdateParticipantParams_,
  // eslint-disable-next-line camelcase
  Partial_UserParams_,
  RegisterUserParams,
} from '../../clients/server.generated';
import TypographyHeader from '../../components/layout/TypographyHeader';
import ParticipantQrCode from '../../components/user/ParticipantQrCode';

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
        agreeToSharingWithCompanies: params.user.participantInfo.agreeToSharingWithCompanies,
        studyAssociation: user.participantInfo.studyAssociation,
      }));
    }

    await client.updateUser(user.id, new Partial_UserParams_({
      name: params.user.name,
      dietaryWishes: params.user.dietaryWishes,
      email: user.email,
      agreeToPrivacyPolicy: user.agreeToPrivacyPolicy,
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

      {user.participantInfo && (
      <Paper elevation={3} sx={{ my: '3rem' }}>
        <Box sx={{ p: 3 }}>
          <TypographyHeader variant="h4" sx={{ marginBottom: '2rem', marginLeft: 0 }}>
            QR Code
          </TypographyHeader>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            The QR code below can be scanned by companies to share your contact
            information with them.
          </Typography>
          <ParticipantQrCode participant={user.participantInfo} />
        </Box>
      </Paper>
      )}
    </Box>
  );
}

export default UserHome;
