import Logo from '@components/logo/Logo';
import { Avatar, Box, ButtonBase, useTheme } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import { FC } from 'react';

interface IProps {
  onDrawerToggle: () => void;
}

const DrawerHeader: FC<IProps> = ({ onDrawerToggle }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 228,
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          width: 'auto',
        },
      }}
    >
      <Box
        component="span"
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexGrow: 1,
          alignItems: 'flex-end',
        }}
      >
        <Logo />
      </Box>

      <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            '&:hover': {
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
            },
          }}
          onClick={onDrawerToggle}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
      </ButtonBase>
    </Box>
  );
};

export default DrawerHeader;
