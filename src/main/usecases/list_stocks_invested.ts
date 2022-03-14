import StockInvestedWithQuotation from 'domain/stock_invested_with_quotation';
import StockType from 'domain/stock_type';
import StocksInvestedWithQuotationsRepository from 'main/repositories/stocks_invested_wtih_quotations_repository';

const ListStocksInvested =
  (stocksInvestedWithQuotation: StocksInvestedWithQuotationsRepository) =>
  (type: StockType): Promise<StockInvestedWithQuotation[]> => {
    return stocksInvestedWithQuotation.listStocksInvestedWithQuotations(type);
  };

export default ListStocksInvested;
