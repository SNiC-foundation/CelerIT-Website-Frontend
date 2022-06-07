import React from 'react';

export interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  target: string;
}

export const generalPages: MenuItem[] = [
  {
    name: 'Speakers',
    target: '/speakers',
  },
  {
    name: 'Partners',
    target: '/partners',
  },
  {
    name: 'Program',
    target: '/program',
  },
];

export const userMenuPages: MenuItem[] = [
  {
    name: 'Account',
    target: '/user/:id',
  },
  {
    name: 'My program',
    target: '/user/:id/program',
  },
];
