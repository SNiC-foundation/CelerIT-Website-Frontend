import React from 'react';
import { Client, Role } from '../../clients/server.generated';

export function useRoles() {
  const [loading, setLoading] = React.useState(true);
  const [roles, setRoles] = React.useState<Role[] | undefined>(undefined);

  const getRoles = () => {
    const client = new Client();
    client.getAllRoles()
      .then((s) => setRoles(s))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getRoles();
  }, []);

  return { loading, roles, getRoles };
}
