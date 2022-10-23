import Price from '@entities/price/price';
import Stock from '@entities/stock/stock';
import StockNegotiationType from './stock_negotiation_type';

interface StockNegotiation {
  date: Date;
  type: StockNegotiationType;
  stock: Stock;
  price: Price;
  quantity: number;
}

export default StockNegotiation;
