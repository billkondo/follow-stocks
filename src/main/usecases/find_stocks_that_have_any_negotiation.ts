import Stock from 'domain/stock';
import StocksNegotiationsRepository from 'main/repositories/stocks_negotiations_repository';

const FindStocksThatHaveAnyNegotiation =
  (stocksNegotiationsRepository: StocksNegotiationsRepository) =>
  async (): Promise<Stock[]> => {
    return stocksNegotiationsRepository.findStocksThatHaveAnyNegotiation();
  };

export default FindStocksThatHaveAnyNegotiation;
