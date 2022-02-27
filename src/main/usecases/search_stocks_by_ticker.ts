import StocksRepository from 'main/repositories/stocks_repository';

const SearchStocksByTicker =
  (stocksRepository: StocksRepository) => async (tickerText: string) => {
    return await stocksRepository.search(tickerText);
  };

export default SearchStocksByTicker;
