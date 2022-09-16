import React from 'react';
import {
  Box, CircularProgress, styled,
} from '@mui/material';
import { Client, Partner, SponsorPackage } from '../clients/server.generated';
import PartnerLogo from '../components/partner/PartnerLogo';
import TypographyHeader from '../components/layout/TypographyHeader';
import PageHeader from '../components/layout/PageHeader';

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const LogoGrid = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: '3rem',
  width: '100%',
});

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

  const bronzes = shuffleArray(partners.filter((p) => p.package === SponsorPackage.Bronze));
  const silvers = shuffleArray(partners.filter((p) => p.package === SponsorPackage.Silver));
  const golds = shuffleArray(partners.filter((p) => p.package === SponsorPackage.Gold));
  const platinums = shuffleArray(partners.filter((p) => p.package === SponsorPackage.Platinum));

  const orderedPartners = [{
    header: 'Platinum Partners',
    partners: platinums,
    size: '600px',
  }, {
    header: 'Gold Partners',
    partners: golds,
    size: '380px',
  }, {
    header: 'Silver Partners',
    partners: silvers,
    size: '280px',
  }, {
    header: 'Bronze Partners',
    partners: bronzes,
    size: '200px',
  }];

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <PageHeader
        title="2022 Partners"
        text="Without its partners, SNiC 2022: CelerIT could not take place. Interested in becoming a partner? Contact us for more details."
        lines={1}
      />
      {orderedPartners.map((o, i) => (
        <Box sx={{ paddingBottom: '4rem' }}>
          {i !== 0 ? (<hr />) : null}
          <TypographyHeader variant="h3" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {o.header}
          </TypographyHeader>
          <LogoGrid>
            {o.partners.map((p) => (
              <PartnerLogo partner={p} size={o.size} />
            ))}
          </LogoGrid>
        </Box>
      ))}
    </Box>
  );
}

export default PartnersPage;
