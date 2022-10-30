import StockType from '@entities/stocks/stock_type';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';
import StocksInvestedWithQuotationsRepository from '@repositories/stocks_invested_wtih_quotations_repository';

const ListStocksInvested =
  (stocksInvestedWithQuotation: StocksInvestedWithQuotationsRepository) =>
  (type: StockType): Promise<StockInvestedWithQuotation[]> => {
    return stocksInvestedWithQuotation.listStocksInvestedWithQuotations(type);
  };

export default ListStocksInvested;
