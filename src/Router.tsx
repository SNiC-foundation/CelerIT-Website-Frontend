import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import Login from './views/auth/Login';
import { allPages } from './components/navigation/MenuItems';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />

      {allPages.map((p) => (
        <Route key={p.target} path={p.target} element={p.component} />
      ))}
    </Routes>
  );
}

export default Router;
