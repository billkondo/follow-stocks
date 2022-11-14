import Event from '@entities/event/event';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import EventsTableFileUpload from './EventsTableFileUpload';
import EventsTableRow from './EventsTableRow';

const ROWS_PER_PAGE = 5;

type Props = {
  onSave: () => Promise<void>;
};

const EventsTable: FC<Props> = ({ onSave }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);

  const hasAnyEvent = events.length > 0;
  const hasNoEvents = events.length === 0;

  const eventsInPage = events.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE,
  );

  const isSaveButtonDisabled = events.length === 0;

  const onSaveButtonClicked = async () => {
    await onSave();
    setEvents([]);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: 400, display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography variant="h4">Events List</Typography>
      </Box>

      <Divider sx={{ borderBottomColor: 'rgb(224, 224, 224)' }}></Divider>

      <Grid
        container
        direction="row"
        sx={{ px: 2, py: 3 }}
        justifyContent="flex-end"
      >
        <Button
          variant="contained"
          onClick={onSaveButtonClicked}
          disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Ticker</b>
            </TableCell>
            <TableCell align="right">
              <b>Date</b>
            </TableCell>
            <TableCell align="right">
              <b>Type</b>
            </TableCell>
            <TableCell align="right">
              <b>Unit Price</b>
            </TableCell>
            <TableCell align="right">
              <b>Total Value</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {hasAnyEvent && (
          <TableBody>
            {eventsInPage.map((event, index) => (
              <EventsTableRow key={index} event={event}></EventsTableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {hasNoEvents && (
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <EventsTableFileUpload setEvents={setEvents}></EventsTableFileUpload>
        </Box>
      )}

      {hasAnyEvent && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexGrow: 1,
          }}
        >
          <TablePagination
            component="div"
            size="small"
            rowsPerPage={ROWS_PER_PAGE}
            count={events.length}
            page={page}
            rowsPerPageOptions={[]}
            onPageChange={(_, newPage) => setPage(newPage)}
          ></TablePagination>
        </Box>
      )}
    </TableContainer>
  );
};

export default EventsTable;
