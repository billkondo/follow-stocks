import Stock from 'domain/entities/stock/stock';
import StockQuotation from 'domain/entities/stock_quotation';

interface StocksQuotationsStorage {
  save: (stockQuotation: StockQuotation) => Promise<void>;

  findAll: () => Promise<StockQuotation[]>;

  find: (stock: Stock) => Promise<StockQuotation>;
}

export default StocksQuotationsStorage;
