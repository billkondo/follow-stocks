import StocksNegotiationsService from '@services/stocks/stocks_negotiations_service';
import StocksService from '@services/stocks/stocks_service';
import Repositories from 'main/repositories/repositories';
import Storage from 'main/storage/storage';

const serviceRepositoriesFactory = (storage: Storage): Repositories => {
  const { stocks, stocksNegotiations } = storage;

  return {
    stocks: new StocksService(stocks),
    stocksNegotiations: new StocksNegotiationsService(stocksNegotiations),
  };
};

export default serviceRepositoriesFactory;
