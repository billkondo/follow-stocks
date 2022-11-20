import EventsTableDynamic from '@components/events/table/EventsTableDynamic';
import { Grid } from '@mui/material';

const EventsTrackRecordPage = () => {
  return (
    <Grid container>
      <Grid item container>
        <EventsTableDynamic></EventsTableDynamic>
      </Grid>
    </Grid>
  );
};

export default EventsTrackRecordPage;
