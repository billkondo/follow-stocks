import StockQuotation from 'domain/stock_quotation';

interface StocksQuotationsStorage {
  save: (stockQuotation: StockQuotation) => Promise<void>;

  findAll: () => Promise<StockQuotation[]>;
}

export default StocksQuotationsStorage;
