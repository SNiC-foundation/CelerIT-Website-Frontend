import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import Program from './components/Program';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="program" element={<Program />} />
    </Routes>
  );
}

export default Router;
