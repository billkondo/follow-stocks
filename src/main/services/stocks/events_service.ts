import Event from '@entities/event/event';
import Stock from '@entities/stock/stock';
import StockType from '@entities/stock/stock_type';
import EventsRepository from 'main/repositories/events_repository';
import EventsStorage from 'main/storage/events_storage';

class EventsService implements EventsRepository {
  eventsStorage: EventsStorage;

  constructor(EventsStorage: EventsStorage) {
    this.eventsStorage = EventsStorage;
  }

  async saveEvents(stock: Stock, Events: Event[]) {
    this.eventsStorage.saveEvents(stock, Events);
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
