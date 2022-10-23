import StockType from '@entities/stock/stock_type';
import StocksRepository from '@repositories/stocks_repository';

const LoadStocks =
  (stocksRepository: StocksRepository) => async (type: StockType) => {
    const stocks = await stocksRepository.load(type);

    await stocksRepository.save(stocks);
  };

export default LoadStocks;
