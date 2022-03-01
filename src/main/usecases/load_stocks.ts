import StocksRepository from 'main/repositories/stocks_repository';

const LoadStocks = (stocksRepository: StocksRepository) => async () => {
  const stocks = await stocksRepository.load();

  await stocksRepository.save(stocks);
};

export default LoadStocks;
