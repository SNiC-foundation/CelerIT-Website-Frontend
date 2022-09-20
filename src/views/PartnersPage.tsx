import React from 'react';
import {
  Box, CircularProgress,
} from '@mui/material';
import { Client, Partner } from '../clients/server.generated';
import PageHeader from '../components/layout/PageHeader';
import PartnerGrid from '../components/partner/PartnerGrid';

function PartnersPage() {
  const [partners, setPartners] = React.useState<Partner[] | undefined>(undefined);

  React.useEffect(() => {
    const client = new Client();
    client.getAllPartners().then((p) => setPartners(p));
  }, []);

  if (partners === undefined) {
    return (
      <CircularProgress />
    );
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <PageHeader
        title="2022 Partners"
        text="We are proud to present you our partners for the SNiC 2022: CelerIT conference. Without their generous efforts, it would be impossible to organize this event."
        lines={1}
      />
      <PartnerGrid partners={partners} extensive />
    </Box>
  );
}

export default PartnersPage;
