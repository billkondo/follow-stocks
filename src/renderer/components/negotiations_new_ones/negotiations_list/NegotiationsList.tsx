import NegotiationForm from '@components/forms/negotiation_form';
import MenuButton from '@components/menu_button';
import Event from '@entities/events/Event';
import EventType from '@entities/events/EventType';

import PriceCode from '@entities/currencies/CurrencyCode';
import Stock from '@entities/stocks/Stock';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { GRID_SPACING } from 'renderer/config/constants';
import useSubmit from 'renderer/hooks/use_submit';
import delayed from 'utils/delayed';
import NegotiationTableRow from '../negotiation_table_row';
import EmptyListIndicator from './indicators/EmptyListIndicator';
import FailedIndicator from './indicators/FailedIndicator';
import LoadingIndicator from './indicators/LoadingIndicator';

interface Props {
  stock: Stock;
  negotiationDate: Date;
}

const formatDate = (date: number) => {
  const dateString = date.toString();

  if (dateString.length === 2) return dateString;

  return `0${dateString}`;
};

const NegotiationsList: FC<Props> = ({ stock, negotiationDate }) => {
  const stockTicker = stock.ticker;
  const day = formatDate(negotiationDate.getDate());
  const month = formatDate(negotiationDate.getMonth() + 1);
  const year = negotiationDate.getFullYear();
  const dateString = `${day}/${month}/${year}`;

  const [negotiations, setNegotiations] = useState<Event[]>([]);
  const isEmpty = !negotiations.length;

  const { submit, loading, failed, done } = useSubmit(
    async () => {
      const negotiations = await delayed(
        window.stocks.listStockNegotiationsAtDate(stock, negotiationDate),
      );

      return negotiations;
    },
    (negotiations) => setNegotiations(negotiations),
  );

  useEffect(() => {
    submit();
  }, [stock, negotiationDate]);

  const addStockNegotiation = (
    stockNegotiationType: EventType,
    quantity: number,
    priceCode: PriceCode,
    price: number,
  ) => {
    const negotiation: Event = new Event({
      date: negotiationDate,
      stock,
      quantity,
      type: stockNegotiationType,
      unitPrice: price,
      totalValue: 0,
    });

    setNegotiations(negotiations.concat(negotiation));
  };

  const deleteNegotiation = (deletedNegotiation: Event) =>
    setNegotiations(
      negotiations.filter((negotiation) => negotiation !== deletedNegotiation),
    );

  return (
    <Grid container spacing={GRID_SPACING}>
      <Grid item container xs={12} alignItems="center">
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {`${stockTicker} negotiations at ${dateString}`}
        </Typography>

        <MenuButton label="Add" variant="contained">
          <NegotiationForm submitForm={addStockNegotiation} />
        </MenuButton>
      </Grid>

      <Grid item xs={12} sx={{ minHeight: 120 }}>
        {loading && <LoadingIndicator />}
        {failed && <FailedIndicator stock={stock} retry={submit} />}
        {done && isEmpty && <EmptyListIndicator stock={stock} />}

        {done && !isEmpty && (
          <Table>
            <TableHead>
              <TableCell>Buy/Sell</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableHead>
            <TableBody>
              {negotiations.map((negotiation) => (
                <NegotiationTableRow
                  negotiation={negotiation}
                  onDeleteButtonClick={() => deleteNegotiation(negotiation)}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
};

export default NegotiationsList;
