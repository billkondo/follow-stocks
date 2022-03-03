import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import MenuData from './menu_data';

interface IProps {
  item: MenuData;
}

const NavItem: FC<IProps> = ({ item }) => {
  const itemIcon = item.icon;

  return (
    <ListItemButton
      sx={{
        borderRadius: '12px',
        mb: 0.5,
        alignItems: 'flex-start',
      }}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={<Typography color="inherit">{item.title}</Typography>}
      />
    </ListItemButton>
  );
};

export default NavItem;
