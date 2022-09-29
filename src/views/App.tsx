import React from 'react';
import LandingComponent from '../components/frontpage/LandingComponent';
import { Client, Partner } from '../clients/server.generated';
import ThemeComponent from '../components/frontpage/ThemeComponent';
import DateLocationComponent from '../components/frontpage/DateLocationComponent';
import SkewContentBox from '../components/layout/SkewContentBox';
import UniversitiesComponent from '../components/frontpage/UniversitiesComponent';
import { shuffleArray } from '../helpers/array';
import SpeakersComponent from '../components/frontpage/SpeakersComponent';
import TicketComponent from '../components/frontpage/TicketComponent';
import LocationComponent from '../components/frontpage/LocationComponent';
import PartnersComponent from '../components/frontpage/PartnersComponent';

function App() {
  const [partners, setPartners] = React.useState<Partner[] | null>(null);
  const [shuffledPartners, setShuffledPartners] = React.useState<Partner[] | null>(null);

  React.useEffect(() => {
    const client = new Client();
    client.getAllPartners()
      .then((p) => {
        setPartners(p);
        setShuffledPartners(shuffleArray(p));
      });
  }, []);

  if (!partners || !shuffledPartners) return null;

  return (
    <>
      <LandingComponent location="/CelerIT_animatie.mp4" shuffledPartners={shuffledPartners} />
      <DateLocationComponent />
      <ThemeComponent />
      <SkewContentBox image="/paneldiscussie.jpg">
        <SpeakersComponent />
      </SkewContentBox>
      <UniversitiesComponent />
      <TicketComponent />
      <SkewContentBox image="/parktheater.jpg" verticalImageHeight={500} inverse bottomBar>
        <LocationComponent />
      </SkewContentBox>
      <PartnersComponent partners={partners} />
    </>
  );
}

export default App;
