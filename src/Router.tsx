import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import { allPages } from './components/navigation/MenuItems';
import { AuthContext } from './auth/AuthContextProvider';
import NotFound from './views/public/NotFound';

function Router() {
  const authContext = React.useContext(AuthContext);

  return (
    <Routes>
      <Route path="" element={<App />} />

      {allPages
        .filter((p) => (p.disabled === undefined || !p.disabled(authContext)))
        .map((p) => (
          <Route key={p.target} path={p.target} element={p.component} />
        ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
