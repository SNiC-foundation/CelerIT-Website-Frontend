import React from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { Client, Speaker } from '../clients/server.generated';
import PageHeader from '../components/layout/PageHeader';
import SpeakerCard from '../components/speaker/SpeakerCard';

function SpeakersPage() {
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);

  React.useEffect(() => {
    const client = new Client();
    client.getAllSpeakers(true).then((s) => setSpeakers(s));
  }, []);

  if (speakers === undefined) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <PageHeader
        title="Speakers"
        text="The following amazing speakers will join us during the congress, either with their own talk, or part of a panel."
        lines={1}
        extraMargin={4}
      />
      <Grid
        container
        spacing={12}
        justifyContent="center"
      >
        {speakers.map((s) => (
          <Grid item xs={12} md={6} lg={4}>
            <SpeakerCard speaker={s} key={s.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SpeakersPage;
