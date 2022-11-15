import { Block } from '@mui/icons-material';
import { Grid, Icon, Typography } from '@mui/material';

const EventsTableEmptyList = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Grid item>
        <Typography variant="h5">No B3 events found</Typography>
      </Grid>
      <Grid item sx={{ mt: 0.5 }}>
        <Icon color="error">
          <Block></Block>
        </Icon>
      </Grid>
    </Grid>
  );
};

export default EventsTableEmptyList;
