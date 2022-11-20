import Stock from '@entities/stocks/Stock';
import StocksRepository from '@repositories/stocks_repository';

const SaveStock =
  ({ stocksRepository }: { stocksRepository: StocksRepository }) =>
  async (stock: Stock) => {
    if (await stocksRepository.exists(stock)) {
      return;
    }

    await stocksRepository.save(stock);
  };

export default SaveStock;
