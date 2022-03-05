import StocksNegotiationsRepository from './stocks_negotiations_repository';
import StocksRepository from './stocks_repository';

interface Repositories {
  stocks: StocksRepository;
  stocksNegotiations: StocksNegotiationsRepository;
}

export default Repositories;
