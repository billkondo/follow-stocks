import Stock from 'domain/entities/stock/stock';
import StockType from 'domain/entities/stock/stock_type';

interface StocksStorage {
  searchByTickerAndType: (
    tickerText: string,
    type: StockType,
  ) => Promise<Stock[]>;

  exists: (stock: Stock) => Promise<boolean>;

  countByType: (type: StockType) => Promise<number>;

  save: (stocks: Stock[]) => Promise<void>;

  findAllByType: (type: StockType) => Promise<Stock[]>;
}

export default StocksStorage;
