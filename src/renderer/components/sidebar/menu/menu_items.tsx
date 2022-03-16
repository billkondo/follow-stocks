import { IconBuilding } from '@tabler/icons';
import AppRoutes from 'renderer/config/app_routes';
import { MenuGroup } from './menu_types';

const menuItems: MenuGroup[] = [
  {
    id: 'STOCKS',
    title: 'Stocks',
    type: 'GROUP',
    children: [
      {
        id: 'FIIS',
        title: 'FIIs',
        type: 'ITEM',
        icon: <IconBuilding stroke={1.5} size="1.3rem" />,
        url: AppRoutes.STOCKS_FIIS,
      },
    ],
  },
];

export default menuItems;
