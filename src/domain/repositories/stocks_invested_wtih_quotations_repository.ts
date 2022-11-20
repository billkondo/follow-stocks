import StockType from '@entities/stocks/StockType';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';

interface StocksInvestedWithQuotationsRepository {
  listStocksInvestedWithQuotations: (
    type: StockType,
  ) => Promise<StockInvestedWithQuotation[]>;
}

export default StocksInvestedWithQuotationsRepository;
