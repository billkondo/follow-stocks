import Price from './price';
import Stock from './stock';

interface StockQuotation {
  stock: Stock;
  quotation: Price;
}

export default StockQuotation;
