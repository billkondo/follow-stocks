import { AppBar, Toolbar, useTheme } from '@mui/material';
import { FC } from 'react';
import DrawerHeader from './DrawerHeader';

interface IProps {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}

const Header: FC<IProps> = ({ drawerOpen, onDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          transition: drawerOpen ? theme.transitions.create('width') : 'none',
          height: 80,
        }}
      >
        <Toolbar>
          <DrawerHeader onDrawerToggle={onDrawerToggle} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
