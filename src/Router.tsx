import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import Login from './views/auth/Login';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default Router;
