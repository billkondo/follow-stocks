import { Grid } from '@mui/material';
import StockType from 'domain/stock_type';
import { FC } from 'react';
import StocksInvestedProvider from 'renderer/stocks/stocks_invested_provider';
import StocksInvestedCard from './card/StocksInvestedCard';

interface IProps {
  type: StockType;
}

const stocksTexts: { [key in StockType]: string } = {
  FII: 'FIIs',
};

const StocksNegotiationsByTypePage: FC<IProps> = ({ type }) => {
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

export default StocksNegotiationsByTypePage;
