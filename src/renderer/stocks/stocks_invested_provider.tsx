import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';
import { FC, useState } from 'react';
import Status from 'renderer/domain/status';
import useComponentWillMount from 'renderer/hooks/use_component_will_mount';
import delayed from 'utils/delayed';
import StocksInvestedContext from './stocks_invested_context';

interface IProps {
  type: StockType;
}

const StocksInvestedProvider: FC<IProps> = ({ type, children }) => {
  const [loadStatus, setLoadStatus] = useState<Status>('LOADING');
  const [stocksInvested, setStocksInvested] = useState<
    StockInvestedWithQuotation[]
  >([]);

  useComponentWillMount(async () => {
    try {
      const stocksInvested: StockInvestedWithQuotation[] = await delayed(
        window.stocks.listInvested(type),
      );

      setLoadStatus('DONE');
      setStocksInvested(stocksInvested);
    } catch (error) {
      setLoadStatus('ERROR');
    }
  });

  return (
    <StocksInvestedContext.Provider value={{ loadStatus, stocksInvested }}>
      {children}
    </StocksInvestedContext.Provider>
  );
};

export default StocksInvestedProvider;
