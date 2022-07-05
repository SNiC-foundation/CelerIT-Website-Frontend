import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import Login from './views/auth/Login';
import ParticipantHome from './views/homes/ParticipantHome';
import AdminPartners from './views/admin/AdminPartners';
import AdminSpeakers from './views/admin/AdminSpeakers';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<ParticipantHome />} />

      <Route path="admin/partners" element={<AdminPartners />} />
      <Route path="admin/speakers" element={<AdminSpeakers />} />
    </Routes>
  );
}

export default Router;
