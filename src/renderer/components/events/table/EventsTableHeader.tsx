import { TableCell, TableHead, TableRow } from '@mui/material';

const EventsTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width="10%">
          <b>Ticker</b>
        </TableCell>
        <TableCell width="10%" align="right">
          <b>Date</b>
        </TableCell>
        <TableCell width="10%" align="right">
          <b>Type</b>
        </TableCell>
        <TableCell width="10%" align="right">
          <b>Quantity</b>
        </TableCell>
        <TableCell width="30%" align="right">
          <b>Unit Price</b>
        </TableCell>
        <TableCell width="30%" align="right">
          <b>Total Value</b>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EventsTableHeader;
