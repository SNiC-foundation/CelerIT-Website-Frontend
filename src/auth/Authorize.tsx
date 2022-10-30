import React from 'react';
import { AuthContext, IAuthContext } from './AuthContextProvider';

interface Props {
  roles: string[];
  children: React.ReactNode | React.ReactNode[];
}

export function authorized(auth: IAuthContext, roles: string[]): boolean {
  const matchedRoles = auth.roles.filter((r) => roles.includes(r));
  return !(auth.user === undefined || (roles.length > 0 && matchedRoles.length === 0));
}

function Authorize({ roles, children }: Props) {
  const auth = React.useContext(AuthContext);

  if (!authorized(auth, roles)) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<>{children}</>);
}

export default Authorize;
