import Stock from 'domain/stock';

interface StocksStorage {
  searchByTicker: (tickerText: string) => Promise<Stock[]>;

  exists: (stock: Stock) => Promise<boolean>;

  count: () => Promise<number>;
}

export default StocksStorage;
