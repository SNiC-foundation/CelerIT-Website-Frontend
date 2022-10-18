import React from 'react';
import QRCode from 'react-qr-code';
import { Box, CircularProgress } from '@mui/material';
import { useElementSize } from 'usehooks-ts';
import { Client, Participant } from '../../clients/server.generated';

interface Props {
  participant: Participant;
}

function ParticipantQrCode({ participant }: Props) {
  const [code, setCode] = React.useState<string | undefined>(undefined);
  const [ref, { width }] = useElementSize();

  React.useEffect(() => {
    const client = new Client();
    client.getEncryptedParticipantId(participant.id)
      .then((c) => setCode(c));
  }, []);

  if (code === undefined) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%' }} ref={ref}>
      <QRCode
        size={width}
        style={{
          maxWidth: '100%', width: '100%', top: 0, left: 0, bottom: 0, right: 0, position: 'absolute',
        }}
        value={code}
      />
    </Box>
  );
}

export default ParticipantQrCode;
