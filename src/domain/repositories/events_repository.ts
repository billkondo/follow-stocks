import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';

interface EventsRepository {
  count: () => Promise<number>;

  filter: (filterOptions: FilterOptions) => Promise<Event[]>;

  save: (event: Event) => Promise<void>;

  saveMany: (events: Event[]) => Promise<void>;

  findEventsByStock: (stock: Stock) => Promise<Event[]>;

  findEventsByStockAndDate: (stock: Stock, date: Date) => Promise<Event[]>;

  findStocksThatHaveAnyEvent: (type: StockType) => Promise<Stock[]>;
}

export default EventsRepository;
