import { ReactNode } from 'react';

type MenuType = 'ITEM' | 'GROUP';

interface MenuData {
  id: string;
  title: string;
  subtitle?: string;
  type: MenuType;
  children: MenuData[];
  icon?: ReactNode;
}

export default MenuData;
