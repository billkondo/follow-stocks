import EventsTable from '@components/events/table/EventsTable';
import { Grid, Paper, Typography } from '@mui/material';
import { GRID_SPACING } from 'renderer/config/constants';

const EventsUploadFilePage = () => {
  const onSave = async () => {
    await window.events.saveB3Events();
  };

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
        <EventsTable onSave={onSave}></EventsTable>
      </Grid>
    </Grid>
  );
};

export default EventsUploadFilePage;
