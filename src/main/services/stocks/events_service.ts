import Event from '@entities/events/Event';
import FilterOptions from '@entities/filters/FilterOptions';
import Stock from '@entities/stocks/stock';
import StockType from '@entities/stocks/stock_type';
import EventsRepository from '@repositories/events_repository';
import EventsStorage from 'main/storage/events_storage';

class EventsService implements EventsRepository {
  eventsStorage: EventsStorage;

  constructor(EventsStorage: EventsStorage) {
    this.eventsStorage = EventsStorage;
  }

  async count() {
    return this.eventsStorage.count();
  }

  async filter(filterOptions: FilterOptions) {
    return this.eventsStorage.filter(filterOptions);
  }

  async save(event: Event) {
    this.eventsStorage.save(event);
  }

  async saveMany(events: Event[]) {
    this.eventsStorage.saveMany(events);
  }

  findEventsByStock(stock: Stock): Promise<Event[]> {
    return this.eventsStorage.findEventsByStock(stock);
  }

  findEventsByStockAndDate(stock: Stock, date: Date): Promise<Event[]> {
    return this.eventsStorage.findEventsByStockAndDate(stock, date);
  }

  findStocksThatHaveAnyEvent(type: StockType): Promise<Stock[]> {
    return this.eventsStorage.findStocksThatHaveAnyEvent(type);
  }
}

export default EventsService;
