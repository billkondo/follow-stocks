import { Grid, Paper, Typography } from '@mui/material';
import { GRID_SPACING } from 'renderer/config/constants';
import EventsTableFixed from '../table/EventsTableFixed';

const EventsUploadFilePage = () => {
  return (
    <Grid container spacing={GRID_SPACING} direction="column">
      <Grid item container>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h4">Upload File</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container item>
        <EventsTableFixed title="New Events"></EventsTableFixed>
      </Grid>
    </Grid>
  );
};

export default EventsUploadFilePage;
