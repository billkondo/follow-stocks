import Price from './price/price';
import Stock from './stock/stock';

interface StockQuotation {
  stock: Stock;
  quotation: Price;
  updatedAt: Date;
}

export default StockQuotation;
