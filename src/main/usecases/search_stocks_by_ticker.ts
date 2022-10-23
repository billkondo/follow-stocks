import StockType from '@entities/stock/stock_type';
import StocksRepository from '@repositories/stocks_repository';

const SearchStocksByTicker =
  (stocksRepository: StocksRepository) =>
  async (tickerText: string, type: StockType) => {
    return await stocksRepository.search(tickerText, type);
  };

export default SearchStocksByTicker;
