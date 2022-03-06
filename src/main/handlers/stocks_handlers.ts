import StockType from 'domain/stock_type';
import { IpcMainInvokeEvent } from 'electron';
import StocksRepository from 'main/repositories/stocks_repository';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';

const StocksHandlers = (stocksRepository: StocksRepository) => ({
  async load(event: IpcMainInvokeEvent, type: StockType) {
    const loadStocksFirstTime = LoadStocksFirstTime(stocksRepository);

    await loadStocksFirstTime(type);

    return {
      message: 'SUCCESS',
    };
  },
});

export default StocksHandlers;
