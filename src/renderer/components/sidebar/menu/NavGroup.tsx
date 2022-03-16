import { Divider, List, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { MenuGroup } from './menu_types';
import NavItem from './NavItem';

interface IProps {
  item: MenuGroup;
}

const NavGroup: FC<IProps> = ({ item }) => {
  const theme = useTheme();

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              <b>{item.title}</b>
              {item.subtitle && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.subtitle}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {item.children.map((child) => (
          <NavItem key={child.id} item={child} level={1} />
        ))}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
