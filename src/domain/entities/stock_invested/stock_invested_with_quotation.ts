import StockInvested from './stock_invested';

type StockInvestedWithQuotation = StockInvested & {
  quotation?: number;
};

export default StockInvestedWithQuotation;
