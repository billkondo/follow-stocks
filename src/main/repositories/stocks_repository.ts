import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';

interface StocksRepository {
  exists: (stock: Stock) => Promise<boolean>;

  save: (stocks: Stock[]) => Promise<void>;

  search: (tickerText: string, type: StockType) => Promise<Stock[]>;

  load: (type: StockType) => Promise<Stock[]>;

  count: (type: StockType) => Promise<number>;

  findAll: (type: StockType) => Promise<Stock[]>;
}

export default StocksRepository;
