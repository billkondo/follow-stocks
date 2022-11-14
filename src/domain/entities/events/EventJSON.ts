import Price from '@entities/price/price';
import Stock from '@entities/stocks/stock';
import EventType from './EventType';

type EventJSON = {
  date: string;
  price: Price;
  quantity: number;
  stock: Stock;
  type: EventType;
};

export default EventJSON;
