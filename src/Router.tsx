import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import Login from './views/auth/Login';
import ParticipantHome from './views/homes/ParticipantHome';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<ParticipantHome />} />
    </Routes>
  );
}

export default Router;
