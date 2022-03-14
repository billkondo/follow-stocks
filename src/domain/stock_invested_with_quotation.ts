import Price from './price';
import StockInvested from './stock_invested';

type StockInvestedWithQuotation = StockInvested & {
  quotation?: Price;
};

export default StockInvestedWithQuotation;
