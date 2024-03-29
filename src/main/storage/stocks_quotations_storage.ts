import Stock from '@entities/stocks/Stock';
import StockQuotation from '@entities/stock_quotation';

interface StocksQuotationsStorage {
  save: (stockQuotation: StockQuotation) => Promise<void>;

  findAll: () => Promise<StockQuotation[]>;

  find: (stock: Stock) => Promise<StockQuotation>;
}

export default StocksQuotationsStorage;
