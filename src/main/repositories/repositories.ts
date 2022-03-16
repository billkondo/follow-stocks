import StocksInvestedWithQuotationsRepository from './stocks_invested_wtih_quotations_repository';
import StocksNegotiationsRepository from './stocks_negotiations_repository';
import StocksRepository from './stocks_repository';

interface Repositories {
  stocks: StocksRepository;
  stocksNegotiations: StocksNegotiationsRepository;
  stocksInvestedWithQuotations: StocksInvestedWithQuotationsRepository;
}

export default Repositories;
