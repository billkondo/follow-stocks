import Price from './price';
import Stock from './stock';

interface StockQuotation {
  stock: Stock;
  quotation: Price;
  updatedAt: Date;
}

export default StockQuotation;
