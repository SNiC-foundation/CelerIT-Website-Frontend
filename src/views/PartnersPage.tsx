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
        text="Without its partners, SNiC 2022: CelerIT could not take place. Interested in becoming a partner? Contact us for more details."
        lines={1}
      />
      <PartnerGrid partners={partners} extensive />
    </Box>
  );
}

export default PartnersPage;
