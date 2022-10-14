import React from 'react';
import QRCode from 'react-qr-code';
import { CircularProgress } from '@mui/material';
import { Client, Participant } from '../../clients/server.generated';

interface Props {
  participant: Participant;
}

function ParticipantQrCode({ participant }: Props) {
  const [code, setCode] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const client = new Client();
    client.getEncryptedParticipantId(participant.id)
      .then((c) => setCode(c));
  }, []);

  if (code === undefined) {
    return <CircularProgress />;
  }

  return (
    <QRCode
      size={256}
      style={{ maxWidth: '100%', width: '100%' }}
      value={code}
    />
  );
}

export default ParticipantQrCode;
