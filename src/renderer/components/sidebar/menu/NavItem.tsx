import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC, forwardRef } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { MenuItem } from './menu_types';

interface IProps {
  item: MenuItem;
  level: number;
}

const NavItem: FC<IProps> = ({ item, level }) => {
  const itemIcon = item.icon;
  const selected = !!useMatch(item.url);

  return (
    <ListItemButton
      sx={{
        borderRadius: '12px',
        mb: 0.5,
        alignItems: 'flex-start',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={selected}
      component={forwardRef<HTMLAnchorElement>((props, ref) => (
        <Link {...props} ref={ref} to={item.url} />
      ))}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={selected ? 'h5' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
