import { ButtonBase, Typography } from '@mui/material';
import { APP_NAME } from 'config/app_name';
import { Link } from 'react-router-dom';
import AppRoutes from 'renderer/config/app_routes';

const Logo = () => {
  return (
    <ButtonBase disableRipple component={Link} to={AppRoutes.HOME}>
      <Typography
        variant="h2"
        sx={{
          verticalAlign: 'baseline',
          fontFamily: `'Varela Round', cursive`,
          color: '#5e35b1',
        }}
      >
        {APP_NAME}
      </Typography>
    </ButtonBase>
  );
};

export default Logo;
