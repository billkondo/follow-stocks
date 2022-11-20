import StockType from '@entities/stocks/StockType';
import { FC, useState } from 'react';
import Status from 'renderer/domain/status';
import useComponentWillMount from 'renderer/hooks/use_component_will_mount';
import StocksContext from './stocks_context';

interface IProps {
  type: StockType;
}

const StocksProvider: FC<IProps> = ({ type, children }) => {
  const [loadStatus, setLoadStatus] = useState<Status>('LOADING');

  useComponentWillMount(async () => {
    const { message } = await window.stocks.load(type);

    if (message === 'SUCCESS') setLoadStatus('DONE');
    else setLoadStatus('ERROR');
  });

  return (
    <StocksContext.Provider value={{ loadStatus }}>
      {children}
    </StocksContext.Provider>
  );
};

export default StocksProvider;
