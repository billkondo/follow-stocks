import Stock from 'domain/stock';
import StockQuotation from 'domain/stock_quotation';

interface StocksQuotationsStorage {
  save: (stockQuotation: StockQuotation) => Promise<void>;

  findAll: () => Promise<StockQuotation[]>;

  find: (stock: Stock) => Promise<StockQuotation>;
}

export default StocksQuotationsStorage;
