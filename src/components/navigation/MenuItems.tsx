import React from 'react';
import AdminSpeakers from '../../views/admin/AdminSpeakers';
import ParticipantHome from '../../views/homes/ParticipantHome';
import AdminPartners from '../../views/admin/AdminPartners';
import AdminProgram from '../../views/admin/AdminProgram';
import AdminUsers from '../../views/admin/AdminUsers';
import About from '../../views/About';

export interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  target: string;
  component: React.ReactNode;
}

export const generalPages: MenuItem[] = [
  {
    name: 'Speakers',
    target: '/speakers',
    component: null,
  },
  {
    name: 'Partners',
    target: '/partners',
    component: null,
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
  }, {
    name: 'Partners',
    target: '/admin/partners',
    component: <AdminPartners />,
  }, {
    name: 'Program',
    target: '/admin/program',
    component: <AdminProgram />,
  }, {
    name: 'Users',
    target: '/admin/users',
    component: <AdminUsers />,
  },
];

export const userMenuPages: MenuItem[] = [
  {
    name: 'Login',
    target: '/login',
    component: null,
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
