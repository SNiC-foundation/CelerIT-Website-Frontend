import React from 'react';
import LandingComponent from '../components/frontpage/LandingComponent';
import { Client, Partner } from '../clients/server.generated';
import ThemeComponent from '../components/frontpage/ThemeComponent';
import DateLocationComponent from '../components/frontpage/DateLocationComponent';

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
      <DateLocationComponent />
      <ThemeComponent />
    </>
  );
}

export default App;
