import StockInvested from '@entities/stock_invested/stock_invested';
import { createContext } from 'react';
import Status from 'renderer/domain/status';

interface IStocksInvestedContext {
  stocksInvested: StockInvested[];
  loadStatus: Status;
}

const StocksInvestedContext = createContext<IStocksInvestedContext>({
  stocksInvested: [],
  loadStatus: 'LOADING',
});

export default StocksInvestedContext;
