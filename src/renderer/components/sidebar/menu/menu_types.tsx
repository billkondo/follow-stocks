import { ReactNode } from 'react';

export type MenuType = 'ITEM' | 'GROUP';

export type MenuBase = {
  id: string;
  title: string;
  type: MenuType;
};

export type MenuGroup = MenuBase & {
  subtitle?: string;
  children: MenuItem[];
  type: 'GROUP';
};

export type MenuItem = MenuBase & {
  icon?: ReactNode;
  url: string;
  type: 'ITEM';
};
