import Repositories from '@repositories/repositories';
import EventsService from '@services/stocks/events_service';
import StocksInvestedWithQuotationsService from '@services/stocks/stocks_invested_with_quotations_service';
import StocksService from '@services/stocks/stocks_service';
import SqliteConnection from '@sqlite/sqlite_connection';
import Storage from 'main/storage/storage';

const serviceRepositoriesFactory = (storage: Storage): Repositories => {
  const sqliteConnection = SqliteConnection.connect();
  const { stocks, events } = storage;

  return {
    stocks: new StocksService(stocks),
    events: new EventsService(events),
    stocksInvestedWithQuotations: new StocksInvestedWithQuotationsService(
      sqliteConnection,
    ),
  };
};

export default serviceRepositoriesFactory;
