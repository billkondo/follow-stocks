import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';

interface StocksStorage {
  searchByTickerAndType: (
    tickerText: string,
    type: StockType,
  ) => Promise<Stock[]>;

  exists: (stock: Stock) => Promise<boolean>;

  countByType: (type: StockType) => Promise<number>;

  save: (stock: Stock) => Promise<void>;

  saveMany: (stocks: Stock[]) => Promise<void>;

  findAll: () => Promise<Stock[]>;

  findAllByType: (type: StockType) => Promise<Stock[]>;
}

export default StocksStorage;
