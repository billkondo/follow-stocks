import Stock from 'domain/stock';

interface StocksRepository {
  exists: (stock: Stock) => Promise<boolean>;
  search: (tickerText: string) => Promise<Stock[]>;
  saveStocks: (stocks: Stock[]) => Promise<void>;
}

export default StocksRepository;
