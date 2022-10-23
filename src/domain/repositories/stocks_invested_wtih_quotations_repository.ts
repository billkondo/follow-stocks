import StockType from '@entities/stock/stock_type';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';

interface StocksInvestedWithQuotationsRepository {
  listStocksInvestedWithQuotations: (
    type: StockType,
  ) => Promise<StockInvestedWithQuotation[]>;
}

export default StocksInvestedWithQuotationsRepository;