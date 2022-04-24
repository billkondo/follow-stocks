import { CircularProgress, Grid } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <CircularProgress size={32} />
      </Grid>
    </Grid>
  );
};

export default LoadingIndicator;
