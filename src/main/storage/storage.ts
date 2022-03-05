import StocksNegotiationsStorage from './stocks_negotiations_storage';
import StocksStorage from './stocks_storage';

interface Storage {
  stocks: StocksStorage;
  stocksNegotiations: StocksNegotiationsStorage;
}

export default Storage;
