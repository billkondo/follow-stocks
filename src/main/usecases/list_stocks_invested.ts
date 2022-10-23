import StockType from 'domain/entities/stock/stock_type';
import StockInvestedWithQuotation from 'domain/entities/stock_invested/stock_invested_with_quotation';
import StocksInvestedWithQuotationsRepository from 'main/repositories/stocks_invested_wtih_quotations_repository';

const ListStocksInvested =
  (stocksInvestedWithQuotation: StocksInvestedWithQuotationsRepository) =>
  (type: StockType): Promise<StockInvestedWithQuotation[]> => {
    return stocksInvestedWithQuotation.listStocksInvestedWithQuotations(type);
  };

export default ListStocksInvested;
