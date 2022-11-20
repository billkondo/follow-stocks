import Stock from '@entities/stocks/Stock';
import EventType from './EventType';

type EventJSON = {
  date: string;
  quantity: number;
  stock: Stock;
  totalValue: number;
  type: EventType;
  unitPrice: number;
};

export default EventJSON;
