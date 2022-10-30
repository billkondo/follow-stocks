import StockType from '@entities/stocks/stock_type';
import StocksRepository from '@repositories/stocks_repository';
import LoadStocks from './load_stocks';

const LoadStocksFirstTime =
  (stocksRepository: StocksRepository) =>
  async (type: StockType): Promise<boolean> => {
    const stocksCount = await stocksRepository.count(type);
    const hasAnyStock = stocksCount > 0;

    if (hasAnyStock) return false;

    const loadStocks = LoadStocks(stocksRepository);
    await loadStocks(type);

    return true;
  };

export default LoadStocksFirstTime;
