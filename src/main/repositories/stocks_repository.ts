import Stock from 'domain/stock';

interface StocksRepository {
  exists: (stock: Stock) => Promise<boolean>;

  search: (tickerText: string) => Promise<Stock[]>;

  save: (stocks: Stock[]) => Promise<void>;

  load: () => Promise<Stock[]>;

  count: () => Promise<number>;
}

export default StocksRepository;
