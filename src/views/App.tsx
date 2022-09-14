import React from 'react';
import { Box } from '@mui/material';
import LandingComponent from '../components/frontpage/LandingComponent';
import { Client, Partner } from '../clients/server.generated';

function App() {
  const [partners, setPartners] = React.useState<Partner[] | null>(null);

  React.useEffect(() => {
    const client = new Client();
    client.getAllPartners()
      .then((p) => setPartners(p));
  }, []);

  if (!partners) return null;

  return (
    <>
      <LandingComponent location="./CelerIT_animatie.mp4" partners={partners} />
      <Box sx={{ height: '1000px' }} />
    </>
  );
}

export default App;
