import Price from './price';
import Stock from './stock';
import StockNegotiationType from './stock_negotiation_type';

interface StockNegotiation {
  type: StockNegotiationType;
  price: Price;
  quantity: number;
  stock: Stock;
  date: Date;
}

export default StockNegotiation;
