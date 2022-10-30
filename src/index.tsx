import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import SNiCTheme from './theme';
import MainMenu from './components/navigation/MainMenu';
import ContextProviders from './contexts/ContextProviders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

TimeAgo.addDefaultLocale(en);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ContextProviders>
          <SNiCTheme>
            <MainMenu>
              <Router />
            </MainMenu>
          </SNiCTheme>
        </ContextProviders>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
