import SqliteEventsStorage from '@services/sqlite/storages/SqliteEventsStorage';
import EventsService from '@services/stocks/events_service';
import StocksInvestedService from '@services/stocks/stocks_invested_service';
import StocksInvestedWithQuotationsService from '@services/stocks/stocks_invested_with_quotations_service';
import StocksQuotationsService from '@services/stocks/stocks_quotations_service';
import StocksService from '@services/stocks/stocks_service';
import SqliteStocksInvestedStorage from '@sqlite/storages/sqlite_stocks_invested_storage';
import SqliteStocksQuotationsStorage from '@sqlite/storages/sqlite_stocks_quotations_storage';
import SqliteStocksStorage from '@sqlite/storages/sqlite_stocks_storage';
import SqliteConnection from 'main/services/sqlite/sqlite_connection';

const useStocks = () => {
  const stocksServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksStorage = new SqliteStocksStorage(sqliteConnection);
    const stocksService = new StocksService(stocksStorage);

    return stocksService;
  };

  const eventsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const eventsStorage = new SqliteEventsStorage(sqliteConnection);
    const eventsService = new EventsService(eventsStorage);

    return eventsService;
  };

  const stocksInvestedServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksInvestedStorage = new SqliteStocksInvestedStorage(
      sqliteConnection,
    );
    const stocksInvestedService = new StocksInvestedService(
      stocksInvestedStorage,
    );

    return stocksInvestedService;
  };

  const stocksQuotationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksQuotationsStorage = new SqliteStocksQuotationsStorage(
      sqliteConnection,
    );
    const stocksQuotationsService = new StocksQuotationsService(
      stocksQuotationsStorage,
    );

    return stocksQuotationsService;
  };

  const stocksInvestedWithQuotationsServiceFactory = () => {
    const sqliteConnection = SqliteConnection.connect();
    const stocksInvestedWithQuotationsService =
      new StocksInvestedWithQuotationsService(sqliteConnection);

    return stocksInvestedWithQuotationsService;
  };

  return {
    stocksServiceFactory,
    eventsServiceFactory,
    stocksInvestedServiceFactory,
    stocksQuotationsServiceFactory,
    stocksInvestedWithQuotationsServiceFactory,
  };
};

export default useStocks;
