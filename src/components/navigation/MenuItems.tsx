import React from 'react';
import AdminSpeakers from '../../views/admin/AdminSpeakers';
import AdminPartners from '../../views/admin/AdminPartners';
import AdminProgram from '../../views/admin/AdminProgram';
import AdminUsers from '../../views/admin/AdminUsers';
import AboutPage from '../../views/public/AboutPage';
import PartnersPage from '../../views/public/PartnersPage';
import SpeakersPage from '../../views/public/SpeakersPage';
import { IAuthContext } from '../../auth/AuthContextProvider';
import Login from '../../views/auth/Login';
import Logout from '../../views/auth/Logout';
import { authorized } from '../../auth/Authorize';
import Register from '../../views/auth/Register';
import UserHome from '../../views/homes/UserHome';
import AdminTickets from '../../views/admin/AdminTickets';
import ProgramComponent from '../program/ProgramComponent';
import CheckIn from '../../views/volunteer/CheckIn';
import PartnerQrScanner from '../../views/PartnerQrScanner';
import AdminParticipantsExport from '../../views/admin/AdminParticipantsExport';

export interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  target: string;
  component: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  disabled?: (auth: IAuthContext) => boolean;
}

export const generalPages: MenuItem[] = [
  {
    name: 'Speakers',
    target: '/speakers',
    component: <SpeakersPage />,
  },
  {
    name: 'Partners',
    target: '/partners',
    component: <PartnersPage />,
  },
  {
    name: 'Program',
    target: '/program',
    component: <ProgramComponent />,
  },
  {
    name: 'About',
    target: '/about',
    component: <AboutPage />,
  },
];

export const adminMenuPages: MenuItem[] = [
  {
    name: 'Speakers',
    target: '/admin/speakers',
    component: <AdminSpeakers />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  }, {
    name: 'Partners',
    target: '/admin/partners',
    component: <AdminPartners />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  }, {
    name: 'Program',
    target: '/admin/program',
    component: <AdminProgram />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  }, {
    name: 'Tickets',
    target: '/admin/tickets',
    component: <AdminTickets />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  }, {
    name: 'Users',
    target: '/admin/users',
    component: <AdminUsers />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  },
];

export const userMenuPages: MenuItem[] = [
  {
    name: 'Login',
    target: '/login',
    component: <Login />,
    disabled: (auth) => (auth.user !== undefined),
  },
  {
    name: 'Activate ticket',
    target: '/register',
    component: <Register />,
    disabled: (auth) => (auth.user !== undefined),
  },
  {
    name: 'Account',
    target: '/home',
    component: <UserHome />,
    disabled: (auth) => (auth.user === undefined),
  },
  {
    name: 'Check in',
    target: '/check-in',
    component: <CheckIn />,
    disabled: (auth) => (!authorized(auth, ['Volunteer', 'Admin'])),
  },
  {
    name: 'Scan QR codes',
    target: '/partner-qr',
    component: <PartnerQrScanner />,
    disabled: (auth) => (!authorized(auth, ['Partner'])),
  },
  {
    name: 'Logout',
    target: '/logout',
    component: <Logout />,
    disabled: (auth) => (auth.user === undefined),
  },
];

export const allPages: MenuItem[] = [
  ...generalPages,
  ...adminMenuPages,
  ...userMenuPages,
  {
    name: 'Participant Export',
    target: '/admin/users/export',
    component: <AdminParticipantsExport />,
    disabled: (auth) => (!authorized(auth, ['Admin'])),
  },
];
