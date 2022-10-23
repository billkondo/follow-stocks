import Stock from 'domain/entities/stock/stock';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';

const FindStockNegotiationsByDate =
  (stocksNegotiationsRepository: StocksNegotiationsRepository) =>
  async (stock: Stock, date: Date) => {
    return await stocksNegotiationsRepository.findStockNegotiationsByDate(
      stock,
      date,
    );
  };

export default FindStockNegotiationsByDate;
