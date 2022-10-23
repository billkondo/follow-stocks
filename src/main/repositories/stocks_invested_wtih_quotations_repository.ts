import StockType from 'domain/entities/stock/stock_type';
import StockInvestedWithQuotation from 'domain/entities/stock_invested/stock_invested_with_quotation';

interface StocksInvestedWithQuotationsRepository {
  listStocksInvestedWithQuotations: (
    type: StockType,
  ) => Promise<StockInvestedWithQuotation[]>;
}

export default StocksInvestedWithQuotationsRepository;
