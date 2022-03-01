import StocksRepository from 'main/repositories/stocks_repository';
import LoadStocks from './load_stocks';

const LoadStocksFirstTime =
  (stocksRepository: StocksRepository) => async (): Promise<boolean> => {
    const stocksCount = await stocksRepository.count();
    const hasAnyStock = stocksCount > 0;

    if (hasAnyStock) return false;

    const loadStocks = LoadStocks(stocksRepository);
    await loadStocks();

    return true;
  };

export default LoadStocksFirstTime;
