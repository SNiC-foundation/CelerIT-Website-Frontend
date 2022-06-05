import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './views/App';
import ProgramComponent from './components/ProgramComponent';

function Router() {
  return (
    <Routes>
      <Route path="" element={<App />} />
      <Route path="program" element={<ProgramComponent />} />
    </Routes>
  );
}

export default Router;
