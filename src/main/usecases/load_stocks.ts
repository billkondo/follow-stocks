import StockType from '@entities/stocks/StockType';
import StocksRepository from '@repositories/stocks_repository';

const LoadStocks =
  (stocksRepository: StocksRepository) => async (type: StockType) => {
    const stocks = await stocksRepository.load(type);

    await stocksRepository.saveMany(stocks);
  };

export default LoadStocks;
