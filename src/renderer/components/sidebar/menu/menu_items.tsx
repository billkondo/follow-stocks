import { IconBuilding } from '@tabler/icons';
import MenuData from './menu_data';

const menuItems: MenuData[] = [
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
        children: [],
      },
    ],
  },
];

export default menuItems;
