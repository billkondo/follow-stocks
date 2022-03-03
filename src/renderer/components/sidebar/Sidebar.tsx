import Logo from '@components/logo/Logo';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { DRAWER_WIDTH } from 'renderer/config/constants';
import MenuList from './menu/MenuList';

interface IProps {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}

const Sidebar: FC<IProps> = ({ drawerOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <Logo />
        </Box>
      </Box>
      <Box sx={{ px: 2 }}>
        <MenuList />
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? DRAWER_WIDTH : 'auto' }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={window.document.body}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={onDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
