import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../clients/server.generated';
import { AuthContext } from '../../auth/AuthContextProvider';

function Logout() {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const client = new Client();
    client.logout().then(() => {
      authContext.logOut();
      navigate('/');
    });
  }, []);

  return null;
}

export default Logout;
