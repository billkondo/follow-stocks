import { Divider, Grid } from '@mui/material';
import StocksInvestedBodyLoadingItem from './StocksInvestedBodyLoadingItem';

const StocksInvestedBodyLoading = () => {
  return (
    <Grid item xs={12} data-testid="stocks-invested-loading">
      <StocksInvestedBodyLoadingItem />
      <Divider sx={{ my: 1.5 }} />
      <StocksInvestedBodyLoadingItem />
      <Divider sx={{ my: 1.5 }} />
      <StocksInvestedBodyLoadingItem />
      <Divider sx={{ my: 1.5 }} />
      <StocksInvestedBodyLoadingItem />
    </Grid>
  );
};

export default StocksInvestedBodyLoading;
