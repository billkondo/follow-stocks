import { Box, useTheme } from '@mui/material';
import { FC } from 'react';
import { DRAWER_WIDTH } from 'renderer/config/constants';

interface IProps {
  open: boolean;
}

const BodyLayout: FC<IProps> = ({ open, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...theme.typography.mainContent,
        ...(!open && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          [theme.breakpoints.up('md')]: {
            marginLeft: `${-(DRAWER_WIDTH - 20)}px`,
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
          [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            padding: '16px',
          },
          [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            padding: '16px',
            marginRight: '10px',
          },
        }),
        ...(open && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
          },
          [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
          },
        }),
      }}
    >
      {children}
    </Box>
  );
};

export default BodyLayout;
