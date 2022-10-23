import Stock from 'domain/entities/stock/stock';
import StockQuotation from 'domain/entities/stock_quotation';

interface StocksQuotationsRepository {
  loadStockQuotation: (stock: Stock) => Promise<StockQuotation>;

  saveStockQuotation: (stockQuotation: StockQuotation) => Promise<void>;

  findStockQuotation: (stock: Stock) => Promise<StockQuotation>;
}

export default StocksQuotationsRepository;
