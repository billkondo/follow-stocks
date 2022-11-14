import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';

interface EventsStorage {
  save: (event: Event) => Promise<void>;

  saveMany: (events: Event[]) => Promise<void>;

  findAll: () => Promise<Event[]>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsStorage;
