import Stock from './stocks/Stock';

interface StockQuotation {
  stock: Stock;
  quotation: number;
  updatedAt: Date;
}

export default StockQuotation;
