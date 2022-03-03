import Header from '@components/header/Header';
import Sidebar from '@components/sidebar/Sidebar';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BodyLayout from './BodyLayout';

const DashboardPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const onDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header drawerOpen={drawerOpen} onDrawerToggle={onDrawerToggle} />

        <Sidebar drawerOpen={drawerOpen} onDrawerToggle={onDrawerToggle} />

        <BodyLayout open={drawerOpen}>
          <Outlet />
        </BodyLayout>
      </Box>
    </>
  );
};

export default DashboardPage;
