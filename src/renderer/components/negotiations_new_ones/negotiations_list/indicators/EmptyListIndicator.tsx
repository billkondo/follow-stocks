import { Grid, Icon, Typography } from '@mui/material';
import { IconMoodEmpty } from '@tabler/icons';
import Stock from 'domain/stock';
import { FC } from 'react';

interface Props {
  stock: Stock;
}

const EmptyListIndicator: FC<Props> = ({ stock }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Icon>
          <IconMoodEmpty />
        </Icon>
      </Grid>

      <Grid item sx={{ mt: 1 }}>
        <Typography variant="h6">
          There are no {stock.ticker} negotiations
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyListIndicator;
