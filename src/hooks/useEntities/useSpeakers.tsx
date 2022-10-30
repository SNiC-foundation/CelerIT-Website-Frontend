import React from 'react';
import { Client, Speaker } from '../../clients/server.generated';

export function useSpeakers({ activities }: { activities?: boolean }) {
  const [loading, setLoading] = React.useState(true);
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);

  const getSpeakers = () => {
    const client = new Client();
    client.getAllSpeakers(activities)
      .then((s) => setSpeakers(s))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getSpeakers();
  }, []);

  return { loading, speakers, getSpeakers };
}
