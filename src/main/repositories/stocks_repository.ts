import Stock from 'domain/stock';

interface StocksRepository {
  exists: (stock: Stock) => Promise<boolean>;
}

export default StocksRepository;
