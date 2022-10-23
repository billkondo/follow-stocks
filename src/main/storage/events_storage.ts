import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';

interface EventsStorage {
  saveEvents: (stock: Stock, events: Event[]) => Promise<void>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsStorage;
