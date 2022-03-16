import StocksInvestedWithQuotationsService from '@services/stocks/stocks_invested_with_quotations_service';
import StocksNegotiationsService from '@services/stocks/stocks_negotiations_service';
import StocksService from '@services/stocks/stocks_service';
import SqliteConnection from '@sqlite/sqlite_connection';
import Repositories from 'main/repositories/repositories';
import Storage from 'main/storage/storage';

const serviceRepositoriesFactory = (storage: Storage): Repositories => {
  const sqliteConnection = SqliteConnection.connect();
  const { stocks, stocksNegotiations } = storage;

  return {
    stocks: new StocksService(stocks),
    stocksNegotiations: new StocksNegotiationsService(stocksNegotiations),
    stocksInvestedWithQuotations: new StocksInvestedWithQuotationsService(
      sqliteConnection,
    ),
  };
};

export default serviceRepositoriesFactory;
