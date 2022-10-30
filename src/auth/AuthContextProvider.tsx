import React from 'react';
import { Client, User } from '../clients/server.generated';

export interface IAuthContext {
  user?: User,
  roles: string[],
  updateProfile: () => Promise<void>,
  logOut: () => void,
}

export const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  roles: [],
  updateProfile: () => Promise.resolve(),
  logOut: () => {},
});

interface Props {
  children: React.ReactNode | React.ReactNode[],
}

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [roles, setRoles] = React.useState<string[]>([]);

  const updateProfile = async () => {
    const client = new Client();
    let profile;
    try {
      profile = await client.getProfile();
    } catch (e) {
      return;
    }
    if (profile == null) return;

    setUser(profile);
    setRoles(profile.roles.map((r) => r.name));
  };

  const logOut = () => {
    setUser(undefined);
    setRoles([]);
  };

  React.useEffect(() => {
    updateProfile().then();
  }, []);

  const authContext = React.useMemo(() => ({
    user,
    roles,
    updateProfile,
    logOut,
  }), [user, roles]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
