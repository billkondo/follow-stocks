import { Grid, Typography } from '@mui/material';
import Stock from 'domain/stock';
import StockNegotiation from 'domain/stock_negotiation';
import { FC, useEffect, useState } from 'react';
import { GRID_SPACING } from 'renderer/config/constants';
import useSubmit from 'renderer/hooks/use_submit';
import delayed from 'utils/delayed';
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

  const [negotiations, setNegotiations] = useState<StockNegotiation[]>([]);
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

  return (
    <Grid container spacing={GRID_SPACING}>
      <Grid item xs={12}>
        <Typography variant="h4">
          {`${stockTicker} negotiations at ${dateString}`}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ minHeight: 120 }}>
        {loading && <LoadingIndicator />}
        {failed && <FailedIndicator stock={stock} retry={submit} />}
        {done && isEmpty && <EmptyListIndicator stock={stock} />}
      </Grid>
    </Grid>
  );
};

export default NegotiationsList;
