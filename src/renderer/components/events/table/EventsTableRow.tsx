import PriceText from '@components/prices/PriceText';
import Event from '@entities/events/Event';
import { TableCell, TableRow, Typography } from '@mui/material';
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
  const { date, stock, type, quantity, totalValue, unitPrice } = event;
  const { ticker, currencyCode } = stock;
  const isEventIgnored = event.isIgnored();

  return (
    <TableRow>
      <TableCell width="10%">{ticker}</TableCell>
      <TableCell width="10%" align="right" sx={tableCellSX}>
        {stringifyDate(date)}
      </TableCell>
      <TableCell width="10%" align="right" sx={tableCellSX}>
        <EventTypeChip type={type}></EventTypeChip>
      </TableCell>
      <TableCell width="10%" align="right" sx={tableCellSX}>
        {!isEventIgnored && <Typography variant="body2">{quantity}</Typography>}
      </TableCell>
      <TableCell width="30%" align="right" sx={tableCellSX}>
        {unitPrice && (
          <PriceText currencyCode={currencyCode} price={unitPrice}></PriceText>
        )}
      </TableCell>
      <TableCell width="30%" align="right" sx={tableCellSX}>
        {totalValue && (
          <PriceText currencyCode={currencyCode} price={totalValue}></PriceText>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EventsTableRow;
