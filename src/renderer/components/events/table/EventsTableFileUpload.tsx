import Event from '@entities/events/Event';
import { Upload } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  setEvents: (events: Event[]) => void;
};

const EventsTableFileUpload: FC<Props> = ({ setEvents }) => {
  const onUploadButtonClick = async () => {
    const eventsJSON = await window.events.uploadB3SpreadSheet();
    const events = eventsJSON.map((eventJSON) => new Event(eventJSON));

    setEvents(events);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ height: '100%' }}
    >
      <Grid item>
        <Typography variant="h5">Select a B3 transactions file</Typography>
      </Grid>
      <Grid item sx={{ mt: 0.5 }}>
        <IconButton color="primary" size="small" onClick={onUploadButtonClick}>
          <Upload fontSize="small"></Upload>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default EventsTableFileUpload;
