import React from 'react';
import { Client, User } from '../../clients/server.generated';

export function useUsers() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[] | undefined>(undefined);

  const getUsers = () => {
    const client = new Client();
    client.getAllUsers()
      .then((s) => setUsers(s))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return {
    loading, users, getUsers,
  };
}
