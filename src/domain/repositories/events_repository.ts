import Event from '@entities/event/event';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';

interface EventsRepository {
  save: (event: Event) => Promise<void>;

  saveMany: (events: Event[]) => Promise<void>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsRepository;
