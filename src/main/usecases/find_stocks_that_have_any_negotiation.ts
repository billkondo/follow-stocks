import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';

const FindStocksThatHaveAnyNegotiation =
  (stocksNegotiationsRepository: StocksNegotiationsRepository) =>
  async (type: StockType): Promise<Stock[]> => {
    return stocksNegotiationsRepository.findStocksThatHaveAnyNegotiation(type);
  };

export default FindStocksThatHaveAnyNegotiation;
