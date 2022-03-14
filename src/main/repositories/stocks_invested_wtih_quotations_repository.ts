import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';

interface StocksInvestedWithQuotationsRepository {
  listStocksInvestedWithQuotations: (
    type: StockType,
  ) => Promise<StockInvestedWithQuotation[]>;
}

export default StocksInvestedWithQuotationsRepository;
