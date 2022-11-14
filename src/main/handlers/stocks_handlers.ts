import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';
import Repositories from '@repositories/repositories';
import { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import FindEventsByStockAndDate from 'main/usecases/find_events_by_stock_and_date';
import ListStocksInvested from 'main/usecases/list_stocks_invested';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';
import SearchStocksByTicker from 'main/usecases/search_stocks_by_ticker';

const StocksHandlers = (
  _browserWindow: BrowserWindow,
  repositories: Repositories,
) => {
  const {
    events: eventsRepository,
    stocks: stocksRepository,
    stocksInvestedWithQuotations: stocksInvestedWithQuotationsRepository,
  } = repositories;

  return {
    async load(_event: IpcMainInvokeEvent, type: StockType) {
      const loadStocksFirstTime = LoadStocksFirstTime(stocksRepository);

      await loadStocksFirstTime(type);

      return {
        message: 'SUCCESS',
      };
    },
    async listInvested(
      _event: IpcMainInvokeEvent,
      type: StockType,
    ): Promise<StockInvestedWithQuotation[]> {
      const listStocksInvested = ListStocksInvested(
        stocksInvestedWithQuotationsRepository,
      );

      return listStocksInvested(type);
    },
    async searchStocksByTicker(
      _event: IpcMainInvokeEvent,
      type: StockType,
      ticker: string,
    ) {
      const searchStocksByTicker = SearchStocksByTicker(stocksRepository);

      return searchStocksByTicker(ticker, type);
    },
    async listStockNegotiationsAtDate(
      _event: IpcMainInvokeEvent,
      stock: Stock,
      date: Date,
    ): Promise<Event[]> {
      const findStockNegotiationsByDate =
        FindEventsByStockAndDate(eventsRepository);

      return findStockNegotiationsByDate(stock, date);
    },
  };
};

export default StocksHandlers;
