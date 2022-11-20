import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';

interface EventsStorage {
  count: () => Promise<number>;

  filter: (filterOptions: FilterOptions) => Promise<Event[]>;

  findAll: () => Promise<Event[]>;

  save: (event: Event) => Promise<void>;

  saveMany: (events: Event[]) => Promise<void>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsStorage;
