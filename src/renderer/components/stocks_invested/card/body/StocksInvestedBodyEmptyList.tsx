import { Grid, Typography, useTheme } from '@mui/material';
import { IconMoodEmpty } from '@tabler/icons';
import { FC } from 'react';

type Props = {
  stockText: string;
};

const StocksInvestedBodyEmptyList: FC<Props> = ({ stockText }) => {
  const theme = useTheme();

  const message = `No ${stockText} invested`;

  return (
    <Grid item xs={12}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <IconMoodEmpty style={{ color: theme.palette.error.dark }} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{message}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StocksInvestedBodyEmptyList;
