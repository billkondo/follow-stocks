import { IconBuilding, IconCirclePlus, IconNotebook } from '@tabler/icons';
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
  {
    id: 'NEGOTIATIONS',
    title: 'Negotiations',
    type: 'GROUP',
    children: [
      {
        id: 'HISTORICAL',
        title: 'Historical',
        type: 'ITEM',
        icon: <IconNotebook stroke={1.5} size="1.3rem" />,
        url: AppRoutes.NEGOTIATIONS_HISTORICAL,
      },
      {
        id: 'NEW_ONE',
        title: 'New ones',
        type: 'ITEM',
        icon: <IconCirclePlus stroke={1.5} size="1.3rem" />,
        url: AppRoutes.NEGOTIATIONS_NEW_ONE,
      },
    ],
  },
];

export default menuItems;
