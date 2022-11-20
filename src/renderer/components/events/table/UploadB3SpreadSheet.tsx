import Event from '@entities/events/Event';
import { Upload } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  onLoad: (events: Event[]) => void;
};

const UploadB3SpreadSheet: FC<Props> = ({ onLoad }) => {
  const onUploadButtonClick = async () => {
    const eventsJSON = await window.events.uploadB3SpreadSheet();
    const events = eventsJSON.map((eventJSON) => new Event(eventJSON));

    onLoad(events);
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
        <Typography variant="h5">Select a B3 events spreadsheet</Typography>
      </Grid>
      <Grid item sx={{ mt: 0.5 }}>
        <IconButton color="primary" size="small" onClick={onUploadButtonClick}>
          <Upload fontSize="small"></Upload>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default UploadB3SpreadSheet;
