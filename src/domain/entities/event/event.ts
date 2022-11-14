import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';
import EventType from './event_type';

interface Event {
  date: Date;
  type: EventType;
  stock: Stock;
  price?: Price;
  quantity: number;
}

export default Event;
