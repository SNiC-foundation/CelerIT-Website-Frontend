import React from 'react';
import AdminSpeakers from '../../views/admin/AdminSpeakers';
import ParticipantHome from '../../views/homes/ParticipantHome';
import AdminPartners from '../../views/admin/AdminPartners';
import AdminProgram from '../../views/admin/AdminProgram';
import AdminUsers from '../../views/admin/AdminUsers';
import About from '../../views/About';
import PartnersPage from '../../views/PartnersPage';
import SpeakersPage from '../../views/SpeakersPage';
import { IAuthContext } from '../../auth/AuthContextProvider';
import Login from '../../views/auth/Login';
import Logout from '../../views/auth/Logout';
import { authorized } from '../../auth/Authorize';

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
    component: null,
  },
  {
    name: 'About',
    target: '/about',
    component: <About />,
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
    name: 'Logout',
    target: '/logout',
    component: <Logout />,
    disabled: (auth) => (auth.user === undefined),
  },
  {
    name: 'Account',
    target: '/user/:id',
    component: <ParticipantHome />,
  },
  {
    name: 'My program',
    target: '/user/:id/program',
    component: null,
  },
];

export const allPages: MenuItem[] = [
  ...generalPages,
  ...adminMenuPages,
  ...userMenuPages,
];
