import { Grid, Skeleton } from '@mui/material';

const StocksInvestedBodyLoadingItem = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Skeleton variant="rectangular" height={20} width={48} />
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Skeleton variant="rectangular" height={20} width={64} />
              </Grid>
              <Grid item>
                <Skeleton
                  variant="rectangular"
                  height={20}
                  width={20}
                  sx={{ marginLeft: 1.875 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Skeleton
          variant="rectangular"
          height={20}
          width={64}
          sx={{ marginTop: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default StocksInvestedBodyLoadingItem;
