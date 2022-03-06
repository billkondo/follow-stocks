import { createContext } from 'react';
import Status from 'renderer/domain/status';

interface IStocksContext {
  loadStatus: Status;
}

const StocksContext = createContext<IStocksContext>({
  loadStatus: 'LOADING',
});

export default StocksContext;
