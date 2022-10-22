import React from 'react';
import { Client, Partner } from '../../clients/server.generated';

export function usePartners() {
  const [loading, setLoading] = React.useState(true);
  const [partners, setPartners] = React.useState<Partner[] | undefined>(undefined);

  const getPartners = () => {
    const client = new Client();
    client.getAllPartners()
      .then((s) => setPartners(s))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getPartners();
  }, []);

  return { loading, partners, getPartners };
}
