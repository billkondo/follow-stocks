import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';

interface EventsStorage {
  saveEvents: (stock: Stock, events: Event[]) => Promise<void>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsStorage;
