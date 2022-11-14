import PriceText from '@components/prices/PriceText';
import Event from '@entities/event/event';
import { TableCell, TableRow } from '@mui/material';
import stringifyDate from '@usecases/dates/stringifyDate';
import { FC } from 'react';
import EventTypeChip from '../EventTypeChip';

type Props = {
  event: Event;
};

const tableCellSX = {
  px: 2,
  py: 1,
  height: 16,
};

const EventsTableRow: FC<Props> = ({ event }) => {
  const { date, stock, type, price } = event;
  const { ticker } = stock;

  const priceValue = price !== null ? price.value : '';

  return (
    <TableRow>
      <TableCell>{ticker}</TableCell>
      <TableCell align="right" sx={tableCellSX}>
        {stringifyDate(date)}
      </TableCell>
      <TableCell align="right" sx={tableCellSX}>
        <EventTypeChip type={type}></EventTypeChip>
      </TableCell>
      <TableCell align="right" sx={tableCellSX}>
        {price && <PriceText price={price}></PriceText>}
      </TableCell>
      <TableCell align="right" sx={tableCellSX}>
        {priceValue}
      </TableCell>
    </TableRow>
  );
};

export default EventsTableRow;
