import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';

interface StocksRepository {
  exists: (stock: Stock) => Promise<boolean>;

  save: (stock: Stock) => Promise<void>;

  saveMany: (stocks: Stock[]) => Promise<void>;

  search: (tickerText: string, type: StockType) => Promise<Stock[]>;

  load: (type: StockType) => Promise<Stock[]>;

  count: (type: StockType) => Promise<number>;

  findAll: (type: StockType) => Promise<Stock[]>;
}

export default StocksRepository;
