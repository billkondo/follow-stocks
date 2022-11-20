import StockType from '@entities/stocks/StockType';
import { Grid } from '@mui/material';
import { FC } from 'react';
import StocksInvestedProvider from 'renderer/stocks/stocks_invested_provider';
import StocksInvestedCard from './card/StocksInvestedCard';

interface IProps {
  type: StockType;
}

const stocksTexts: { [key in StockType]: string } = {
  BDR: 'BDRs',
  BR_STOCK: 'BR Stcoks',
  FII: 'FIIs',
  FIXED_INCOME: 'Fixed Incomes',
  SUBSCRIPTION: 'Subscriptions',
};

const EventsByTypePage: FC<IProps> = ({ type }) => {
  return (
    <StocksInvestedProvider type={type}>
      <Grid container>
        <Grid item xs={12}>
          <StocksInvestedCard stockText={stocksTexts[type]} />
        </Grid>
      </Grid>
    </StocksInvestedProvider>
  );
};

export default EventsByTypePage;
