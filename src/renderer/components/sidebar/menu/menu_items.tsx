import {
  IconBuilding,
  IconCirclePlus,
  IconFileUpload,
  IconNotebook,
} from '@tabler/icons';
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
    title: 'Events',
    type: 'GROUP',
    children: [
      {
        id: 'TRACK_RECORD',
        title: 'Track Record',
        type: 'ITEM',
        url: AppRoutes.NEGOTIATIONS_HISTORICAL,
        icon: <IconNotebook stroke={1.5} size="1.3rem" />,
      },
      {
        id: 'NEW_ONES',
        title: 'New ones',
        type: 'ITEM',
        url: AppRoutes.NEGOTIATIONS_NEW_ONE,
        icon: <IconCirclePlus stroke={1.5} size="1.3rem" />,
      },
      {
        id: 'UPLOAD_FILE',
        title: 'Upload File',
        type: 'ITEM',
        url: AppRoutes.EVENTS_UPLOAD_FILE,
        icon: <IconFileUpload stroke={1.5} size="1.3rem" />,
      },
    ],
  },
];

export default menuItems;
