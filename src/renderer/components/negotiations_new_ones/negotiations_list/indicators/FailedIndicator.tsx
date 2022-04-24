import { Button, Grid, Typography, useTheme } from '@mui/material';
import Stock from 'domain/stock';
import { FC } from 'react';

interface Props {
  stock: Stock;
  retry: () => void;
}

const FailedIndicator: FC<Props> = ({ stock, retry }) => {
  const theme = useTheme();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h6" style={{ color: theme.palette.error.dark }}>
          It was not possible to load {stock.ticker} negotiations
        </Typography>
      </Grid>

      <Grid item sx={{ mt: 1 }}>
        <Button variant="contained" color="error" onClick={retry}>
          Try Again
        </Button>
      </Grid>
    </Grid>
  );
};

export default FailedIndicator;
