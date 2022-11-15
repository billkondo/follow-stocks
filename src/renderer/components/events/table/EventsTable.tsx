import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import {
  Box,
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
import { FC, useEffect, useState } from 'react';
import EventsTableRow from './EventsTableRow';

const ROWS_PER_PAGE = 5;

type Props = {
  eventsCount: number;
  eventsInPage: Event[];

  title?: string;

  filterEvents: (filterOptions: FilterOptions) => void;
  renderEmptyEvents: () => JSX.Element;
  renderHeader?: () => JSX.Element;
};

const EventsTable: FC<Props> = ({
  eventsCount,
  eventsInPage,

  title = 'Events List',

  filterEvents,
  renderEmptyEvents,
  renderHeader,
}) => {
  const [page, setPage] = useState(0);

  const hasAnyEvent = eventsCount > 0;
  const hasNoEvents = eventsCount === 0;

  useEffect(() => {
    filterEvents({ page, pageSize: ROWS_PER_PAGE });
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [eventsCount]);

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
        <Typography variant="h4">{title}</Typography>
      </Box>

      <Divider sx={{ borderBottomColor: 'rgb(224, 224, 224)' }}></Divider>

      {renderHeader && (
        <Grid
          container
          direction="row"
          sx={{ px: 2, py: 3 }}
          justifyContent="flex-end"
        >
          {renderHeader()}
        </Grid>
      )}

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
        <Box sx={{ padding: 2, flexGrow: 1 }}>{renderEmptyEvents()}</Box>
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
            count={eventsCount}
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
